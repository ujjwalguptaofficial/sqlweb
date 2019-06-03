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

