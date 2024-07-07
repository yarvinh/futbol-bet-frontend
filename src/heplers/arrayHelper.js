export const addItemToArray = ({array, item})=>{
    return array.push(item)
}

export const editItemFromArray = ({array,item})=>{
   const itemIndex = array.findIndex(i => i.id === item.id)
   if (itemIndex)
     array[itemIndex] = item
   return array
}

export const deleteItemFromArray = ({array,id})=>{
    const itemIndex = array.findIndex(i => i.id === id)
    if (itemIndex)
       array.splice(itemIndex,1)
  return array
}