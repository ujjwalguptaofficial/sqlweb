

selectQuery = SELECT _("*"_)? aggr:aggregateQry ? FROM _ table:tableName _* join:joinQry* _* where:whereQry? _* 
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

aggregateQry = ("*"_)/ aggr: aggregate _ {
	return aggr[0];
}

aggregate = "["first: aggregateType _* rest: inBetweenAggregateColumn* "]" {
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
	if(op==='||'){
    	return {
        	or: item
        }
    }
    return item;
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

inBetweenParanthesisItem = "," _* val:value _*{
	return val;
} 

likeItem = col:column _* LIKE _* val:likeType { 
	return {
    	[col]:{
        	like:val
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





