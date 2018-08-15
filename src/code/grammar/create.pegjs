createQuery = createDbQuery createTableQuery

createDbQuery = DEFINE _* (DATABASE/DB) _* dbName ";"?
createTableQuery = DEFINE _* (TABLE) _* table:tableName _* "(" _* first:firstColumnDef* all:betweenColumnDef* _* ")" ver:version? ";"? {
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

columnDef = name:column _* options:columnOptions* {
    var defaultValue = {
        name:name,
        unique:false,
        autoincrement:false,
        default:null,
        notNull:false,
        dataType:null,
        primarykey:false,
        multiEntry:false,
        enablesearch:true
    }
    options.forEach(option=>{
        var key = Object.keys(option)[0];
        defaultValue[key] = option[key];
    });
    return defaultValue;
}

columnOptions = dataType/autoIncrement/notNull/default/unique/primaryKey/multiEntry/enableSearch;

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

dataType = type: STRING/NUMBER/OBJECT/ARRAY/BOOLEAN/DATETIME {
    return {
        dataTypes:type
    }
}

unique = UNIQUE {
    return {
        unique:true
    }
}

primaryKey = PRIMERYKEY {
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

VERSION "version" = V E R S I O N;

ENABLESEARCH "enablesearch" = E N A B L E S E A R C H;

MULTIENTRY "multiEntry" =  M U L T I E N T R Y;

PRIMERYKEY "primarykey" = P R I M E R Y K E Y; 

UNIQUE "unique" = U N I Q U E;

STRING "string" = S T R I N G;

NUMBER "number" = N U M B E R;

OBJECT "object" = O B J E C T;

ARRAY "array" =  A R R A Y;

BOOLEAN "boolean" = B O O L E A N;

DATETIME "datetime" = D A T E T I M E;

AUTOINCREMENT "autoincrement" = A U T O I N C R E M E N T;

NOTNULL "notnull" = N O T N U L L;

DEFAULT "default" = D E F A U L T;

DEFINE "define" = D E F I N E;

DATABASE "database" = D A T A B A S E;

TABLE "table" = T A B L E;

DB "db" = D B;