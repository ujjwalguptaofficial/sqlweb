openQuery = OPEN _* name:dbName {
    return {
        api:'openDb',
        data:name
    }
}

