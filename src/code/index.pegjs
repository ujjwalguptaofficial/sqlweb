query= selectQuery/updateQuery;

selectQuery="select"_ ("*"_)* "from"_ table:tableName _* where:whereQry {return { qry:'select', data:{ from:table, where:where } }}

updateQuery="update"_"in"_ table:tableName {return {qry:'update',in:table}}

whereQry="where"_ item:whereItem+  { return item }

whereItem = col:column _* eq:(equalQuery/inQuery/likeQuery/notEqualQuery) _* joinQuery* { var value={};  value[col]= eq ; return value; }

joinQuery =  (And/Or) _
 
equalQuery = "=" _* val:value {return val}

notEqualQuery = "!="_* val:value {return {'!=':val}}

likeQuery ="like" _ f:"%"* _* val:value _* l:"%"* {return {'like':f+val+l}}

inQuery ="in" _* "(" _* val:inQueryValue _* ")" { return {'in':val} }

inQueryValue = fv:value mv:inQueryBetweenValue* { var value = fv+mv; return value.split('"')}

inQueryBetweenValue = _* "," val:value _* {return val}

tableName "table name" = Word

value "column value"= val:WordAndNumber+ {return val.join("");}

column "column" = Word;

And = "&";

Or = "|";

Word = l:Letter+ {return l.join("");}

WordAndNumber = [a-zA-Z0-9]

Letter = [a-zA-Z]

Number= d:Digit+ {return Number(d.join(""))}

Digit=[0-9]

Ws "Whitespace" = [ \t]
_ "One or more whitespaces" = space:Ws+ {return null;}