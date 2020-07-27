query = selectQuery/countQuery/insertQuery/updateQuery/removeQuery/createQuery/openQuery/isDbExistQuery ;

createQuery = db:createDbQuery tables:createTableQuery* {
	db.tables=tables
     return {
        api:'initDb',
        data:db
    }
}

createDbQuery = DEFINE _* DB _* name:dbName ";"? {
	return {
    	name:name
    }
}

createTableQuery = DEFINE _* (TABLE) _* table:tableName _* "(" _* first:firstColumnDef all:betweenColumnDef* _* ")" _* ver:version? ";"? _* {
    all.push(first);
    var columns = {};
    all.forEach(function(column){
        columns = {...columns,...column}
    });
    var versionData = ver==null?null:ver['version'];
    return {
        name: table,
        columns : columns,
        version: versionData
    }
}

firstColumnDef = columnDef;

betweenColumnDef = _* "," _* def: columnDef {
    return def;
}

columnDef = name:column _* options:columnOption* {
    var defaultValue = {
        unique:false,
        autoIncrement:false,
        default:null,
        notNull:false,
        dataType:null,
        primaryKey:false,
        multiEntry:false,
        enableSearch:true
    }
    options.forEach(option=>{
        var key = Object.keys(option)[0];
        defaultValue[key] = option[key];
    });
    return {
        [name]: defaultValue
    };
}

columnOption = option:columnOpts _*{
	return option;
}

columnOpts = dataType/autoIncrement/notNull/default/unique/primaryKey/multiEntry/enableSearch/disableSearch;

autoIncrement = AUTOINCREMENT {
    return {
        autoIncrement:true
    }
}

notNull = NOTNULL {
    return {
        notNull:true
    }
}

default = DEFAULT _* val: value {
    return {
        default:val
    }
}

dataType = type: (STRING/NUMBER/OBJECT/ARRAY/BOOLEAN/DATETIME) {
    return {
        dataType:type.join('').toLowerCase()
    }
}

unique = UNIQUE {
    return {
        unique:true
    }
}

primaryKey = PRIMARYKEY {
    return {
        primaryKey:true
    }
}

multiEntry = MULTIENTRY {
    return {
        multiEntry:true
    }
}

enableSearch = ENABLESEARCH {
    return {
        enableSearch:true
    }
}

disableSearch = DISABLESEARCH {
    return {
        enableSearch:false
    }
}

version = VERSION _* val:Number {
    return {
        version:val
    }
}
insertQuery = INSERT _ INTO _ table: tableName _* VALUES _* insertValue: valueTypes _* options: insertOptions* {
     let option = {};
     options.forEach(val=>{
            var key = Object.keys(val)[0];
            switch(key){
                case 'skipDataCheck':
                    option.skipDataCheck = val[key]; break;
                case 'return':
                    option.return = val[key]; break;
                case 'upsert':
                    option.upsert = val[key]; break;
            }
     });
     return {
        api: 'insert',
        data: {
            into: table,
            values: insertValue,
            ...option
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

insertOptions = option:(skipDataCheck/return/upsert)_* {
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

upsert = UPSERT{
    return 'upsert';
}




removeQuery = DELETE _* FROM _ table:tableName _* where:whereQry? _*  {
  return {
     api:'remove',
     data:{
        from:table,
        where:where,
     }
  }
}



countQuery = COUNT _ ("*"_)? FROM _ table:tableName _* where:whereQry? _* 
options:(distinct/groupBy)* {
  const option = {};
  options.forEach(val=>{
  	var key = Object.keys(val)[0];
    switch(key){
        case 'distinct':
        	option.distinct = val[key]; break;
         case 'groupBy':
        	option.groupBy = val[key]; break;
    }
  });
  return {
     api:'count',
     data:{
        from:table,
        where:where,
        ...option
     }
  }
}


selectQuery = SELECT _+ ("*"_+)? as: asQuery? aggr:aggregateQry? FROM _ table:tableName _* join:joinQry* _* where:whereQry? _* 
options:(skip/limit/distinct/orderBy/groupBy)* {
  const option = {};
  options.forEach(val=>{
  	var key = Object.keys(val)[0];
    switch(key){
    	case 'skip':
         	option.skip= val[key]; break;
        case 'limit':
            option.limit= val[key]; break;
        case 'distinct':
        	option.distinct = val[key]; break;
        case 'order':
        	option.order = val[key]; break;
         case 'groupBy':
        	option.groupBy = val[key]; break;
    }
  });
  let modifiedWhere ;
  if(where!=null){
    modifiedWhere = [];
    where.forEach(value=>{
      if(value.table){
          var joinWithSameTable = join.find(qry=>qry.with===value.table);
          if(joinWithSameTable!=null){
            if(Array.isArray(joinWithSameTable.where)){
              joinWithSameTable.where.push(value.query)
            }
            else {
              joinWithSameTable.where = [value.query];
            }
          }
      }
      else{
          modifiedWhere.push(value);
      }
    });
    if(modifiedWhere.length===0){
        modifiedWhere = null;
    }
  }
  if(as!=null){
      as.forEach(value=>{
          const joinQry = join.find(qry=> qry.with===value.table);
          if(joinQry!=null){
                const asVal = {
                    [value.column]: value.alias   
                }
                if(joinQry.as ==null){
                    joinQry.as = asVal;
                }
                else{
                    joinQry.as = {...asVal, ...joinQry.as}
                }
          }
      })
  }
  return {
     api:'select',
     data:{
        from:table,
        where:modifiedWhere,
        ...option,
        aggregate : aggr,
        join:join.length===0?null:join
     }
  }
}

asQuery = alias: aliasGrammar _+ {
   return alias;
}

aliasGrammar = first: asFirstQuery rest: asAfterFirstQuery* {
  rest.splice(0,0,first);
  return rest;
}

asFirstQuery = tableName: column "." columnName:column _+ AS _+ alias: column {
 return {
    table: tableName,
    column: columnName,
    alias: alias
 }
}

asAfterFirstQuery = _* "," _* as: asFirstQuery {
  return as;
}

aggregateQry = aggr: aggregate _ {
	return aggr[0];
}

aggregate = "[" first: aggregateType _* rest: inBetweenAggregateColumn* "]" {
	rest.splice(0,0,first);
    return rest;
}

inBetweenAggregateColumn = "," _* val:aggregateType _*{
	return val;
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

orderBy = ORDER _ BY _ value:orderByQry rest:restOrderByQry* {
    rest.unshift(value);
    return {
      order: rest
    };
}

restOrderByQry = _* "," _* qry:orderByQry {
	return qry;
} 

orderByQry = by:column type:orderByType?{
	return {
        by:by,
        type: type
    }
}

orderByType = _ type: OrderByTypes _* {
	return type;
}

distinct= DISTINCT _? {
	return {
    	distinct: true
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
	
    if(op==='||'){
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
	if(op==='&&'){
        return item;
    }
    else if(item.table){
        item.query = {
            or: item.query
        }
        return item;
    }
    return {
        or: item
    }
}

whereItem = equalToItem/likeItem/inItem/operatorItem/betweenItem

equalToItem = col:column colDot:colAfterDot? _*  "=" _* val:value { 
	if(colDot==null){
      return {
          [col]:val
      }
    }
    return {
          table : col,
          query: {
          	[colDot]:val
          }
    }
}

operatorItem = col:column colDot:colAfterDot? _* op:(("!=")/(">=")/("<=")/(">")/("<")) _* val:value { 
	if(colDot==null){
        return {
                [col]:{
                    [op]:val
                }
            }
    }
    return {
        table : col,
        query:{
            [colDot]:{
                [op]:val
            }
        }
	}
}

betweenItem = col:column colDot:colAfterDot? _* BETWEEN _* "(" _* low:value _* "," _* high: value _* ")" {
	if(colDot==null){
        return {
                [col]:{
                    '-':{
                        low : low,
                        high : high
                    }
                }
        }
    }
    return {
        table : col,
        query:{
            [colDot]:{
                '-':{
                    low : low,
                    high : high
                }
            }
        }
    }
    
}

inItem = col:column colDot:colAfterDot? _* IN _* "(" _* 
first:value _* 
betweens:inBetweenParanthesisItem* ")" { 
	if(colDot==null){
        return {
            [col]:{
                in:[first,...betweens]
            }
        }
    }
    return {
        table:col,
        query:{
            [colDot]:{
                in:[first,...betweens]
            }
        }
	}
}

inBetweenParanthesisColumn = "," _* val:column _*{
	return val;
} 

inBetweenParanthesisItem = "," _* val:value _*{
	return val;
} 

likeItem = col:column colDot:colAfterDot? _* LIKE _* val:likeType { 
	if(colDot==null){
        return {
            [col]:{
                like:val
            }
        }
    }
    return {
        table:col,
        query:{
            [colDot]:{
                like:val
            }
        }
	}
    
}

likeType = likeType1/likeType2/likeType3

likeType1= "'%"_* val:Word _* "%'"{
	return "%"+val+"%";
}

likeType2 = "'%"_* val:Word"'" {
  return "%"+ val;
}

likeType3 = "'"val:Word _* "%'" {
	return val+"%";
}

colAfterDot = "." col:column {
   return col;
}





joinQry = type:joinType? JOIN _+ table:tableName _+ ON _+ onValue1: onValue _* '=' onValue2: onValue _*{
  return  {
   with: table,
   on: `${onValue1}=${onValue2}`,
   type: type
  }
}

onValue "on value" = val:[a-zA-Z_.]+ {
	return val.join("");
}

joinType = type:(INNER/LEFT) _+ {
   return type==null?null : type.join('');
}
updateQuery = UPDATE _ table:tableName _* SET _* set: updateValue _* where:whereQry? _*  {
 return {
     api:'update',
     data:{
        in:table,
        set:set,
        where:where
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

openQuery = OPENDB _* name:dbName {
    return {
        api:'openDb',
        data:name
    }
}

isDbExistQuery =  ISDBEXIST _* name:dbName _* tblInfo: tableInfo? {
	var result = {
     	api:'isDbExist'
    }
    if(tblInfo==null){
      result.data=name;
    }
    else{
    	result.data={
            dbName:name,
            table:tblInfo
        }
    }
    return result;
}

tableInfo = TABLE _* table:tableName _* ver:version {
	return {
                name:table,
                version:ver
                }
}

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

ColumnValue=  "'" val:Word "'" {
	return val;
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

DELETE "delete" = D E L E T E;

VERSION "version" = V E R S I O N;

ENABLESEARCH "enablesearch" = E N A B L E S E A R C H;

MULTIENTRY "multiEntry" =  M U L T I E N T R Y;

PRIMARYKEY "primarykey" = P R I M A R Y K E Y; 

UNIQUE "unique" = U N I Q U E;

STRING "string" = S T R I N G;

NUMBER "number" = N U M B E R;

OBJECT "object" = O B J E C T;

ARRAY "array" =  A R R A Y;

BOOLEAN "boolean" = B O O L E A N;

DATETIME "date_time" = D A T E "_" T I M E;

AUTOINCREMENT "autoincrement" = A U T O I N C R E M E N T;

NOTNULL "notnull" = N O T N U L L;

DEFAULT "default" = D E F A U L T;

DEFINE "define" = D E F I N E;

TABLE "table" = T A B L E;

DB "db" = D B;

ISDBEXIST "isDbExist" = I S D B E X I S T;

OPENDB "openDb" = O P E N D B;

DISABLESEARCH "disablesearch" = D I S A B L E S E A R C H;

JOIN "join" = J O I N

ON "on" = O N

INNER "inner" = I N N E R

LEFT "left" = L E F T

AS "as" = A S

UPSERT "upsert" = U P S E R T

