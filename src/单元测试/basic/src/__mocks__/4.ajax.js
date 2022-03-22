export function getList() {
  return new Promise(r => {
    r([1, 2, 3, 4])
  })
}
