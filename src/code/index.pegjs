query= selectQuery/updateQuery;

selectQuery="select"_ ("*"_)? "from"_ table:tableName _* where:whereQry? {return { api:'select', data:{ from:table, where:where } }}

updateQuery="update"_"in"_ table:tableName {return {qry:'update',in:table}}

whereQry="where" _* item: whereItems* {return item};

whereItems = item:(whereItemsType1/whereItemsType2) _* op:joinQuery? {if(op=='|') {return {or:item}} else return item}

whereItemsType1 = fWItem:firstWhereItem jWItem:joinedWhereItem*  {
    var temp=fWItem;
   jWItem.forEach(function(columnValue){
       var key =  Object.keys(columnValue)[0];
        if(temp[key]==null){
            if(typeof columnValue=='object'){
                temp[key]=columnValue[key];
            }
            else{
                temp[key]=columnValue;
            }
        }
        else
        {
            if(key=='or'){
                var orKey = Object.keys(columnValue[key])[0] ;
                temp[key][orKey]=columnValue[key][orKey];
             }
            else
            {
                if(temp[key].in){
                     temp[key].in.push(columnValue[key])
                }
                else
                {
                    // if (typeof columnValue[key]=='object'){

                    // }
                    // else
                    // {
                        var value = [temp[key],columnValue[key]];
                        if(typeof temp[key]!=='object'){
                            temp[key]={['in']:value};
                        }       
                        else
                        {
                            temp[key].in=value;
                        }
                    // }
                   
                }
            }
        }
    });
    return temp; 
}

whereItemsType2 = "(" _* fWItem:firstWhereItem jWItem:joinedWhereItem* _* ")"  {
    var temp=fWItem;
   jWItem.forEach(function(columnValue){
       var key =  Object.keys(columnValue)[0];
        if(temp[key]==null){
            if(typeof columnValue=='object'){
                temp[key]=columnValue[key];
            }
            else{
                temp[key]=columnValue;
            }
        }
        else
        {
            if(key=='or'){
                var orKey = Object.keys(columnValue[key])[0] ;
                temp[key][orKey]=columnValue[key][orKey];
             }
            else
            {
                if(temp[key].in){
                     temp[key].in.push(columnValue[key])
                }
                else
                {
                    // if (typeof columnValue[key]=='object'){

                    // }
                    // else
                    // {
                        var value = [temp[key],columnValue[key]];
                        if(typeof temp[key]!=='object'){
                            temp[key]={['in']:value};
                        }       
                        else
                        {
                            temp[key].in=value;
                        }
                    // }
                   
                }
            }
        }
    });
    return temp; 
}

firstWhereItem = item:whereItem {return item};

joinedWhereItem = op:joinQuery item:whereItem { if(op=='|') {return {or:item}} else return item};

whereItem = col:column _* eq:(equalQuery/inQuery/likeQuery/notEqualQuery) _* {return {[col]: eq}; }

joinQuery =  op:(And/Or) _ {return op;}
 
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