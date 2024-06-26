%{
    // Importar librerías
    const {Aritmetica} = require("../dist/src/Expresion/Aritmetica");
    const {Relacional} = require("../dist/src/Expresion/Relacionales");
    const {Logico} = require("../dist/src/Expresion/Logicos");
    const {Primitivo} = require("../dist/src/Expresion/Primitivo");
    const {OpAritmetica,OpRelacional,OpLogico,TipoDato} = require("../dist/src/Expresion/Resultado");
    const {Print} = require("../dist/src/Instruccion/Print");
    const {Bloque} = require("../dist/src/Instruccion/Bloque");
    const {Llamada} = require("../dist/src/Instruccion/Llamada");
    const {Execute} = require("../dist/src/Instruccion/Execute");
    const {FN_IF} = require("../dist/src/Instruccion/Control/IF");
    const {AST} = require("../dist/src/AST");
    const {Simbolo} = require("../dist/src/TablaSimbolos/Simbolo");
    const {TablaSimbolos} = require("../dist/src/TablaSimbolos/Tablita");
    const {Ternario} = require("../dist/src/Instruccion/Control/Ternario");
    const {Switch} = require("../dist/src/Instruccion/Control/Switch");
    const {Case} = require("../dist/src/Instruccion/Case");
    const {Default} = require("../dist/src/Instruccion/Default");
    const {Acceso} = require("../dist/src/Expresion/Acceso");
    const {Asignacion} = require("../dist/src/Instruccion/Asignacion");
    const {Break} = require("../dist/src/Instruccion/Control/Break");
    const {CWhile} = require("../dist/src/Instruccion/Ciclos/While");
    const {Declaracion} = require("../dist/src/Instruccion/Definiciones/Declaracion");
    const {CDoWhile} = require("../dist/src/Instruccion/Ciclos/DoWhile");
    const {Incremento} = require("../dist/src/Instruccion/Ciclos/Incremento");
    const {Decremento} = require("../dist/src/Instruccion/Ciclos/Decremento");
    const {CFor} = require("../dist/src/Instruccion/Ciclos/For");
    const {Continue} = require("../dist/src/Instruccion/Control/Continue");
    const {Casteo} = require("../dist/src/Expresion/Casteos");
    const {ToLower} = require("../dist/src/Expresion/ToLower");
    const {ToUpper} = require("../dist/src/Expresion/ToUpper");
    const {Round} = require("../dist/src/Expresion/Round");
    const {DeclaracionVector} = require("../dist/src/Estructura/VecDeclar");
    const {AsignacionVector} = require("../dist/src/Estructura/VecAssig");
    const {AccesoVector} = require("../dist/src/Estructura/VerAccess");
    const {Funcion} = require("../dist/src/Instruccion/Definiciones/Funcion");
    const {Metodos} = require("../dist/src/Instruccion/Definiciones/Metodos");
    const {Return} = require("../dist/src/Instruccion/Control/Return");
    const {Length} = require("../dist/src/Expresion/Length");
    const {Typeof} = require("../dist/src/Expresion/Typeof");
    const {ToString} = require("../dist/src/Expresion/ToString");
    getDefaultValue = (tipo) => {
        switch(tipo){
            case TipoDato.NUMBER:
                return 0;
            case TipoDato.DOUBLE:
                return 0.0;
            case TipoDato.BOOLEANO:
                return "true";
            case TipoDato.CHAR:
                return '\u0000';
            case TipoDato.STRING:
                return "";
            default:
                return null;
        }
    }

    var tablaErrores = [];

// Función para reportar errores
function reportarError(tipo, mensaje, linea, columna) {
    // Crear un objeto de error con la información relevante
    var error = {
        tipo: tipo,
        mensaje: mensaje,
        linea: linea,
        columna: columna
    };

    // Agregar el error a la tabla de errores
    tablaErrores.push(error);
}

function imprimirTablaErrores() {
    // Iterar sobre cada error en la tabla de errores
    for (let error of tablaErrores) {
        // Imprimir la información del error
        console.log(`Tipo de error: ${error.tipo}`);
        console.log(`Mensaje de error: ${error.mensaje}`);
        console.log(`Línea: ${error.linea}`);
        console.log(`Columna: ${error.columna}`);
        console.log('-------------------------');
    }
}
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
"INT"                   return 'TIPO_INT';
"DOUBLE"                return 'TIPO_DOUBLE';
"BOOL"                  return 'BOOL';
"CHAR"                  return 'CHAR';
"STRING"                return 'STRING';
"VOID"                  return 'TVOID';

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

"\\n"                   return 'SALTITO';
"\\\\"                  return 'BACKSLASH';
"\\\""                  return 'DOUBLE_QUOTE';
"\\t"                   return 'TAB';
"\\'"                   return 'SINGLE_QUOTE';

([a-zA-z])[a-zA-Z0-9_]* return 'ID';

// Cadenas             "asdfasdfasf"
\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[a-zA-Z0-9]\'		    { yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; } 
<<EOF>>                 return 'EOF';

.   {
  console.log(yylloc.first_line, yylloc.first_column, 'Lexico', yytext);
  reportarError('Lexico', `${yytext} no pertenece al lenguaje`, yylloc.first_line, yylloc.first_column);
}

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
%nonassoc CAST
%nonassoc 'PARDER' 
%left 'PUNTO'
// Inicio de gramática
%start ini

// Parte sintáctica  - Definición de la gramática
%%

ini : instrucciones EOF { return new AST($1); }
;

instrucciones: instrucciones instruccion    {  $1.push($2); $$ = $1;}
            | instruccion                   { $$ =  [$1];}
;

instruccion: fn_print PYC               { $$ = $1;}
            | declaracion PYC           { $$ = $1;}
            | fn_if                     { $$ = $1;}
            | fn_switch                 { $$ = $1;}
            | incre_o_decre PYC         { $$ = $1;}
            | ciclo_while               { $$ = $1;}
            | inst_break PYC            { $$ = $1;}
            | ciclo_do_while            { $$ = $1;}
            | ciclo_for                 { $$ = $1;}
            | inst_break                { $$ = $1;}
            | CONTINUE PYC              { $$ = new Continue(@1.first_line,@1.first_column);}
            | fn_funcion                { $$ = $1;}
            | llamada_funcion PYC       { $$ = $1;}
            | execute PYC               { $$ = $1;}
            | instr_return              { $$ = $1;}
            | error PYC {
        // Recuperación de errores: salta al siguiente punto y coma
        console.log('Error sintactico: recuperandose despues del siguiente punto y coma');
        reportarError('Sintactico', 'Recuperandose despues del siguiente punto y coma', @1.first_line, @1.first_column);
        imprimirTablaErrores();
        }
;

// Para sitetisar un dato, se utiliza $$
expresion: RES expresion %prec UMINUS   { $$ = new Aritmetica(new Primitivo(0,0,0),$2,OpAritmetica.RESTA,0,0);} 
        | expresion MAS expresion       { $$ = new Aritmetica($1,$3,OpAritmetica.SUMA,0,0);}
        | expresion RES expresion       { $$ = new Aritmetica($1,$3,OpAritmetica.RESTA,0,0);}
        | expresion MUL expresion       { $$ =  new Aritmetica($1,$3,OpAritmetica.PRODUCTO,0,0);}
        | expresion DIV expresion       { $$ =  new Aritmetica($1,$3,OpAritmetica.DIVISION,0,0);}
        | expresion MOD expresion       { $$ =  new Aritmetica($1,$3,OpAritmetica.MODULO,0,0);}
        | POW PARIZQ expresion COMA expresion PARDER    { $$ =  new Aritmetica($3,$5,OpAritmetica.POTENCIA,0,0);}
        | relacionales                  { $$ = $1;}
        | logicos                       { $$ = $1;}
        | NUMBER                        { $$ = new Primitivo($1,TipoDato.NUMBER,0,0); }
        | DOUBLE                        { $$ =  new Primitivo($1,TipoDato.DOUBLE,0,0); }
        | TRUE                          { $$ =  new Primitivo($1,TipoDato.BOOLEANO,0,0); }
        | FALSE                         { $$ =  new Primitivo($1,TipoDato.BOOLEANO,0,0); }
        | CADENA                        { $$ =  new Primitivo($1,TipoDato.STRING,0,0); }
        | PARIZQ expresion PARDER       { $$ = $2;}
        | CARACTER                      { $$ =  new Primitivo($1,TipoDato.CHAR,0,0); }
        | ID                            { $$ = new Acceso($1,@1.first_line,@1.first_column);}
        | casteos                       { $$ = $1;}
        | TOLOWER PARIZQ expresion PARDER { $$ = new ToLower($3,@1.first_line,@1.first_column);}
        | TOUPPER PARIZQ expresion PARDER { $$ = new ToUpper($3,@1.first_line,@1.first_column);}
        | ROUND PARIZQ expresion PARDER { $$ = new Round($3,@1.first_line,@1.first_column);}
        | ID CIZQ lista_expresiones CDER { $$ = new AccesoVector($1, $3, null, @1.first_line, @1.first_column);}
        | ID CIZQ lista_expresiones CDER CIZQ lista_expresiones CDER { $$ = new AccesoVector($1, $3, $6, @1.first_line, @1.first_column);}
        | llamada_funcion              { $$ = $1;}
        | ID PUNTO LENGTH PARIZQ PARDER { $$ = new Length($1, @1.first_line, @1.first_column);}
        | TYPEOF PARIZQ expresion PARDER { $$ = new Typeof($3, @1.first_line, @1.first_column);}
        | STD DPS DPS TOSTRING PARIZQ expresion PARDER { $$ = new ToString($6, @1.first_line, @1.first_column);}
        | error PYC {
                   console.log('Error sintactico: recuperandose despues del siguiente punto y coma');
                   reportarError('Sintactico', 'Recuperandose despues del siguiente punto y coma', @1.first_line, @1.first_column);
                   imprimirTablaErrores();      
                }
; 

declaracion: tipos lista_ids ASIGNACION expresion  { $$ = new Declaracion($1, $2, $4, @2.first_line, @2.first_column)}
           | tipos lista_ids { $$ = new Declaracion($1, $2, new Primitivo(getDefaultValue($1), $1, 0, 0), @2.first_line, @2.first_column)}
           | tipos ID CIZQ CDER ASIGNACION NUEVO tipos CIZQ lista_expresiones CDER { $$ = new DeclaracionVector($2, [$9], null, $1, @2.first_line, @2.first_column);}
           | tipos ID CIZQ CDER CIZQ CDER ASIGNACION NUEVO tipos CIZQ lista_expresiones CDER CIZQ expresion CDER { $$ = new DeclaracionVector($2, [$9, $12], null, $1, @2.first_line, @2.first_column);}
           | tipos ID CIZQ CDER ASIGNACION CIZQ lista_expresiones CDER { $$ = new DeclaracionVector($2, [$7.length], $7, $1, @2.first_line, @2.first_column);}
           | tipos ID CIZQ CDER CIZQ CDER ASIGNACION CIZQ CIZQ lista_expresiones CDER COMA CIZQ lista_expresiones CDER CDER { $$ = new DeclaracionVector($2, [$10.length, $14.length], [$10, $14], $1, @2.first_line, @2.first_column);}
;

lista_ids: lista_ids COMA ID { $1.push($3); $$ = $1; }
        | ID { $$ = [$1]; };

asignacion: ID ASIGNACION expresion         { $$ = new Asignacion($1,$3,@1.first_line,@1.first_column)}
          | ID CIZQ expresion CDER ASIGNACION expresion { $$ = new AsignacionVector($1, $3, $6, @1.first_line, @1.first_column);}
          //| ID CIZQ expresion CDER CIZQ expresion CDER ASIGNACION expresion { $$ = new AsignacionVector($1, $3, $6, $9, @1.first_line, @1.first_column);}
;

ciclo_while: WHILE PARIZQ expresion PARDER bloque   {$$ = new CWhile($3,$5, @1.first_line, @1.first_column)} ;

ciclo_do_while: DO bloque WHILE PARIZQ expresion PARDER PYC {$$ = new CDoWhile($5,$2, @1.first_line, @1.first_column)} ;

decla_o_asigna: declaracion  { $$ = $1;}
        | asignacion   { $$ = $1;}
;

incre_o_decre: asignacion { $$ = $1;}
        | ID MAS MAS { $$ = new Incremento($1,@1.first_line,@1.first_column);}
        | ID RES RES { $$ = new Decremento($1,@1.first_line,@1.first_column);}
;

ciclo_for: FOR PARIZQ decla_o_asigna PYC relacionales PYC incre_o_decre PARDER bloque {$$ = new CFor($3,$5,$7,$9,@1.first_line,@1.first_column)} ;

inst_break: BREAK PYC {$$ = new Break(@1.first_line,@1.first_column)};

tipos: TIPO_INT              { $$ = TipoDato.NUMBER; }
    | TIPO_DOUBLE       { $$ = TipoDato.DOUBLE; }
    | BOOL              { $$ = TipoDato.BOOLEANO; }
    | CHAR              { $$ = TipoDato.CHAR; }
    | STD DPS DPS STRING { $$ = TipoDato.STRING; }
    | TVOID             { $$ = TipoDato.VOID; }
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
    : cases CASE expresion DPS instrucciones inst_break { $1.push(new Case($3, $5)); $$ = $1; }
    | CASE expresion DPS instrucciones inst_break { $$ = [new Case($2, $4)]; }
;

defaults
    : DEFAULT DPS instrucciones inst_break { $$ = new Default($3); }
;

casteos
    : PARIZQ tipos PARDER expresion %prec 'PARDER' { $$ = new Casteo($2.valor, $4, @1.first_line, @1.first_column); }
;

fn_funcion
        : tipos ID PARIZQ PARDER bloque                         {$$ = new Funcion($1,$2,[],$5,@1.first_line,@1.first_column)}
        | tipos ID PARIZQ lista_parametros PARDER bloque        {$$ = new Funcion($1,$2,$4,$6,@1.first_line,@1.first_column)}
;

lista_parametros
        : lista_parametros COMA parametro            {$1.push($3); $$ = $1;}
        | parametro                             {$$ = [$1];}
;

parametro
        : tipos ID                              {$$ = ({id:$2,tipo:$1}); }
        | tipos ID CIZQ CDER                    {$$ = ({id:$2,tipo:$1}); }
;

llamada_funcion
        : ID PARIZQ PARDER                      {$$ = new Llamada($1,[],@1.first_line,@1.first_column)}
        | ID PARIZQ lista_expresiones PARDER    {$$ = new Llamada($1,$3,@1.first_line,@1.first_column)}
;

lista_expresiones
        : lista_expresiones COMA expresion       {$1.push($3); $$ = $1;}
        | expresion                             {$$ = [$1];}
;

execute
        : EXEC llamada_funcion                  {$$ = new Execute($2,@1.first_line,@1.first_column)}
;

instr_return: RETURN expresion PYC {$$ = new Return($2,@1.first_line,@1.first_column);}
        | RETURN PYC {$$ = new Break(@1.first_line,@1.first_column);}
;