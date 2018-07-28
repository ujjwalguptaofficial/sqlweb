query = selectQuery

selectQuery = api:"select"_ ("*"_)? "from"_ table:tableName _* where:whereQry? _* 
option:(skip/limit/distinct/ignoreCase)* {
  var skip=null;
  var limit=null;
  var ignoreCase =false;
  var distinct = false;
  option.forEach(val=>{
  	var key = Object.keys(val)[0];
    switch(key){
    	case 'skip':
         	skip= val[key]; break;
        case 'limit':
            limit= val[key]; break;
        case 'ignoreCase':
        	ignoreCase = val[key]; break;
        case 'distinct':
        	distinct = val[key]; break;
    }
  });
  return {
     api:api,
     data:{
        from:table,
        where:where,
        skip:skip,
        limit:limit,
        ignoreCase: ignoreCase,
        distinct : distinct
     }
  }
}

distinct= "distinct" _? {
	return {
    	distinct: true
    };
}

ignoreCase= "ignoreCase" _? {
	return {
    	ignoreCase: true
    };
}


skip= "skip" _ val:Number _? {
	return {
    	skip: val
    };
}

limit= "limit" _ val:Number _? {
	return {
    	limit: val
    };
}

whereQry="where" _ where : whereitems {
	return where;
}

whereitems = item1:(whereQryWithoutParanthesis/whereQryWithParanthesis) item2:joinWhereItems*{
	if(item2!=null){
    	item2.forEach(item=>{
        	if(Array.isArray(item)){
              item.forEach(subItem=>{
                  item1.push(subItem);
              });
            }
            else{
            	item1.push(item)
            }
        	
        });
    }
    return item1;
}

joinWhereItems = _ op:JoinOp _* where:(whereQryWithoutParanthesis/whereQryWithParanthesis) {
	if(op==='|'){
    	var obj={};
        where.forEach(val=>{
            obj={...obj,...val}
        });
    	return {
        	or:obj
        }
    }
    return where;
}

whereQryWithoutParanthesis = fw: firstWhere jw:joinWhereItem* {
	if(jw==null){
    	return fw
    }
    else{
     	jw.splice(0,0,fw);	
        return jw;
    }
}

whereQryWithParanthesis = "(" _*  fw: firstWhere jw:joinWhereItem* _* ")" {
	if(jw==null){
    	return fw
    }
    else{
     	jw.push(fw);	
        return jw;
    }
}

firstWhere = whereItem

joinWhereItem = _ op:JoinOp _ item:whereItem {
	if(op==='|'){
    	return {
        	or: item
        }
    }
    return item;
}

whereItem = equalToItem/likeItem/inItem/notEqualToItem

equalToItem = col:column _* "=" _* val:value { 
	return {
    	[col]:val
	}
}

notEqualToItem = col:column _* "!=" _* val:value { 
	return {
    	[col]:{
        	'!=':val
        }
	}
}

inItem = col:column _* "in" _* "(" _* 
first:value _* 
betweens:inBetweenParanthesisItem* ")" { 
	return {
    	[col]:{
        	in:[first,...betweens]
        }
	}
}

inBetweenParanthesisItem = "," _* val:value _*{
	return val;
} 

likeItem = col:column _* "like" _* val:likeType { 
	return {
    	[col]:{
        	like:val.join('')
        }
	}
}

likeType = (('%'_* value _* '%')/('%'_* value)/(value _* '%'))

tableName "table name" = Word

value "column value"= val:ColumnValue+ {
  var value=val.join("");
  if(value[0]=== "'" && value[value.length-1] === "'"){
  	return value.substr(1,value.length-2);
  }
  var number = Number(value); 
  if(isNaN(number)) 
  	return value; 
  else 
  	return number;
}

column "column" = Word;

JoinOp= And/Or;

And = "&";

Or = "|";

ColumnValue=[a-zA-Z0-9@']

Word = l:Letter+ {return l.join("");}

WordAndNumber = [a-zA-Z0-9]

Letter = [a-zA-Z]

Number= d:Digit+ {return Number(d.join(""))}

Digit=[0-9]

Ws "Whitespace" = [ \t]
_ "One or more whitespaces" = space:Ws+ {return null;}