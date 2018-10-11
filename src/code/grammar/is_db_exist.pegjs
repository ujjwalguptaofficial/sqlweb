isDbExistQuery = ISDBEXIST _* name:dbName {
    return {
        api:'isDbExist',
        data:name
    }
}

