tableName "table name" = Identifier

dbName "database name" = Identifier

column "column" = Identifier;

JoinOp= And/Or;

OrderByTypes "order type" = "asc"/"desc" ;

And = "&&";

Or = "||";

value "column value"=  val:(ColumnValue/Number) {
    return val;
}

ColumnValue=  "'" val:Word? "'" {
	return val || '';
}

Identifier "identifier"= val:[a-zA-Z0-9_]+ {
	return val.join("");
}

Word "word"= l:Letter+ {return l.join("");}

WordAndNumber = [a-zA-Z0-9]

Letter = [^'%]

Number "number"= d:Digit+ {return Number(d.join(""))}

Digit=[0-9]

Ws "Whitespace" = [ \t];

_ "One or more whitespaces" = space:Ws+ {return null;}

A = [aA];
B= [bB];
C = [cC];
D= [dD];
E = [eE];
F = [fF];
G = [gG];
H =[hH];
I =[iI];
J =[jJ];
K =[kK];
L =[lL];
M =[mM];
N =[nN];
O = [oO];
P =[pP];
Q= [qQ];
R =[rR];
S =[sS];
T = [tT];
U =[uU];
V = [vV];
W =[wW];
X =[xX];
Y = [yY];
Z =[zZ];