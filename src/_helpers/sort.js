export function sortBy(fieldName) {
  return function (arr, sortOrder) {
    let newArray = [...arr].sort((a, b) => {
      return sortOrder === 'asc' ? a[fieldName] > b[fieldName] : a[fieldName] < b[fieldName]
    })
    return newArray;
  }
}
