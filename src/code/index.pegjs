query= selectQuery/updateQuery;

selectQuery="select"_"from"_ table:tableName _* whereQry* {return {qry:'select',from:table}}

updateQuery="update"_"in"_ table:tableName {return {qry:'update',in:table}}

whereQry="where"_ whereItem+ _"and"/"or";

whereItem = word _ "="/inQuery/likeQuery/"!=" _ value

inQuery ="in"_*"("_*value _*inQueryBetweenValue* _*value*_*")"

likeQuery ="in"_*"("_*value _*inQueryBetweenValue* _*value*_*")"

inQueryBetweenValue = value _*","

tableName "table name" = word

value = wordAndNumber

word = l:letter+ {return l.join("");}

wordAndNumber = [a-zA-Z0-9]

letter=[a-zA-Z]

number= d:digit+ {return Number(d.join(""))}

digit=[0-9]

Ws "Whitespace" = [ \t]
_ "One or more whitespaces" = Ws+