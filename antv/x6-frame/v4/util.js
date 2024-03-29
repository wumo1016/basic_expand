/*
 * @Description:
 * @Author: wyb
 * @LastEditors: wyb
 * @LastEditTime: 2022-04-23 16:42:07
 */
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
            ports: linkPorts,
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
            ports: linkPorts,
            data: item
          })
          parentNode.addChild(node)
        }
      })
    }
    loop([root], null, null)
  }

  createEdge(graph, options) {
    const edge = graph.createEdge({
      data: options.data || {},
      source: options.source,
      target: options.target,
      // 线路由规则
      router: 'manhattan',
      // 线连接器规则
      connector: 'jumpover',
      // connector: {
      //   name: 'smooth',
      //   args: { radius: 10 }
      // },
      magnet: true,
      attrs: {
        line: {
          // sourceMarker: {
          //   name: 'block',
          //   args: { size: 6 }
          // },
          targetMarker: {
            name: 'block',
            args: { size: 6 }
          },
          strokeWidth: 1, // 线宽
          stroke: 'blue',
          strokeDasharray: 5 // 虚线段长
        }
      }
    })
    return edge
  }

  setPortStyle(show, targetEl) {
    const container = show ? targetEl : document.getElementById(this._container)
    const ports = container.querySelectorAll('.x6-port-body')
    for (let i = 0, len = ports.length; i < len; i++) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }

  setEvent(graph) {
    this.setNodeMouseEnter(graph)
    this.setNodeMouseLeave(graph)
    this.setEdgeMouseEnter(graph)
    this.setEdgeMouseLeave(graph)
    this.setEdgeConnected(graph)
  }

  setNodeMouseEnter(graph) {
    graph.on('node:mouseenter', e => {
      this.setPortStyle(true, e.e.target.parentNode)
    })
  }

  setNodeMouseLeave(graph) {
    graph.on('node:mouseleave', e => {
      this.setPortStyle(false)
    })
  }

  setEdgeMouseEnter(graph) {
    graph.on('edge:mouseenter', ({ cell }) => {
      cell.addTools([
        {
          name: 'button',
          args: {
            markup: [
              {
                tagName: 'circle', // 使用何种图形渲染
                selector: 'body',
                attrs: {
                  r: 6,
                  strokeWidth: 2,
                  fill: '#fe854f',
                  cursor: 'pointer'
                }
              },
              {
                tagName: 'text',
                textContent: 'x',
                attrs: {
                  y: 2,
                  fill: '#fff',
                  fontSize: 10,
                  textAnchor: 'middle',
                  pointerEvents: 'none'
                }
              }
            ],
            distance: '50%', // percent/number
            onClick({ cell, view }) {
              console.log(cell.data) // 线相关信息
              console.log(view.sourceView.cell.data) // 源节点信息
              console.log(view.targetView.cell.data) // 目标节点信息
            }
          }
        }
      ])
    })
  }

  setEdgeMouseLeave(graph) {
    graph.on('edge:mouseleave', ({ cell }) => {
      cell.removeTools()
    })
  }

  setEdgeConnected(graph) {
    graph.on('edge:connected', ({ edge }) => {
      graph.removeEdge(edge)

      const edges = this.createEdge(graph, {
        source: edge.source,
        target: edge.target
      })
      graph.addEdge(edges)
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
