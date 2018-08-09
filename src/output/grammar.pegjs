query = selectQuery/countQuery/insertQuery/updateQuery ;

insertQuery = INSERT _ INTO _ table: tableName _* VALUES _* insertValue: valueTypes _* options: insertOptions* {
     var skipDataCheck = false;
     var returnValue = false;
     options.forEach(val=>{
            var key = Object.keys(val)[0];
            switch(key){
                case 'skipDataCheck':
                    skipDataCheck = val[key]; break;
                case 'return':
                    returnValue = val[key]; break;
            }
     });
     return {
        api: 'insert',
        data: {
            into: table,
            values: insertValue,
            skipDataCheck: skipDataCheck,
            return : returnValue
        }
     }
}

valueTypes = insertWithEqual/insertWithParanthesis ;

insertWithParanthesis = "({" _* first:keyValueSepByColumn _* rest:insertWithParanthesisBetweenVal* _* "})" {
	var obj = {
    	[first.key]: first.value
    }
    if(rest!=null){
    	rest.forEach(item=>{
        	obj[item.key] = item.value
        })
    }
    return [obj];
}

insertWithParanthesisBetweenVal = ","_* val:keyValueSepByColumn {
	return val;
}

keyValueSepByColumn = key:column _*":"_* val: value {
	return {
    	key:key,
        value:val
    }
}

insertWithEqual = "=" insertValue: value {
	return insertValue;
}

insertOptions = option:(skipDataCheck/return)_* {
    return {
        [option]:true
    }
}

skipDataCheck = SKIPDATACHECK {
    return 'skipDataCheck';
}

return = RETURN{
    return 'return';
}


countQuery = COUNT _ ("*"_)? FROM _ table:tableName _* where:whereQry? _* 
option:(distinct/ignoreCase/groupBy)* {
  var ignoreCase =false;
  var distinct = false;
  var groupBy = null;
  option.forEach(val=>{
  	var key = Object.keys(val)[0];
    switch(key){
        case 'ignoreCase':
        	ignoreCase = val[key]; break;
        case 'distinct':
        	distinct = val[key]; break;
         case 'groupBy':
        	groupBy = val[key]; break;
    }
  });
  return {
     api:'count',
     data:{
        from:table,
        where:where,
        ignoreCase: ignoreCase,
        distinct : distinct,
        groupBy:groupBy
     }
  }
}


selectQuery = SELECT _ aggr:aggregateQry ? FROM _ table:tableName _* where:whereQry? _* 
option:(skip/limit/distinct/ignoreCase/orderBy/groupBy)* {
  var skip=null;
  var limit=null;
  var ignoreCase =false;
  var distinct = false;
  var order = null;
  var groupBy = null;
  var aggregate = aggr;
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
     api:'select',
     data:{
        from:table,
        where:where,
        skip:skip,
        limit:limit,
        ignoreCase: ignoreCase,
        distinct : distinct,
        order:order,
        groupBy:groupBy,
        aggregate : aggr
     }
  }
}

aggregateQry = ("*"_)/ aggr: aggregate _ {
	return aggr[0];
}

aggregate = AGGREGATE _* "[" _* first: aggregateType _* rest: inBetweenAggregateColumn* _* "]" {
	rest.splice(0,0,first);
    return rest;
}

aggregateType = minAggregate/ maxAggregate/avgAggregate/countAggregate/sumAggregate

maxAggregate = MAX _* "(" _* first: column _* rest:inBetweenParanthesisColumn* _* ")" {
	rest.splice(0,0,first);
    return {
    	max : rest
    }
}

minAggregate = MIN _* "(" _* first: column _* rest:inBetweenParanthesisColumn* _* ")" {
	rest.splice(0,0,first);
    return {
    	min : rest
    }
}

avgAggregate = AVG _* "(" _* first: column _* rest:inBetweenParanthesisColumn* _* ")" {
	rest.splice(0,0,first);
    return {
    	avg : rest
    }
}

countAggregate = COUNT _* "(" _* first: column _* rest:inBetweenParanthesisColumn* _* ")" {
	rest.splice(0,0,first);
    return {
    	count : rest
    }
}

sumAggregate = SUM _* "(" _* first: column _* rest:inBetweenParanthesisColumn* _* ")" {
	rest.splice(0,0,first);
    return {
    	sum : rest
    }
}

groupBy = GROUP _ BY _ first:column rest:groupByRestValue* _* {
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

orderByValue = ORDER _ BY _ by:column {
	return by;
}

orderByType = _ type: OrderByTypes _* {
	return type;
}

distinct= DISTINCT _? {
	return {
    	distinct: true
    };
}

ignoreCase= IGNORECASE _? {
	return {
    	ignoreCase: true
    };
}

skip = SKIP _ val:Number _? {
	return {
    	skip: val
    };
}


limit= LIMIT _ val:Number _? {
	return {
    	limit: val
    };
}

whereQry= WHERE _ where : whereitems {
	return where;
}

whereitems = item1:(whereQryWithoutParanthesis/whereQryWithParanthesis) item2:joinWhereItems*{
	if(!Array.isArray(item1)){
    	item1=[item1];
    }
    if(item2!=null){
    	var pushInItem1=(item)=>{
         	item1.push(item);
        }
        if(Array.isArray(item1)){
        	item2.forEach(item=>{
              if(Array.isArray(item)){
                item.forEach(subItem=>{
                    pushInItem1(subItem);
                });
              }
              else{
                  pushInItem1(item)
              }
          });
        }
    }
    return item1;
}

joinWhereItems = _ op:JoinOp _* where:(whereQryWithoutParanthesis/whereQryWithParanthesis) {
	
    if(op==='|'){
    	var obj={};
        if(Array.isArray(where)){
          where.forEach(val=>{
              obj={...obj,...val}
          });
        }
        else{
        	obj = where;
        }
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
    	return fw;
    }
    else{
    	var query= fw;
        jw.forEach(qry=>{
        	var key = Object.keys(qry)[0];
        	if(key==='or'){
            	if(query.or==null){
                	query.or={};
                }
                var orKey = Object.keys(qry[key])[0];
                query.or[orKey]= qry[key][orKey];
            }
            else{
            	query[key]=qry[key];
            }
        })
        return query;
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

whereItem = equalToItem/likeItem/inItem/operatorItem/betweenItem

equalToItem = col:column _* "=" _* val:value { 
	return {
    	[col]:val
	}
}

operatorItem = col:column _* op:(("!=")/(">=")/("<=")/(">")/("<")) _* val:value { 
	return {
    	[col]:{
        	[op]:val
        }
	}
}

betweenItem = col:column _* BETWEEN _* "(" _* low:value _* "," _* high: value _* ")" {
	return {
    	[col]:{
            '-':{
                low : low,
                high : high
            }
        }
	}
}

inItem = col:column _* IN _* "(" _* 
first:value _* 
betweens:inBetweenParanthesisItem* ")" { 
	return {
    	[col]:{
        	in:[first,...betweens]
        }
	}
}

inBetweenParanthesisColumn = "," _* val:column _*{
	return val;
} 

inBetweenAggregateColumn = "," _* val:aggregateType _*{
	return val;
} 

inBetweenParanthesisItem = "," _* val:value _*{
	return val;
} 

likeItem = col:column _* LIKE _* val:likeType { 
	return {
    	[col]:{
        	like:val.join('')
        }
	}
}

likeType = (('%'_* value _* '%')/('%'_* value)/(value _* '%'))

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


updateQuery = UPDATE _ table:tableName _* SET _* set: updateValue _* where:whereQry? _* option:(ignoreCase)* {

    var ignoreCase =false;
  option.forEach(val=>{
  	var key = Object.keys(val)[0];
    switch(key){
        case 'ignoreCase':
        	ignoreCase = val[key]; break;
    }
  });
  return {
     api:'update',
     data:{
        in:table,
        set:set,
        where:where,
        ignoreCase: ignoreCase
     }
  }
}

updateValue = first:equalToItem _* rest:updateValueBetweenItem* _* {
    rest.forEach(val=>{
        first = {...first,...val}; 
    });
    return first;
}


updateValueBetweenItem = "," _* val:equalToItem _*{
    return val;
}

tableName "table name" = Word

column "column" = Word;

JoinOp= And/Or;

OrderByTypes "order type" = "asc"/"desc" ;

And = "&";

Or = "|";

ColumnValue=[a-zA-Z0-9@_']

Word = l:Letter+ {return l.join("");}

WordAndNumber = [a-zA-Z0-9]

Letter = [a-zA-Z]

Number= d:Digit+ {return Number(d.join(""))}

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
Z =[zZ];MIN "min" = M I N

MAX "max" = M A X

AVG "avg" =  A V G

COUNT "count" = C O U N T

SUM "sum" =  S U M

AGGREGATE "aggregate" = A G G R E G A T E

BETWEEN "between" = B E T W E E N

IN "in" = I N

LIKE "like" = L I K E

SELECT "select" = S E L E C T

IGNORECASE "ignoreCase" = I G N O R E C A S E

DISTINCT "distinct" = D I S T I N C T

ORDER "order" = O R D E R

BY "by" = B Y

FROM "from" = F R O M

GROUP "group" = G R O U P

LIMIT "limit" = L I M I T

SKIP "skip" = S K I P

WHERE "where"= W H E R E

INSERT "insert" = I N S E R T

INTO "into" = I N T O

RETURN "return" = R E T U R N ;

VALUES "values"= V A L U E S ;

SKIPDATACHECK "skipdatacheck" = S K I P D A T A C H E C K ;

UPDATE "update" = U P D A T E;

SET "set" = S E T;