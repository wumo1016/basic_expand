const canvas = document.createElement('canvas')

const _textNodePadding = [10, 20] // 上下 左右
const _parentNodeHeight = 20
const _textNodeHeight = 20 // 文本节点高
const _nodeHSpace = 20 // 节点水平间距
const _nodeVSpace = 20 // 节点垂直间距
const _parentNodePadding = [20, 20] // 上下 左右

const linkPorts = {
  groups: {
    top: {
      position: 'top',
      attrs: {
        // circle: {
        //   r: 5,
        //   magnet: true,
        //   stroke: '#31d0c6',
        //   strokeWidth: 1,
        //   fill: '#fff',
        //   style: {
        //     visibility: 'hidden'
        //   }
        // }
        rect: {
          width: 10
        }
      }
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 5,
          magnet: true,
          stroke: '#31d0c6',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 5,
          magnet: true,
          stroke: '#31d0c6',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 5,
          magnet: true,
          stroke: '#31d0c6',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    }
  },
  items: [
    {
      group: 'right'
    },
    {
      group: 'top'
    },
    {
      group: 'bottom'
    },
    {
      group: 'left'
    }
  ]
}

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

    return {
      nodes: innerData
    }
  }

  dealInnerData(data) {
    let root
    if (data.length === 1) {
      root = data[0]
    }

    root.x = 100
    root.y = 100

    this.dealNodeSize(root)
  }

  dealNodeSize(root) {
    const loop = (children, parent) => {
      if (children?.length) {
        parent._curTop = _parentNodePadding[0] + _parentNodeHeight
        parent._curLeft = _parentNodePadding[1]
        parent.width = _parentNodePadding[1] * 2
        parent.height = _parentNodePadding[0] * 2 + _parentNodeHeight
        children.forEach((child, index) => {
          loop(child.children, child)
          if (parent._curLeft < 350) {
            child._relativeX = parent._curLeft
            child._relativeY = parent._curTop
            if (index === 0) {
              parent.width = child._relativeX + child.width
              parent.height = child._relativeY + child.height
            } else {
              parent.width = Math.max(
                parent.width,
                child._relativeX + child.width
              )
              parent.height = Math.max(
                parent.height,
                child._relativeY + child.height
              )
            }
            parent._curLeft = child._relativeX + child.width + _nodeHSpace
          } else {
            parent._curLeft = _parentNodePadding[1]
            parent._curTop = parent.height + _nodeVSpace
            child._relativeX = parent._curLeft
            child._relativeY = parent._curTop
            parent.width = Math.max(
              parent.width,
              child.width + _parentNodePadding[1] * 2
            )
            parent.height += child.height
            parent._curLeft = child._relativeX + child.width + _nodeHSpace
          }
        })
        parent.width += _parentNodePadding[1]
        parent.height += _parentNodePadding[0]
      } else {
        parent.width = getStringWidth(parent.name) + _textNodePadding[1] * 2
        parent.height = _textNodeHeight + _textNodePadding[0] * 2
      }
    }
    loop(root.children, root)
  }

  dealLayout(graph, root) {
    const loop = (list, parent, parentNode, dep = 1) => {
      list.forEach(item => {
        item._dep = dep
        if (parent) {
          item.x = parent.x + item._relativeX
          item.y = parent.y + item._relativeY
        }
        let node
        if (item.children?.length) {
          node = graph.createNode({
            x: item.x,
            y: item.y,
            width: item.width,
            height: item.height,
            zIndex: dep,
            label: item.name,
            attrs: {
              label: {
                fontSize: 12,
                refX: 0,
                refX2: 5,
                refY: 0,
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
          if (item.children?.length) loop(item.children, item, node, dep + 1)
        } else {
          node = graph.createNode({
            x: item.x,
            y: item.y,
            width: item.width,
            height: item.height,
            label: item.name,
            zIndex: dep,
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
    loop([root], null, null, 1)
  }

  // https://x6.antv.vision/zh/examples/showcase/practices#flowchart
  setPortStyle(show) {
    const container = document.getElementById(this._container)
    const ports = container.querySelectorAll('.x6-port-body')
    for (let i = 0, len = ports.length; i < len; i++) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }

  setNodeMouseEnter(graph) {
    graph.on('cell:mouseenter', ({ cell }) => {
      // this.setPortStyle(true)
      cell.addTools([
        {
          name: 'boundary',
          args: {
            attrs: {
              fill: '#7c68fc',
              stroke: '#333',
              'stroke-width': 1,
              'fill-opacity': 0.2
            }
          }
        },
      ])
    })
  }

  setNodeMouseLeave(graph) {
    graph.on('cell:mouseleave', ({ cell }) => {
      // this.setPortStyle(false)
      cell.removeTools()
    })
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
