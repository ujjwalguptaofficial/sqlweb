query = selectQuery

selectQuery = api: (S E L E C T) _ ("*"_)? F R O M _ table:tableName _* where:whereQry? _* 
option:(skip/limit/distinct/ignoreCase/orderBy/groupBy)* {
  var skip=null;
  var limit=null;
  var ignoreCase =false;
  var distinct = false;
  var order = null;
  var groupBy = null;
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
        case 'order':
        	order = val[key]; break;
         case 'groupBy':
        	groupBy = val[key]; break;
    }
  });
  return {
     api:api.join(''),
     data:{
        from:table,
        where:where,
        skip:skip,
        limit:limit,
        ignoreCase: ignoreCase,
        distinct : distinct,
        order:order,
        groupBy:groupBy
     }
  }
}

groupBy = G R O U P _ B Y _ first:column rest:groupByRestValue* _* {
	return {
    	groupBy:[first,...rest]
    } ;
}

groupByRestValue = _* "," _* val:column _*{
	return val;
} 

orderBy= by:orderByValue type:orderByType?{
	return {
    	order: {
        	by:by,
            type: type
        }
    };
}

orderByValue = O R D E R _ B Y _ by:column {
	return by;
}

orderByType = _ type: OrderByTypes _* {
	return type;
}

distinct= D I S T I N C T _? {
	return {
    	distinct: true
    };
}

ignoreCase= I G N O R E C A S E _? {
	return {
    	ignoreCase: true
    };
}


skip= S K I P _ val:Number _? {
	return {
    	skip: val
    };
}

limit= L I M I T _ val:Number _? {
	return {
    	limit: val
    };
}

whereQry= W H E R E _ where : whereitems {
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

inItem = col:column _* I N _* "(" _* 
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

likeItem = col:column _* L I K E _* val:likeType { 
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

OrderByTypes "order type" = "asc"/"desc" ;

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