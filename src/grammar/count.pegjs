countQuery = COUNT _ ("*"_)? FROM _ table:tableName _* where:whereQry? _* 
option:(distinct/groupBy)* {
  var distinct = false;
  var groupBy = null;
  option.forEach(val=>{
  	var key = Object.keys(val)[0];
    switch(key){
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
        distinct : distinct,
        groupBy:groupBy
     }
  }
}
