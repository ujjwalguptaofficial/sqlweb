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

insertWithParanthesisBetweenVal = "," val:keyValueSepByColumn {
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


