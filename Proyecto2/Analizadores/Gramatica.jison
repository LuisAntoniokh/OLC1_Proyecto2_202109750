%{
    // Importar librerías
    const {Aritmetica} = require("../dist/src/Expresion/Aritmetica");
    const {Relacional} = require("../dist/src/Expresion/Relacionales");
    const {Logico} = require("../dist/src/Expresion/Logicos");
    const {Primitivo} = require("../dist/src/Expresion/Primitivo");
    const {OpAritmetica,OpRelacional,OpLogico,TipoDato} = require("../dist/src/Expresion/Resultado");
    const {Print} = require("../dist/src/Instruccion/Print");
    const {Bloque} = require("../dist/src/Instruccion/Bloque");
    const {FN_IF} = require("../dist/src/Instruccion/Control/IF");
    const {AST} = require("../dist/src/AST");
    const {Simbolo} = require("../dist/src/TablaSimbolos/Simbolo");
    const {TablaSimbolos} = require("../dist/src/TablaSimbolos/Tablita");
    const {Ternario} = require("../dist/src/Instruccion/Control/Ternario");
    const {Switch} = require("../dist/src/Instruccion/Control/Switch");
    const {Case} = require("../dist/src/Instruccion/Case");
    const {Default} = require("../dist/src/Instruccion/Default");
    let tablaSimbolos = new TablaSimbolos();
%}

%lex // Inicia parte léxica

%options case-insensitive

%%

\s+                                 //ignora espacios
//Palabras reservadas
// Comentarios son con //

[0-9]+("."[0-9]+)\b     return 'DOUBLE';
[0-9]+\b                return 'NUMBER';

// Tipo de datos
"INT"                   return 'INT';
"DOUBLE"                return 'DOUBLE';
"BOOL"                  return 'BOOL';
"CHAR"                  return 'CHAR';
"STRING"                return 'STRING';

// Funciones para imprimir o ejecutar
"EXECUTE"               return 'EXEC';
"COUT"                  return 'COUT';
"ENDL"                  return 'ENDL';
"<<"                    return 'CPR';
"true"                  return 'TRUE';
"false"                 return 'FALSE';

//Instrucciones de control
"if"                    return 'IF';
"else"                  return 'ELSE';
"{"                     return 'LLAVEIZQ';
"}"                     return 'LLAVEDER';
"SWITCH"                return 'SWITCH';
"CASE"                  return 'CASE';
"BREAK"                 return 'BREAK';
"DEFAULT"               return 'DEFAULT';

// Ciclos
"WHILE"                 return 'WHILE';
"FOR"                   return 'FOR';
"DO"                    return 'DO';

// Otras funciones
"TOLOWER"               return 'TOLOWER';
"TOUPPER"               return 'TOUPPER';
"ROUND"                 return 'ROUND';

//Funciones nativas
"LENGTH"                return 'LENGTH';
"TYPEOF"                return 'TYPEOF';
"TOSTRING"              return 'TOSTRING';
"C_STR"                 return 'C_STR';

// Demas palabras reservadas
"NEW"                   return 'NUEVO';
"RETURN"                return 'RETURN';
"CONTINUE"              return 'CONTINUE';
"STD"                   return 'STD';

// signos
"("                     return 'PARIZQ';
")"                     return 'PARDER';
"["                     return 'CIZQ';
"]"                     return 'CDER';
","                     return 'COMA';
"."                     return 'PUNTO';

// Aritmeticas
"+"                     return 'MAS';
"-"                     return 'RES';
"*"                     return 'MUL';
"/"                     return 'DIV';
"POW"                   return 'POW';
"%"                     return 'MOD';
";"                     return 'PYC';

// Relacionales
"=="                    return 'IGUAL';
"!="                    return 'DISTINTO';
"<="                    return 'MENORIGUAL';
"<"                     return 'MENOR';
">="                    return 'MAYORIGUAL';
">"                     return 'MAYOR';
"="                     return 'ASIGNACION';

// Logicos
"&&"                    return 'AND';
"||"                    return 'OR';
"!"                     return 'NOT';

// Ternario
'?'                     return 'QMARK';
':'                     return 'DPS';

([a-zA-z])[a-zA-Z0-9_]* return 'ID';

// Cadenas             "asdfasdfasf"
\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[a-zA-Z0-9]\'				{ yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; } 
<<EOF>>                 return 'EOF';

.					   {    console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext);    }

// Finaliza parte de Léxica
/lex

// precedencia
%right 'NOT'
%left 'OR'
%left 'AND'
%left 'IGUAL','DISTINTO','MENOR','MENORIGUAL','MAYOR','MAYORIGUAL'
%left 'MAS', 'RES'
%left 'MUL','DIV', 'MOD'
%left 'POW'
%right UMINUS 
%left QMARK DPS
// Inicio de gramática
%start ini

// Parte sintáctica  - Definición de la gramática
%%

ini : instrucciones EOF { tablaSimbolos.imprimir(); return new AST($1);}
;

instrucciones: instrucciones instruccion    {  $1.push($2); $$ = $1;}
            | instruccion                   { $$ =  [$1];}
;

instruccion: EXEC expresion PYC         { $$ =  $2;}
            | fn_print PYC               { $$ = $1;}
            | declaracion PYC              { $$ = $1;}
            | fn_if                     { $$ = $1;}
            | fn_switch                 { $$ = $1;}
;

// Para sitetisar un dato, se utiliza $$
expresion: RES expresion %prec UMINUS   { $$ = new Aritmetica(new Primitivo(0,0,0),$2,OpAritmetica.RESTA,0,0);} 
        | expresion MAS expresion       { $$ = new Aritmetica($1,$3,OpAritmetica.SUMA,0,0);}
        | expresion RES expresion       { $$ = new Aritmetica($1,$3,OpAritmetica.RESTA,0,0);}
        | expresion MUL expresion       { $$ =  new Aritmetica($1,$3,OpAritmetica.PRODUCTO,0,0);}
        | expresion DIV expresion       { $$ =  new Aritmetica($1,$3,OpAritmetica.DIVISION,0,0);}
        | expresion MOD expresion       { $$ =  new Aritmetica($1,$3,OpAritmetica.MODULO,0,0);}
        | POW PARIZQ expresion COMA expresion PARDER    { $$ =  new Aritmetica($3,$5,OpAritmetica.POTENCIA,0,0);}
        | relacionales                  { $$ = $1.interpretar();}
        | logicos                       { $$ = $1;}
        | NUMBER                        { $$ = new Primitivo($1,TipoDato.NUMBER,0,0); }
        | DOUBLE                        { $$ =  new Primitivo($1,TipoDato.DOUBLE,0,0); }
        | TRUE                          { $$ =  new Primitivo($1,TipoDato.BOOLEANO,0,0); }
        | FALSE                         { $$ =  new Primitivo($1,TipoDato.BOOLEANO,0,0); }
        | CADENA                        { $$ =  new Primitivo($1,TipoDato.STRING,0,0); }
        | PARIZQ expresion PARDER       { $$ = $2;}
        | ID                            { let simbolo = tablaSimbolos.obtener($1);
    if (simbolo) {
        $$ = new Primitivo(simbolo.valor, simbolo.tipo, @1.first_line, @1.first_column);
    } else {
        console.error(`Error: Variable ${$1} no definida.`);
        $$ = new Primitivo(null, TipoDato.NULO, @1.first_line, @1.first_column);
    }
}
;

declaracion: INT ID ASIGNACION expresion 
    { 
        let resultadoNumero = $4.interpretar();
        $$ = new Simbolo($2, TipoDato.NUMBER, resultadoNumero.valor, @2.first_line, @2.first_column);
        tablaSimbolos.guardar($2, TipoDato.NUMBER, resultadoNumero.valor, @2.first_line, @2.first_column);
    }
| DOUBLE ID ASIGNACION expresion 
    { 
        let resultadoDouble = $4.interpretar();
        $$ = new Simbolo($2, TipoDato.DOUBLE, resultadoDouble.valor, @2.first_line, @2.first_column);
        tablaSimbolos.guardar($2, TipoDato.DOUBLE, resultadoDouble.valor, @2.first_line, @2.first_column);
    }
| BOOL ID ASIGNACION expresion 
    { 
        let resultadoBool = $4.interpretar();
        $$ = new Simbolo($2, TipoDato.BOOLEANO, resultadoBool.valor, @2.first_line, @2.first_column);
        tablaSimbolos.guardar($2, TipoDato.BOOLEANO, resultadoBool.valor, @2.first_line, @2.first_column);
    }
| CHAR ID ASIGNACION expresion
    { 
        let resultadoChar = $4.interpretar();
        $$ = new Simbolo($2, TipoDato.CHAR, resultadoChar.valor, @2.first_line, @2.first_column);
        tablaSimbolos.guardar($2, TipoDato.CHAR, resultadoChar.valor, @2.first_line, @2.first_column);
    }
| STD DPS DPS STRING ID ASIGNACION expresion 
    { 
        let resultadoString = $7.interpretar();
        $$ = new Simbolo($5, TipoDato.STRING, resultadoString.valor, @5.first_line, @5.first_column);
        tablaSimbolos.guardar($5, TipoDato.STRING, resultadoString.valor, @5.first_line, @5.first_column);
    }    
;

relacionales
        : expresion IGUAL expresion       { $$ =  new Relacional($1,$3,OpRelacional.IGUAL,0,0);}
        | expresion DISTINTO expresion    { $$ =  new Relacional($1,$3,OpRelacional.DISTINTO,0,0);}
        | expresion MENOR expresion       { $$ =  new Relacional($1,$3,OpRelacional.MENOR,0,0);}
        | expresion MENORIGUAL expresion  { $$ =  new Relacional($1,$3,OpRelacional.MENORIGUAL,0,0);}
        | expresion MAYOR expresion       { $$ =  new Relacional($1.valor,$3,OpRelacional.MAYOR,0,0);}
        | expresion MAYORIGUAL expresion  { $$ =  new Relacional($1,$3,OpRelacional.MAYORIGUAL,0,0);}
;

logicos
        : expresion AND expresion       { $$ =  new Logico($1,$3,OpLogico.AND,0,0);}
        | expresion OR  expresion       { $$ =  new Logico($1,$3,OpLogico.OR,0,0);}
        | NOT expresion                 { $$ =  new Logico(null,$2,OpLogico.NOT,0,0);}
;

fn_print: COUT CPR expresion            { $$ = new Print($3); }
        | COUT CPR expresion CPR ENDL   { $$ = new Print($3,true,0,0)}
;
// Bloque de instrucciones
bloque
        : LLAVEIZQ instrucciones LLAVEDER   { $$ = new Bloque($2);}
        | LLAVEIZQ  LLAVEDER                { $$ = new Bloque([]) }
;
// Sentencia de control
fn_if
        : IF PARIZQ expresion PARDER bloque             { $$ = new FN_IF($3,$5,null,0,0);}
        | IF PARIZQ expresion PARDER bloque ELSE bloque { $$ = new FN_IF($3,$5,$7,0,0);}
        | IF PARIZQ expresion PARDER bloque ELSE fn_if  { $$ = new FN_IF($3,$5,$7,0,0);}
;

fn_switch
        : SWITCH PARIZQ expresion PARDER LLAVEIZQ cases LLAVEDER { $$ = new Switch($3,$6,null);}
        | SWITCH PARIZQ expresion PARDER LLAVEIZQ cases defaults LLAVEDER { $$ = new Switch($3,$6,$7,0,0);}
        | SWITCH PARIZQ expresion PARDER LLAVEIZQ defaults LLAVEDER { $$ = new Switch($3,null,$6,0,0);}
;

cases
    : cases CASE expresion DPS instrucciones bkpyc{ $1.push(new Case($3, $5)); $$ = $1; }
    | CASE expresion DPS instrucciones bkpyc { $$ = [new Case($2, $4)]; }
;

bkpyc: BREAK PYC { $$ = $1; }
    | { $$ = null; }
;

defaults
    : DEFAULT DPS instrucciones bkpyc{ $$ = new Default($3); }
;