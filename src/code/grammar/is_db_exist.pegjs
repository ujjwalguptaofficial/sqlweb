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

