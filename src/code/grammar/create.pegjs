createQuery = db:createDbQuery tables:createTableQuery* {
	db.tables=tables
     return {
        api:'create',
        data:db
    }
}

createDbQuery = DEFINE _* (DATABASE/DB) _* name:dbName ";"? {
	return {
    	name:name
    }
}

createTableQuery = DEFINE _* (TABLE) _* table:tableName _* "(" _* first:firstColumnDef all:betweenColumnDef* _* ")" _* ver:version? ";"? _* {
 all.push(first);
 var versionData = ver==null?null:ver['version'];
 return {
     name: table,
     columns : all,
     version: versionData
 }
}

firstColumnDef = columnDef;

betweenColumnDef = _* "," _* def: columnDef {
    return def;
}

columnDef = name:column _* options:columnOption* {
    var defaultValue = {
        name:name,
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
    return defaultValue;
}

columnOption = option:Column_Options _*{
	return option;
}

Column_Options = dataType/autoIncrement/notNull/default/unique/primaryKey/multiEntry/enableSearch;

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

default = DEFAULT _* val: ColumnValue {
    return {
        default:val
    }
}

dataType = type: (STRING/NUMBER/OBJECT/ARRAY/BOOLEAN/DATETIME) {
    console.log(type)
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
        primarykey:true
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

version = VERSION _* val:Number {
    return {
        version:val
    }
}
