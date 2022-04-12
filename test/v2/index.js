const NODE_HEIGHT = 30
const NODE_WIDTH = 120
const NODE_PADDING = 20
const F_HSpace = 30
const F_VSpace = 40

G6.registerNode(
  'my-node',
  {
    draw(ctx, group) {
      const { rootHead, rootTail } = ctx
      if (rootHead) {
        const text = group.addShape('text', {
          attrs: {
            name: 'key-text',
            x: 0,
            y: 0,
            text: '这是头',
            textAlign: 'right',
            textBaseline: 'middle',
            fill: '#000'
          }
        })
        return text
      } else if (rootTail) {
        const text = group.addShape('text', {
          attrs: {
            name: 'key-text',
            x: 0,
            y: 0,
            text: '这是尾巴',
            textAlign: 'right',
            textBaseline: 'middle',
            fill: '#000'
          }
        })
        return text
      }

      const subGroup = group.addGroup({
        id: 'my-group'
      })

      const text = subGroup.addShape('text', {
        attrs: {
          x: ctx.topPosition ? -20 : -10,
          y: 0,
          text: ctx.name,
          textAlign: 'right',
          textBaseline: 'middle',
          fill: '#000'
        },
        name: 'key-text'
      })

      subGroup.addShape('path', {
        attrs: {
          startArrow: {
            path: 'M 0,0 L 4,2 L 4,-2 Z'
          },
          path: [
            ['M', ctx.topPosition ? -10 : 2, 10],
            ['L', -ctx.width, 10]
          ],
          stroke: '#000',
          lineWidth: 2
        },
        name: 'path-shape'
      })

      subGroup.rotate((Math.PI / 180) * ctx.rotate)
      return subGroup
    }
  },
  'single-shape'
)

const container = document.querySelector('#container')
const graph = new G6.Graph({
  container,
  width: container.offsetWidth,
  height: container.offsetHeight,
  fitCenter: true,
  renderer: 'canvas',
  modes: {
    default: [
      {
        type: 'drag-canvas',
        allowDragOnItem: true
      }
    ]
  },
  defaultEdge: {
    style: {
      lineWidth: 2,
      stroke: '#000'
    }
  }
})

graph.node(node => {
  return {
    type: 'my-node'
  }
})

const finalData = dealData(mockData)

graph.data(finalData) // { nodes: [], edges: [] }
graph.render()

function dealData(root) {
  root.id = '1'
  root.y = container.offsetHeight / 2
  root.x = container.offsetWidth - 100
  root.rootHead = true
  root.rootTail = true

  dealFirst(root.children, root)

  const target = {
    x: root.x - 500,
    y: root.y,
    id: '2',
    name: '',
    rootTail: true
  }

  const nodes = [root, target]
  const edges = [
    {
      source: '2',
      target: '1'
    }
  ]

  // const loop = list => {
  //   list.map(item => {
  //     nodes.push(item)
  //     if (item.children?.length) loop(item.children)
  //   })
  // }
  // loop(root.children)

  return {
    nodes,
    edges
  }
}

function dealFirst(list, root) {
  const topList = []
  const bottomList = []

  list.map((item, index) => {
    if (index % 2) {
      bottomList.push(item)
    } else {
      topList.push(item)
    }
  })

  if (topList.length) {
    topList[0].x = root.x - 50
    topList[0].y = root.y
  }

  if (bottomList.length) {
    bottomList[0].x = root.x - 10
    bottomList[0].y = root.y
  }

  this.dealTopData(topList, root)

  // let prev
  // topList.forEach((item, index) => {
  //   if (index === 0) {
  //     item.x = root.x - 50
  //     item.width = 100
  //     item.xdis = 80
  //   } else {
  //     item.x = prev.x - prev.xdis
  //     item.width = 100
  //     item.xdis = 80
  //   }
  //   item.y = root.y
  //   item.rotate = 60
  //   item.topPosition = true
  //   prev = item
  // })

  // bottomList.forEach((item, index) => {
  //   if (index === 0) {
  //     item.x = root.x - 100
  //     item.width = 100
  //     item.xdis = 80
  //   } else {
  //     item.x = prev.x - prev.xdis
  //     item.width = 100
  //     item.xdis = 80
  //   }
  //   item.y = root.y
  //   item.rotate = -60
  //   item.bottomPosition = true
  //   prev = item
  // })

  // console.log(topList)
  // console.log(bottomList)
}

/* 
线宽 lineWidth


*/

function dealTopData(data, root) {
  const isOdd = num => !!(num % 2)
  const loop = (list, parent, dep = 1) => {
    list.forEach((item, index) => {
      /* 节点深度 */
      item._dep = dep
      /* 处理节点坐标 */
      // 倾斜的
      if (isOdd(dep)) {
        if (index === 0) {
        } else {
        }
      } else {
        // 直的
        if (index === 0) {
          item.x = parent.x - F_HSpace
          item.y = parent.y - F_HSpace
        } else {
        }
      }
      /* 递归 */
      if (item.children?.length) {
        loop(item.children, item, dep + 1)
      }
      /*  */
      if (isOdd(dep)) {
        item._rotate = 60
      } else {
        item._rotate = 0
      }
    })
  }
  loop(data, root)
  console.log(data)
}

// https://blog.csdn.net/xiaoxiangzi520/article/details/103926013
