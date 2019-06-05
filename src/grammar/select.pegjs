

selectQuery = SELECT _+ ("*"_+)? as: asQuery? aggr:aggregateQry? FROM _ table:tableName _* join:joinQry* _* where:whereQry? _* 
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
        skip:skip,
        limit:limit,
        ignoreCase: ignoreCase,
        distinct : distinct,
        order:order,
        groupBy:groupBy,
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





