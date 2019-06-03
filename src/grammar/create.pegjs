createQuery = db:createDbQuery tables:createTableQuery* {
	db.tables=tables
     return {
        api:'initDb',
        data:db
    }
}

createDbQuery = DEFINE _* DB _* name:dbName ";"? {
	return {
    	name:name
    }
}

createTableQuery = DEFINE _* (TABLE) _* table:tableName _* "(" _* first:firstColumnDef all:betweenColumnDef* _* ")" _* ver:version? ";"? _* {
    all.push(first);
    var columns = {};
    all.forEach(function(column){
        columns = {...columns,...column}
    });
    var versionData = ver==null?null:ver['version'];
    return {
        name: table,
        columns : columns,
        version: versionData
    }
}

firstColumnDef = columnDef;

betweenColumnDef = _* "," _* def: columnDef {
    return def;
}

columnDef = name:column _* options:columnOption* {
    var defaultValue = {
        unique:false,
        autoIncrement:false,
        default:null,
        notNull:false,
        dataType:null,
        primaryKey:false,
        multiEntry:false,
        enableSearch:true
    }
    options.forEach(option=>{
        var key = Object.keys(option)[0];
        defaultValue[key] = option[key];
    });
    return {
        [name]: defaultValue
    };
}

columnOption = option:columnOpts _*{
	return option;
}

columnOpts = dataType/autoIncrement/notNull/default/unique/primaryKey/multiEntry/enableSearch/disableSearch;

autoIncrement = AUTOINCREMENT {
    return {
        autoIncrement:true
    }
}

notNull = NOTNULL {
    return {
        notNull:true
    }
}

default = DEFAULT _* val: value {
    return {
        default:val
    }
}

dataType = type: (STRING/NUMBER/OBJECT/ARRAY/BOOLEAN/DATETIME) {
    return {
        dataType:type.join('').toLowerCase()
    }
}

unique = UNIQUE {
    return {
        unique:true
    }
}

primaryKey = PRIMARYKEY {
    return {
        primaryKey:true
    }
}

multiEntry = MULTIENTRY {
    return {
        multiEntry:true
    }
}

enableSearch = ENABLESEARCH {
    return {
        enableSearch:true
    }
}

disableSearch = DISABLESEARCH {
    return {
        enableSearch:false
    }
}

version = VERSION _* val:Number {
    return {
        version:val
    }
}
