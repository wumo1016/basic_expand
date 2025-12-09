const rootId = 'RootHead' // 头节点id
const tailId = 'RootTail' // 尾节点id
const rootFirstChildOffset = 100 // 第一个根子节点距离根节点的偏移量
const rootChildSpace = 40 // 根子节点普通间距
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
const lineColor = 'rgb(143, 143, 143)'
const isStraight = dep => !(dep % 2) // 是否是直节点
const canvas = document.createElement('canvas')

const ColorList = [
  '#83da2b',
  '#699cff',
  '#a188ff',
  '#35b58f',
  '#ff6991',
  '#e99d63',
  '#dabe2b',
  '#4cd9ef',
  '#d86bd8',
  '#e37171'
]

class FishMapUtil {
  /**
   * @Author: wyb
   * @Descripttion:
   * @param {*} source
   */
  constructor() {
    this.sourceData = {}
    this.canvasWidth = 0
    this.canvasHeight = 0
    this.topData = []
    this.bottomData = []
    this.nodes = []

    this.registerNode('fish-node')
  }
  /**
   * @Author: wyb
   * @Descripttion:
   * @param {*} root
   */
  dealData(root) {
    this.sourceData = root
    // 初始化数据
    this.topData = []
    this.bottomData = []
    this.nodes = []
    // 处理根节点
    root.id = rootId
    root.x = this.canvasWidth / 2
    root.y = this.canvasHeight / 2
    root._rootHead = true
    // 设置上下数据
    this.splitData(root)
    // 处理尾节点
    const rootTailNode = {
      x: root.x - this.getRootWidth(),
      y: root.y,
      id: tailId,
      name: root.name,
      _rootTail: true
    }
    this.nodes.push(root, rootTailNode)

    // 返回g6需要的数据
    return {
      nodes: this.nodes,
      edges: [
        {
          source: tailId,
          target: rootId
        }
      ]
    }
  }
  /**
   * @Author: wyb
   * @Descripttion:
   * @param {*} data
   */
  splitData(root) {
    ;(root.children || []).forEach((item, index) => {
      item._rootChild = true
      item._bgColor = ColorList[index % 10]
      if (index % 2) {
        this.bottomData.push(item)
      } else {
        this.topData.push(item)
      }
    })
    if (this.topData.length) {
      const firstTop = this.topData[0]
      firstTop.x = root.x - 100
      firstTop.y = root.y
      if (this.bottomData.length) {
        const firstBottom = this.bottomData[0]
        firstBottom.x = firstTop.x - rootChildSpace
        firstBottom.y = root.y
      }
    }
    this.dealNodeSize(this.topData, root, this.nodes)
    this.dealNodeSize(this.bottomData, root, this.nodes, false)
  }
  /**
   * @Author: wyb
   * @Descripttion:
   * @param {*} data
   * @param {*} root
   * @param {*} nodes
   * @param {*} isTop
   */
  dealNodeSize(data, root, nodes, isTop = true) {
    const loop = (list, dep = 1, parent) => {
      list.forEach(item => {
        item._isTop = isTop
        /* 设置节点样式 */
        if (parent) {
          item._bgColor = parent._bgColor
        }
        /* 节点深度 */
        item._dep = dep
        /* 设置旋转角度、文本偏移 */
        if (isTop) {
          if (isStraight(dep)) {
            item._rotate = 0
            item._textOffsetX = 30
          } else {
            item._rotate = 60
            item._textOffsetX = 20
          }
          if (item._rootChild) {
            item._textOffsetX = 30
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
          loop(item.children, dep + 1, item)
        }
        /* 设置宽高 */
        if (item.children?.length) {
          if (isStraight(dep)) {
            item._totalWidth =
              getNodeWidth(item) +
              item.children.reduce(
                (total, cur) =>
                  total +
                  (cur.children?.length
                    ? cur._totalWidth
                    : TILT_NO_CHILD_WIDTH),
                0
              )
            item._totalHeight =
              Math.max(...item.children.map(v => v._totalHeight)) + 15 // todo
          } else {
            let childsHeight =
              item.children.reduce(
                (total, cur) => total + cur._totalHeight,
                0
              ) + 30
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
    this.dealNodePosition(data, root, nodes, isTop)
  }
  /**
   * @Author: wyb
   * @Descripttion:
   * @param {*} data
   * @param {*} root
   * @param {*} nodes
   * @param {*} isTop
   */
  dealNodePosition(data, root, nodes, isTop) {
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
                  (prev.children?.length
                    ? prev._totalWidth
                    : TILT_NO_CHILD_WIDTH)
              } else {
                let curX =
                  prev.x -
                  (prev.children?.length
                    ? prev._totalWidth
                    : TILT_NO_CHILD_WIDTH)
                if (item._dep === 1) {
                  let topX = this.topData[index].x - MAIN_Space
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
            item._lineOffset = -6
          } else {
            item._lineOffset = 6
          }
          if (last) {
            _lineLong = item.x - last.x + 20
          } else {
            _lineLong = getNodeWidth(item)
          }
        } else {
          if (isTop) {
            if (item._rootChild) {
              item._lineOffset = -8
            } else {
              item._lineOffset = 6
            }
          } else {
            if (item._rootChild) {
              item._lineOffset = 5
            } else {
              item._lineOffset = -6
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
   * @Descripttion: 设置画布尺寸
   * @param {*} width
   * @param {*} height
   */
  setCanvasSize(width, height) {
    this.canvasWidth = width
    this.canvasHeight = height
  }
  /**
   * @Author: wyb
   * @Descripttion:
   * @param {*}
   */
  getRootWidth() {
    const topListWidth = this.topData.reduce(
      (total, cur) =>
        total + (cur.children?.length ? cur._totalWidth : TILT_NO_CHILD_WIDTH),
      0
    )
    const bottomListWidth = this.bottomData.reduce(
      (total, cur) =>
        total + (cur.children?.length ? cur._totalWidth : TILT_NO_CHILD_WIDTH),
      0
    )
    return Math.max(topListWidth, bottomListWidth) + 200
  }
  /**
   * @Author: wyb
   * @Descripttion:
   * @param {*}
   */
  registerNode(name) {
    G6.registerNode(name, {
      draw(ctx, group) {
        const { _rootHead, _rootTail, _bgColor, _rootChild } = ctx
        if (_rootHead) {
          // const width = 170
          // const height = 150
          // const halfHeight = height / 2
          // 指引线  rx ry x-axis-rotation large-arc-flag sweep-flag x y
          // x半径 y半径 旋转角度 大弧/小狐 顺时针/逆时针 终点x 终点y
          // group.addShape('path', {
          //   attrs: {
          //     path: [
          //       ['M', 0, 0],
          //       ['L', 0, -halfHeight],
          //       ['M', 0, -halfHeight],
          //       ['A', width, halfHeight, 0, 0, 1, 0, halfHeight],
          //       ['M', 0, halfHeight],
          //       ['L', 0, 0]
          //     ],
          //     stroke: '#424f58',
          //     fill: '#424f58',
          //     lineWidth: 2
          //   },
          //   draggable: true
          // })
          const width = getStringWidth(ctx.name) + 120
          const height = width
          group.addShape('image', {
            attrs: {
              x: 0,
              y: -height / 2,
              img: './fish1.svg',
              width,
              height
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: 'image-shape'
          })
          group.addShape('text', {
            attrs: {
              x: 10,
              y: height / 5,
              text: ctx.name,
              textAlign: 'left',
              textBaseline: 'middle',
              fill: '#fff',
              fontSize: 16
            },
            draggable: true
          })
        } else if (_rootTail) {
          const height = ((getStringWidth(ctx.name) + 120) / 5) * 4
          const width = (height / 11) * 7
          // const path = group.addShape('path', {
          //   attrs: {
          //     path: [
          //       ['M', 0, 0],
          //       ['A', width, height, 45, 1, 0, -width * 2, 0],
          //       ['M', 0, 0],
          //       ['A', width, height, -45, 0, 1, -width * 2, 0]
          //     ],
          //     stroke: '#424f58',
          //     fill: '#424f58',
          //     lineWidth: 2
          //   }
          // })
          // return path
          group.addShape('image', {
            attrs: {
              x: 0,
              y: -height / 2,
              img: './fish2.svg',
              width,
              height
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: 'image-shape'
          })
        } else {
          const subGroup = group.addGroup({
            id: 'fish-node-group'
          })
          // 矩形边框
          const rect = subGroup.addShape('rect', {
            attrs: {
              name: 'key-rect',
              fill: _bgColor,
              radius: 0,
              cursor: 'pointer',
              fillOpacity: _rootChild ? 1 : 0.1
            },
            name: 'key-rect',
            draggable: true
          })
          // 文本
          const text = subGroup.addShape('text', {
            attrs: {
              x: -ctx._textOffsetX,
              y: -ctx._textOffsetY || 0,
              text: ctx.name,
              textAlign: 'right',
              textBaseline: 'middle',
              fill: _rootChild ? '#fff' : '#000',
              fontSize: 12
            },
            draggable: true
          })
          const textBox = text.getBBox()
          const textPadding = [4, 6]
          rect.attr({
            x: -(ctx._textOffsetX + textBox.width + textPadding[1]),
            y: -(ctx._textOffsetY || 0) - (textBox.height / 2 + textPadding[0]),
            width: textBox.width + textPadding[1] * 2,
            height: textBox.height + textPadding[0] * 2
          })
          // 指引线
          const _lineY = 10
          subGroup.addShape('path', {
            attrs: {
              // startArrow: {
              //   path: 'M 0,0 L 4,2 L 4,-2 Z'
              // },
              path: [
                ['M', ctx._lineOffset, _lineY],
                ['L', -ctx._lineLong, _lineY]
              ],
              stroke: lineColor,
              lineWidth: getLineWidth(ctx._dep)
            },
            draggable: true
          })
          // 旋转
          subGroup.rotate((Math.PI / 180) * ctx._rotate)
        }
        return group
      }
    })
  }
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
  return Math.max(getStringWidth(node.name, fontSize) + 20, defaultWidth) + 30
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
/**
 * @Author: wyb
 * @Descripttion: 获取线宽
 * @param {*} dep
 */
function getLineWidth(dep) {
  return Math.max(4 - dep * 0.5, 2)
}
