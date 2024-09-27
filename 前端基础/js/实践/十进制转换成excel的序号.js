function indexToScaleText(index, scaleText) {
  const scale = scaleText.length
  let str = ''
  while (index >= 0) {
    const m = index % scale
    str = scaleText[m] + str
    index = (index - m) / scale - 1
  }
  return str
}

// function indexToScaleText(index, scaleText) {
//   const scale = scaleText.length
//   let str = ''

//   while (index > 0) {
//     const m = index % scale
//     str = scaleText[m - 1] + str
//     index = (index - m) / scale
//   }

//   return str
// }

console.log(indexToScaleText(755, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'))
// console.log(indexToScaleText(2, '01'))
