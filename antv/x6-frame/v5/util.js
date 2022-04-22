/*
 * @Description:
 * @Author: wyb
 * @LastEditors: wyb
 * @LastEditTime: 2022-04-22 17:49:59
 */
const canvas = document.createElement('canvas')

const _nodePadding = [10, 20] // 上下 左右
const _nodeHeight = 20 // 文本节点高
const _nodeHSpace = 20 // 节点水平间距
const _nodeVSpace = 20 // 节点垂直间距

let aaa = 0

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
          fill: '#fff'
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
          fill: '#fff'
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
          fill: '#fff'
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
          fill: '#fff'
        }
      }
    }
  }
}

class X6FrameUtil {
  constructor(_container) {
    this.sourceNodePosition = null
    this._container = _container
    this._movingNode = null
    this._cloneCells = null
  }
  /**
   * @Author: wyb
   * @Descripttion: 缩放节点配置
   * @param {*}
   */
  get resizingConfig() {
    return {
      enabled: true,
      restricted: true,
      allowReverse: false,
      orthogonal: false,
      minWidth(node) {
        const children = (node.getChildren() || []).filter(cell =>
          cell.isNode()
        )
        if (children.length < 1) {
          const { name, fontSize } = node.data
          return getTextWidth(name, fontSize) + _nodePadding[1] * 2
        }
        return (
          Math.max(...children.map(child => child.getBBox().right)) -
          node.getPosition().x +
          12
        )
      },
      minHeight(node) {
        const children = (node.getChildren() || []).filter(cell =>
          cell.isNode()
        )
        if (children.length < 1) return _nodeHeight + _nodePadding[0] * 2
        return (
          Math.max(...children.map(child => child.getBBox().bottom)) -
          node.getPosition().y +
          12
        )
      },
      maxWidth(node) {
        const parent = node.getParent()
        if (!parent) return
        return parent.getBBox().right - node.getPosition().x - 10
      },
      maxHeight(node) {
        const parent = node.getParent()
        if (!parent) return
        return parent.getBBox().bottom - node.getPosition().y - 10
      }
    }
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
          item.fontSize = 16
          textWidth = getTextWidth(item.name, item.fontSize)
          item.labels = [
            {
              text: item.name,
              width: textWidth,
              layoutOptions: {
                'nodeLabels.placement': `[H_LEFT, V_TOP, OUTSIDE]`
              },
              height: _nodeHeight
            }
          ]
          loop(item.children, dep + 1)
        } else {
          item.fontSize = 12
          textWidth = getTextWidth(item.name, item.fontSize)
        }
        item._dep = dep
        item.width = textWidth + _nodePadding[1] * 2
        item.height = _nodeHeight + _nodePadding[0] * 2
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
                refY: -_nodeHeight - 5,
                refY2: 5,
                textAnchor: 'start',
                textVerticalAnchor: 'top',
                fontSize: item.fontSize
              },
              body: {
                stroke: '#ffe7ba',
                rx: 6,
                ry: 6
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
                fontSize: item.fontSize
              },
              body: {
                stroke: '#ffe7ba',
                rx: 6,
                ry: 6
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
  /**
   * @Author: wyb
   * @Descripttion: 创建边
   * @param {*} graph
   * @param {*} options
   */
  createEdge(graph, options) {
    // aaa += 10
    // console.log(aaa)
    const edge = graph.createEdge({
      data: options.data || {},
      source: {
        cell: options.source.cell
      },
      target: {
        cell: options.target.cell
        // connectionPoint: {
        //   name: 'anchor'
        // } // 连接点使用什么规则连接
        // anchor: { name: 'midSide', args: { padding: aaa } }, // 如果使用锚点连接 锚点规则
      },
      // 线路由规则
      router: 'manhattan',
      // router: {
      //   name: 'orth',
      // },
      // router: {
      //   name: 'er',
      //   args: {
      //     offset: 'center'
      //   }
      // },
      // 线连接器规则
      connector: 'normal',
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
  /**
   * @Author: wyb
   * @Descripttion: 设置事件
   * @param {*} graph
   */
  setEvent(graph) {
    this.setNodeMouseEnterLeave(graph)
    this.setNodeMouseDownUp(graph)
    this.setNodeResize(graph)
    this.setNodeMove(graph)

    this.setEdgeMouseEnterLeave(graph)
    this.setEdgeConnected(graph)
  }
  /**
   * @Author: wyb
   * @Descripttion: 设置节点鼠标进入事件
   * @param {*} graph
   */
  setNodeMouseEnterLeave(graph) {
    graph.on('cell:mouseenter', e => {
      const { node } = e
      // console.log(node.data.name, 'mouseenter')
      if (!node.hasPorts()) {
        node.addPorts([
          { group: 'top' },
          { group: 'top' },
          { group: 'right' },
          { group: 'right' },
          { group: 'bottom' },
          { group: 'bottom' },
          { group: 'left' },
          { group: 'left' }
        ])
      }
    })
    graph.on('node:mouseleave', e => {
      const { node } = e
      // console.log(node.data.name, 'mouseleave')
      node.removePorts()
    })
  }
  /**
   * @Author: wyb
   * @Descripttion: 设置边进入事件
   * @param {*} graph
   */
  setEdgeMouseEnterLeave(graph) {
    // 鼠标进入
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
              graph.removeCell(cell)
            }
          }
        }
      ])
    })
    // 鼠标离开
    graph.on('edge:mouseleave', ({ cell }) => {
      cell.removeTools()
    })
  }
  /**
   * @Author: wyb
   * @Descripttion: 设置边连接完毕事件
   * @param {*}
   */
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
  /**
   * @Author: wyb
   * @Descripttion: 设置节点鼠标按下抬起事件
   * @param {*} graph
   */
  setNodeMouseDownUp(graph) {
    // 按下
    graph.on('node:mousedown', e => {
      e.node.removePorts()
      this._cloneCells = graph.cloneCells(graph.getCells())
      this._movingNode = {
        ex: e.x,
        ey: e.y
      }
    })
    // 抬起
    graph.on('node:mouseup', e => {
      if (!this._movingNode || !this._cloneCells) return
      const { ex, ey } = this._movingNode
      if (ex === e.x && ey === e.y) return
      const node = e.node
      const { valid, data } = validateMove(graph, node)
      if (!valid) {
        // todo 提示信息
        console.log(`${node.data.name}与${data.data.name}非法相交`)
        graph.resetCells(Object.values(this._cloneCells))
      }
      // 重置
      this._movingNode = null
      this._cloneCells = null
    })
  }
  /**
   * @Author: wyb
   * @Descripttion: 设置调整节点事件
   * @param {*} graph
   */
  setNodeResize(graph) {
    // 开始调整
    graph.on('node:resize', e => {
      this._cloneCells = graph.cloneCells(graph.getCells())
    })
    // 结束调整
    graph.on('node:resized', e => {
      if (!this._cloneCells) return
      const node = e.node
      const { valid, data } = validateMove(graph, node)
      if (!valid) {
        // todo 提示信息
        console.log(`${node.data.name}与${data.data.name}非法相交`)
        graph.resetCells(Object.values(this._cloneCells))
      }
      // 重置
      this._cloneCells = null
    })
  }
  /**
   * @Author: wyb
   * @Descripttion: 设置节点移动事件
   * @param {*} graph
   */
  setNodeMove(graph) {
    // 移动完毕事件
    graph.on('node:moved', e => {
      // 移除dom调整框
      const transformDom = document.querySelector('.x6-widget-transform')
      transformDom && transformDom.parentNode.removeChild(transformDom)
    })
  }
}
/**
 * @Author: wyb
 * @Descripttion: 是否是有效的移动
 * @param {*}
 */
function validateMove(graph, node) {
  const intersectNodes = graph.getNodesUnderNode(node)
  const target = (intersectNodes || {}).find(
    v => v?.data?._dep === node?.data?._dep
  )
  if (target) return { valid: false, data: target }
  return { valid: true }
}
/**
 * @Author: wyb
 * @Descripttion: 判断两个节点是否是合法相交
 * @param {*} node1
 * @param {*} node2
 */
function isValidIntersect(node1, node2) {
  const {
    data: { _dep: dep1 }
  } = node1
  const {
    data: { _dep: dep2 }
  } = node2
  if (dep1 === dep2) return false
  return true
}
