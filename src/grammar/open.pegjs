openQuery = OPENDB _* name:dbName {
    return {
        api:'openDb',
        data:name
    }
}

