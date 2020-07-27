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

