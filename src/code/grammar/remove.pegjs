

removeQuery = (REMOVE/DELETE) _* FROM _ table:tableName _* where:whereQry? _* 
option:(ignoreCase)* {
  var ignoreCase =false;
  option.forEach(val=>{
  	var key = Object.keys(val)[0];
    switch(key){
        case 'ignoreCase':
        	ignoreCase = val[key]; break;
    }
  });
  return {
     api:'remove',
     data:{
        from:table,
        where:where,
        ignoreCase: ignoreCase
     }
  }
}



