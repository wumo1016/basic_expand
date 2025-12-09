const NODE_HEIGHT = 30
const NODE_WIDTH = 100
const X_NODE_WIDTH = NODE_WIDTH / 2
const X_NODE_HEIGHT = X_NODE_WIDTH * Math.sqrt(3)
const F_HSpace = 20
const F_VSpace = F_HSpace * Math.sqrt(3)
const ROOT_F_HSpace = 50
const ROOT_F_VSpace = ROOT_F_HSpace * Math.sqrt(3)
const TILT_NO_CHILD_WIDTH = 35 // 倾斜线没有子节点时的宽度
const MAIN_Space = 40 // 主线间隔
const lineColor = '#424f58'
const canvas = document.createElement('canvas')
const isStraight = dep => !(dep % 2) // 是否是直节点
const isOdd = num => !!(num % 2)

G6.registerNode('my-node', {
  draw(ctx, group) {
    const { rootHead, rootTail } = ctx
    if (rootHead) {
      const width = 170
      const height = 150
      const halfHeight = height / 2
      // 指引线  rx ry x-axis-rotation large-arc-flag sweep-flag x y
      // x半径 y半径 旋转角度 大弧/小狐 顺时针/逆时针 终点x 终点y
      group.addShape('path', {
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
        draggable: true
      })
      group.addShape('text', {
        attrs: {
          x: 10,
          y: 0,
          text: ctx.name,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: '#fff',
          fontSize: 16
        },
        draggable: true
      })
      return group
    } else if (rootTail) {
      const width = 30
      const height = 8
      const path = group.addShape('path', {
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
        }
      })
      return path
    } else {
      const subGroup = group.addGroup({
        id: 'fish-node-group'
      })
      // 文本
      subGroup.addShape('text', {
        attrs: {
          x: -ctx._textOffsetX,
          y: -ctx._textOffsetY || 0,
          text: ctx.name,
          textAlign: 'right',
          textBaseline: 'middle',
          fill: '#000',
          fontSize: 12
        },
        draggable: true
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
          lineWidth: getLineWidth(ctx._dep)
        },
        draggable: true
      })
      // 旋转
      subGroup.rotate((Math.PI / 180) * ctx._rotate)
      return subGroup
    }
  }
})

let topList = []
let bottomList = []

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
    bottomList[0].x = topList[0].x - MAIN_Space
    bottomList[0].y = root.y
  }

  dealNodeSize(topList, root, nodes)
  dealNodeSize(bottomList, root, nodes, false)

  const rootTailNode = {
    x: root.x - getRootWidth(),
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

function dealNodeSize(data, root, nodes, isTop = true) {
  const loop = (list, dep = 1) => {
    list.forEach(item => {
      /* 节点深度 */
      item._dep = dep
      /* 设置旋转角度、文本偏移 */
      if (isTop) {
        if (isStraight(dep)) {
          item._rotate = 0
          item._textOffsetX = 20
        } else {
          item._rotate = 60
          item._textOffsetX = 10
        }
        if (item._rootChild) {
          item._textOffsetX = 20
        }
      } else {
        if (isStraight(dep)) {
          item._rotate = 0
          item._textOffsetX = 10
        } else {
          item._rotate = -60
          item._textOffsetX = 25
          item._textOffsetY = -20
        }
        if (item._rootChild) {
          item._textOffsetX = 15
        }
      }
      /* 递归 */
      if (item.children?.length) {
        loop(item.children, dep + 1)
      }
      /* 设置宽高 */
      if (item.children?.length) {
        if (isStraight(dep)) {
          item._totalWidth =
            getNodeWidth(item) +
            item.children.reduce(
              (total, cur) =>
                total +
                (cur.children?.length ? cur._totalWidth : TILT_NO_CHILD_WIDTH),
              0
            )
          item._totalHeight =
            Math.max(...item.children.map(v => v._totalHeight)) + 15 // todo
        } else {
          let childsHeight =
            item.children.reduce((total, cur) => total + cur._totalHeight, 0) +
            30
          const { height } = getVNodeSize(item)
          item._totalHeight = Math.max(height, childsHeight)
          item._totalWidth = Math.max(
            ...item.children.map((item, index) => {
              return item._totalWidth + F_HSpace * (index + 1)
            })
          )
        }
      } else {
        if (isStraight(dep)) {
          item._totalWidth = getNodeWidth(item)
          item._totalHeight = NODE_HEIGHT
        } else {
          const { width, height } = getVNodeSize(item)
          item._totalWidth = width
          item._totalHeight = height
        }
      }
    })
  }
  loop(data)
  dealNodePosition(data, root, nodes, isTop)
}

function dealNodePosition(data, root, nodes, isTop) {
  const loop = (list, parent) => {
    list.forEach((item, index) => {
      if (isStraight(item._dep)) {
        if (index === 0) {
          if (parent._rootChild) {
            item.x = parent.x - ROOT_F_HSpace
            if (isTop) {
              item.y = parent.y - ROOT_F_VSpace
            } else {
              item.y = parent.y + ROOT_F_VSpace
            }
          } else {
            item.x = parent.x - F_HSpace
            if (isTop) {
              item.y = parent.y - F_VSpace
            } else {
              item.y = parent.y + F_VSpace
            }
          }
        } else {
          const prev = list[index - 1]
          if (isTop) {
            item.y = prev.y - prev._totalHeight
          } else {
            item.y = prev.y + prev._totalHeight
          }
          item.x = prev.x - prev._totalHeight / Math.sqrt(3)
        }
      } else {
        if (!item.x) {
          if (index === 0) {
            item.x = parent.x - getNodeWidth(parent)
          } else {
            const prev = list[index - 1]
            if (isTop) {
              item.x =
                prev.x -
                (prev.children?.length ? prev._totalWidth : TILT_NO_CHILD_WIDTH)
            } else {
              let curX =
                prev.x -
                (prev.children?.length ? prev._totalWidth : TILT_NO_CHILD_WIDTH)
              if (item._dep === 1) {
                let topX = topList[index].x - MAIN_Space
                curX = Math.min(topX, curX)
              }
              item.x = curX
            }
          }
          item.y = parent.y
        }
      }
      nodes.push(item)

      /* 递归 */
      if (item.children?.length) loop(item.children, item)

      /* 处理线长、线偏移量 */
      const last = item.children?.[item.children.length - 1]
      let _lineLong
      if (isStraight(item._dep)) {
        if (isTop) {
          item._lineOffset = -10
        } else {
          item._lineOffset = 3
        }
        if (last) {
          _lineLong = item.x - last.x + 20
        } else {
          _lineLong = getNodeWidth(item)
        }
      } else {
        if (isTop) {
          if (item._rootChild) {
            item._lineOffset = -10
          } else {
            item._lineOffset = 2
          }
        } else {
          if (item._rootChild) {
            item._lineOffset = 3
          } else {
            item._lineOffset = -10
          }
        }
        const childWidth = item.x - last?.x || 0
        const { width } = getVNodeSize(item)
        _lineLong =
          Math.max(width, childWidth) * 2 + (width > childWidth ? 0 : 30)
      }
      item._lineLong = _lineLong
    })
  }
  loop(data, root)
}

/**
 * @Author: wyb
 * @Descripttion: 获取根宽度
 * @param {*}
 */
function getRootWidth() {
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

/**
 * @Author: wyb
 * @Descripttion:
 * @param {*} str
 * @param {*} fontSize
 */
function getStringWidth(str, fontSize = 12) {
  return canvas.getContext('2d').measureText(str).width * (fontSize / 10)
}
/**
 * @Author: wyb
 * @Descripttion: 获取水平节点宽
 * @param {*} node
 * @param {*} fontSize
 * @param {*} defaultWidth
 */
function getNodeWidth(node, fontSize = 12, defaultWidth = NODE_WIDTH) {
  return Math.max(getStringWidth(node.name, fontSize) + 20, defaultWidth)
}
/**
 * @Author: wyb
 * @Descripttion: 获取倾斜节点尺寸
 * @param {*} node
 * @param {*} fontSize
 * @param {*} defaultWidth
 */
function getVNodeSize(node) {
  const length = getNodeWidth(node)
  const width = length / 2
  return {
    width,
    height: width * Math.sqrt(3)
  }
}

function getLineWidth(dep) {
  return Math.max(4 - dep * 0.5, 2)
}

/* -------------------------------- */
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
      stroke: '#424f58'
    }
  }
})

graph.node(node => {
  return {
    type: 'my-node'
  }
})

const finalData = dealData(mockData)

graph.data(finalData)
graph.render()
