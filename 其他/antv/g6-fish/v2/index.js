const NODE_HEIGHT = 30
const NODE_WIDTH = 120

const NODE_WIDTH_ARROR = NODE_WIDTH
const X_NODE_WIDTH = NODE_WIDTH_ARROR / 2 // 70
const X_NODE_HEIGHT = X_NODE_WIDTH * Math.sqrt(3)

const F_HSpace = 20
const F_VSpace = F_HSpace * Math.sqrt(3)

const ROOT_F_HSpace = 50
const ROOT_F_VSpace = ROOT_F_HSpace * Math.sqrt(3)

const TILT_NO_CHILD_WIDTH = 35 // 倾斜线没有子节点时的宽度

const lineColor = '#424f58'

G6.registerNode(
  'my-node',
  {
    draw(ctx, group) {
      const { rootHead, rootTail } = ctx

      const subGroup = group.addGroup({
        id: 'my-group'
      })

      if (rootHead) {
        const width = 170
        const height = 150
        const halfHeight = height / 2
        // 指引线  rx ry x-axis-rotation large-arc-flag sweep-flag x y
        // x半径 y半径 旋转角度 大弧/小狐 顺时针/逆时针 终点x 终点y
        subGroup.addShape('path', {
          attrs: {
            path: [
              ['M', 0, 0],
              ['L', 0, -halfHeight],
              ['M', 0, -halfHeight],
              ['A', width, halfHeight, 0, 0, 1, 0, halfHeight],
              ['M', 0, halfHeight],
              ['L', 0, 0]
            ],
            stroke: '#424f58',
            fill: '#424f58',
            lineWidth: 2
          },
          name: 'path-shape'
        })
        const text = subGroup.addShape('text', {
          attrs: {
            x: 10,
            y: 0,
            text: ctx.name,
            textAlign: 'left',
            textBaseline: 'middle',
            fill: '#fff',
            fontSize: 16
          },
          name: 'path-text'
        })
      } else if (rootTail) {
        const width = 30
        const height = 8
        subGroup.addShape('path', {
          attrs: {
            path: [
              ['M', 0, 0],
              ['A', width, height, 45, 1, 0, -width * 2, 0],
              ['M', 0, 0],
              ['A', width, height, -45, 0, 1, -width * 2, 0]
            ],
            stroke: '#424f58',
            fill: '#424f58',
            lineWidth: 2
          },
          name: 'path-shape'
        })
      } else {
        // 文本
        const text = subGroup.addShape('text', {
          attrs: {
            x: -ctx._textOffsetX,
            y: -ctx._textOffsetY || 0,
            text: ctx.name,
            textAlign: 'right',
            textBaseline: 'middle',
            fill: '#000'
          },
          name: 'key-text'
        })
        // 指引线
        subGroup.addShape('path', {
          attrs: {
            startArrow: {
              path: 'M 0,0 L 4,2 L 4,-2 Z'
            },
            path: [
              ['M', ctx._lineOffset, 10],
              ['L', -ctx._lineLong, 10]
            ],
            stroke: lineColor,
            lineWidth: 2
          },
          name: 'path-shape'
        })

        subGroup.rotate((Math.PI / 180) * ctx._rotate)
      }

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
      lineWidth: 5,
      stroke: lineColor
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

  const nodes = [root]
  const edges = [
    {
      source: '2',
      target: '1'
    }
  ]

  const topList = []
  const bottomList = []

  ;(root.children || []).forEach((item, index) => {
    item._rootChild = true
    if (index % 2) {
      bottomList.push(item)
    } else {
      topList.push(item)
    }
  })

  if (topList.length) {
    topList[0].x = root.x - 100
    topList[0].y = root.y
  }

  if (bottomList.length) {
    bottomList[0].x = root.x - 150
    bottomList[0].y = root.y
  }

  dealTopData(topList, root, nodes)
  dealBottomData(bottomList, root, nodes)

  const rootTailNode = {
    x: root.x - getRootWidth(topList, bottomList),
    y: root.y,
    id: '2',
    name: '',
    rootTail: true
  }
  nodes.push(rootTailNode)

  return {
    nodes,
    edges
  }
}

function dealTopData(data, root, nodes) {
  const isOdd = num => !!(num % 2)
  const loop = (list, dep = 1) => {
    list.forEach(item => {
      /* 节点深度 */
      item._dep = dep
      /* 设置旋转角度、文本偏移 */
      if (isOdd(dep)) {
        item._rotate = 60
        item._textOffsetX = 10
      } else {
        item._rotate = 0
        item._textOffsetX = 20
      }
      if (item._rootChild) {
        item._textOffsetX = 20
      }
      /* 递归 */
      if (item.children?.length) {
        loop(item.children, dep + 1)
      }
      /* 设置宽高 */
      if (item.children?.length) {
        // 斜
        if (isOdd(dep)) {
          let childsHeight =
            item.children.reduce((total, cur) => total + cur._totalHeight, 0) +
            30
          item._totalHeight = Math.max(X_NODE_HEIGHT, childsHeight)
          item._totalWidth = Math.max(
            ...item.children.map((item, index) => {
              return item._totalWidth + F_HSpace * (index + 1)
            })
          )
        } else {
          // 直
          // 子宽度的和
          item._totalWidth =
            NODE_WIDTH +
            item.children.reduce(
              (total, cur) =>
                total +
                (cur.children?.length ? cur._totalWidth : TILT_NO_CHILD_WIDTH),
              0
            )
          // 子高度最大的
          item._totalHeight =
            Math.max(...item.children.map(v => v._totalHeight)) + 15
        }
      } else {
        // 斜线
        if (isOdd(dep)) {
          item._totalWidth = X_NODE_WIDTH
          item._totalHeight = X_NODE_HEIGHT
        } else {
          // 直线
          item._totalWidth = NODE_WIDTH
          item._totalHeight = NODE_HEIGHT
        }
      }
    })
  }
  loop(data)

  setTopPosition(data, root, nodes)
}

function setTopPosition(data, root, nodes) {
  const isOdd = num => !!(num % 2)
  const loop = (list, parent) => {
    list.forEach((item, index) => {
      // 倾斜的
      if (isOdd(item._dep)) {
        if (!item.x) {
          if (index === 0) {
            item.x = parent.x - NODE_WIDTH
          } else {
            const prev = list[index - 1]
            item.x =
              prev.x -
              (prev.children?.length ? prev._totalWidth : TILT_NO_CHILD_WIDTH)
          }
          item.y = parent.y
        }
      } else {
        // 直的
        if (index === 0) {
          if (parent._rootChild) {
            item.x = parent.x - ROOT_F_HSpace
            item.y = parent.y - ROOT_F_VSpace
          } else {
            item.x = parent.x - F_HSpace
            item.y = parent.y - F_VSpace
          }
        } else {
          const prev = list[index - 1]
          item.y = prev.y - prev._totalHeight
          item.x = prev.x - prev._totalHeight / Math.sqrt(3)
        }
      }
      nodes.push(item)

      if (item.children?.length) loop(item.children, item)

      /* 处理线长、线偏移量 */
      const last = item.children?.[item.children.length - 1]
      let _lineLong
      // 斜的
      if (isOdd(item._dep)) {
        if (item._rootChild) {
          item._lineOffset = -10
        } else {
          item._lineOffset = 2
        }
        const childWidth = item.x - last?.x || 0
        _lineLong =
          Math.max(X_NODE_WIDTH, childWidth) * 2 +
          (X_NODE_WIDTH > childWidth ? 0 : 30)
      } else {
        // 直的
        item._lineOffset = -10
        if (last) {
          _lineLong = item.x - last.x + 20
        } else {
          _lineLong = X_NODE_WIDTH * 2
        }
      }
      item._lineLong = _lineLong
    })
  }
  loop(data, root)
  // console.log(data)
}

function dealBottomData(data, root, nodes) {
  const isOdd = num => !!(num % 2)
  const loop = (list, dep = 1) => {
    list.forEach(item => {
      /* 节点深度 */
      item._dep = dep
      /* 设置旋转角度、文本偏移 */
      if (isOdd(dep)) {
        item._rotate = -60
        item._textOffsetX = 25
        item._textOffsetY = -20
      } else {
        item._rotate = 0
        item._textOffsetX = 10
      }
      if (item._rootChild) {
        item._textOffsetX = 15
      }
      /* 递归 */
      if (item.children?.length) {
        loop(item.children, dep + 1)
      }
      /* 设置宽高 */
      if (item.children?.length) {
        // 斜
        if (isOdd(dep)) {
          let childsHeight =
            item.children.reduce((total, cur) => total + cur._totalHeight, 0) +
            30
          item._totalHeight = Math.max(X_NODE_HEIGHT, childsHeight)
          item._totalWidth = Math.max(
            ...item.children.map((item, index) => {
              return item._totalWidth + F_HSpace * (index + 1)
            })
          )
        } else {
          // 直
          // 子宽度的和
          item._totalWidth =
            NODE_WIDTH +
            item.children.reduce(
              (total, cur) =>
                total +
                (cur.children?.length ? cur._totalWidth : TILT_NO_CHILD_WIDTH),
              0
            )
          // 子高度最大的
          item._totalHeight =
            Math.max(...item.children.map(v => v._totalHeight)) + NODE_HEIGHT
        }
      } else {
        // 斜线
        if (isOdd(dep)) {
          item._totalWidth = X_NODE_WIDTH
          item._totalHeight = X_NODE_HEIGHT
        } else {
          // 直线
          item._totalWidth = NODE_WIDTH
          item._totalHeight = NODE_HEIGHT
        }
      }
    })
  }
  loop(data)

  setBottomPosition(data, root, nodes)
}

function setBottomPosition(data, root, nodes) {
  const isOdd = num => !!(num % 2)
  const loop = (list, parent) => {
    list.forEach((item, index) => {
      // 倾斜的
      if (isOdd(item._dep)) {
        if (!item.x) {
          if (index === 0) {
            item.x = parent.x - NODE_WIDTH
          } else {
            const prev = list[index - 1]
            item.x =
              prev.x -
              (prev.children?.length ? prev._totalWidth : TILT_NO_CHILD_WIDTH)
          }
          item.y = parent.y
        }
      } else {
        // 直的
        if (index === 0) {
          if (parent._rootChild) {
            item.x = parent.x - ROOT_F_HSpace
            item.y = parent.y + ROOT_F_VSpace
          } else {
            item.x = parent.x - F_HSpace
            item.y = parent.y + F_VSpace
          }
        } else {
          const prev = list[index - 1]
          item.y = prev.y + prev._totalHeight
          item.x = prev.x - prev._totalHeight / Math.sqrt(3)
        }
      }
      nodes.push(item)

      if (item.children?.length) loop(item.children, item)

      /* 处理线长、线偏移量 */
      const last = item.children?.[item.children.length - 1]
      let _lineLong
      // 斜的
      if (isOdd(item._dep)) {
        if (item._rootChild) {
          item._lineOffset = 3
        } else {
          item._lineOffset = -10
        }
        const childWidth = item.x - last?.x || 0
        _lineLong =
          Math.max(X_NODE_WIDTH, childWidth) * 2 +
          (X_NODE_WIDTH > childWidth ? 0 : 30)
      } else {
        // 直的
        item._lineOffset = 3
        if (last) {
          _lineLong = item.x - last.x + 20
        } else {
          _lineLong = X_NODE_WIDTH * 2
        }
      }
      item._lineLong = _lineLong
    })
  }
  loop(data, root)
  // console.log(data)
}

/**
 * @Author: wyb
 * @Descripttion: 获取根宽度
 * @param {*}
 */
function getRootWidth(topList, bottomList) {
  const topListWidth = topList.reduce(
    (total, cur) =>
      total + (cur.children?.length ? cur._totalWidth : TILT_NO_CHILD_WIDTH),
    0
  )
  const bottomListWidth = bottomList.reduce(
    (total, cur) =>
      total + (cur.children?.length ? cur._totalWidth : TILT_NO_CHILD_WIDTH),
    0
  )
  return Math.max(topListWidth, bottomListWidth) + 200
}

// https://blog.csdn.net/xiaoxiangzi520/article/details/103926013
