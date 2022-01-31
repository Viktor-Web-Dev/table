const getRandomValue = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

const configurationDataForPagination = (array, limit) => {
  let counter = 0
  return array.reduce((acc, current, index) => {
    if (index !== 0 && index % limit === 0) {//if prev array haves limit items write new array
      counter = counter + 1
      return [...acc, [{...current, uid: current.id}]]
    } else {
      if (acc[counter]) {//dynamic write items to new structure
        acc[counter] = [...acc[counter], {...current, uid: current.id}]
        return acc
      }
      return [[{...current, uid: current.id}]]//for started value
    }
  }, [])
}

const generateTableHeader = (object) => Object.keys(object) //create table headers on object keys

const changeRowValue = (object, min, max) => ({//using generated random number func for id & albumId
  ...object,
  id: getRandomValue(min, max),
  albumId: getRandomValue(min, max)
})

export {
  configurationDataForPagination,
  generateTableHeader,
  changeRowValue
}
