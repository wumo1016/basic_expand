/* bug修复之undefined*/

const data = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1'
          }
        ]
      }
    ]
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1'
          }
        ]
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1'
          }
        ]
      }
    ]
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1'
          }
        ]
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1'
          }
        ]
      }
    ]
  }
]

const selectedKeys = [
  'Level three 1-1-1',
  'Level two 2-1',
  'Level one 3',
  'Level three 3-1-1'
]
/**
 * @Author:
 * @Descripttion:
 * @param {*} treeList 树数据
 * @param {*} keys 已勾选的key集合
 * @param {*} keyField key字段名
 * @param {*} childField child字段名
 */
function getData(treeList, keys, keyField = '', childField = '') {
  const loop = (list, res = []) => {
    list.map((item) => {
      const existed = keys.includes(item[keyField])
      let newChlid
      if (existed) {
        newChlid = { ...item, [childField]: [] }
        res.push(newChlid)
      }
      const children = item[childField]
      if (children && children.length) {
        loop(children, existed ? newChlid[childField] : res)
      }
    })
    return res
  }
  return loop(treeList)
}

// console.dir(loop(data, [], true), { depth: Infinity })

console.dir(getData(data, selectedKeys, 'label', 'children'), {
  depth: Infinity
})
