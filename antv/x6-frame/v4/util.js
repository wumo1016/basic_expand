/*
 * @Description:
 * @Author: wyb
 * @LastEditors: wyb
 * @LastEditTime: 2022-04-20 17:32:42
 */
const canvas = document.createElement('canvas')

const _textNodePadding = [10, 20] // 上下 左右
const _parentNodeHeight = 20
const _textNodeHeight = 20 // 文本节点高
const _nodeHSpace = 20 // 节点水平间距
const _nodeVSpace = 20 // 节点垂直间距
const _parentNodePadding = [20, 20] // 上下 左右

class X6FrameUtil {
  constructor(_container) {
    this.sourceNodePosition = null
    this._container = _container
  }

  dealData(data) {
    const innerData = []
    const outerData = []

    for (const item of data) {
      if (item.type === 'element') {
        innerData.push(item)
      }
    }

    this.dealInnerData(innerData)

    return innerData[0]
  }

  dealInnerData(data) {
    let root
    if (data.length === 1) {
      root = data[0]
    }

    root.x = 100
    root.y = 100
    root.layoutOptions = { 'elk.algorithm': 'layered' }

    this.dealNodeSize(root)
  }

  dealNodeSize(root) {
    const loop = (list, dep = 1) => {
      list.forEach(item => {
        let textWidth
        if (item.children?.length) {
          textWidth = getStringWidth(item.name, 16)
          item.labels = [
            {
              text: item.name,
              width: textWidth,
              layoutOptions: {
                'nodeLabels.placement': `[H_LEFT, V_TOP, OUTSIDE]`
              },
              height: _textNodeHeight
            }
          ]
          loop(item.children, dep + 1)
        } else {
          textWidth = getStringWidth(item.name, 12)
        }
        item._dep = dep
        item.width = textWidth + _textNodePadding[1] * 2
        item.height = _textNodeHeight + _textNodePadding[0] * 2
      })
    }
    loop([root])
  }

  dealLayout(graph, root) {
    const loop = (list, parent, parentNode) => {
      list.forEach(item => {
        if (parent) {
          item.x = parent.x + item.x
          item.y = parent.y + item.y
        }
        let node
        if (item.children?.length) {
          node = graph.createNode({
            id: item.id,
            x: item.x,
            y: item.y,
            width: item.width,
            height: item.height,
            zIndex: item._dep,
            label: item.name,
            attrs: {
              label: {
                refX: 0,
                refX2: 5,
                refY: -_textNodeHeight - 5,
                refY2: 5,
                textAnchor: 'start',
                textVerticalAnchor: 'top',
                fontSize: 16
              },
              body: {
                stroke: '#ffe7ba',
                rx: 6,
                ry: 6
                // fill: '#fffbe6',
              }
            },
            // ports: linkPorts,
            data: item
          })
          if (parent) {
            parentNode.addChild(node)
          } else {
            graph.addNode(node)
          }
          if (item.children?.length) loop(item.children, item, node)
        } else {
          node = graph.createNode({
            id: item.id,
            x: item.x,
            y: item.y,
            width: item.width,
            height: item.height,
            label: item.name,
            zIndex: item._dep,
            attrs: {
              label: {
                fontSize: 12
              },
              body: {
                stroke: '#ffe7ba',
                rx: 6,
                ry: 6
                // fill: '#3199FF'
              }
            },
            // ports: linkPorts,
            data: item
          })
          parentNode.addChild(node)
        }
      })
    }
    loop([root], null, null)
  }
}

/**
 * @Author: wyb
 * @Descripttion: 获取文本长度
 * @param {*} str
 * @param {*} fontSize
 */
function getStringWidth(str, fontSize = 12) {
  return canvas.getContext('2d').measureText(str).width * (fontSize / 10)
}
