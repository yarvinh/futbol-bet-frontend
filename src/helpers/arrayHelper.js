export const addItemToArray = ({array, item})=>{
    // return array.unshift(item)
    return array.push(item)
}

export const editItemFromArray = ({array,item})=>{
   const itemIndex = array.findIndex(i => i.id === item.id)
   if (itemIndex)
     array[itemIndex] = item
   return array
}

export const deleteItemFromArray = ({array,id})=>{
    const itemIndex = array.findIndex((i) => {
      return i.id === id
    })

    if(itemIndex !== -1)
      array.splice(itemIndex,1)

  return array
}

export const findIndexById = ({array,id})=>{
  const index = array.findIndex(i => i.id === id)
  if(index !== -1)
     return index
  else
     return false
}

export const findItemById = ({array,id})=>{
  // console.log(parseInt(id,10),array)
  const item = array.find(i => i.id === parseInt(id,10))
  return item
}