joinQry = type:joinType _+ JOIN _+ table:tableName _+ ON _+ onValue1: onValue _* '=' onValue2: onValue _*{
  return  {
   with: table,
   on: `${onValue1}=${onValue2}`,
   type: type
  }
}

onValue "on value" = val:[a-zA-Z_.]+ {
	return val.join("");
}

joinType = type:(INNER/LEFT)? {
   if(type==null){
     return null;
   }
   else{
    return type.join('')
   }
}

