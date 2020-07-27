

removeQuery = DELETE _* FROM _ table:tableName _* where:whereQry? _*  {
  return {
     api:'remove',
     data:{
        from:table,
        where:where,
     }
  }
}



