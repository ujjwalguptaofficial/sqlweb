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
