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
