/*
 * @Description:
 * @Author: wyb
 * @LastEditors: wyb
 * @LastEditTime: 2022-04-26 11:47:09
 */
const canvas = document.createElement('canvas')

const _nodePadding = [10, 20] // 上下 左右
const _nodeHeight = 20 // 文本节点高
const _nodeHSpace = 20 // 节点水平间距
const _nodeVSpace = 20 // 节点垂直间距

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
  items: ['top', 'right', 'bottom', 'left']
    .map(item => [
      { group: item, id: `${item}1` },
      { group: item, id: `${item}2` }
    ])
    .flat()
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
        const children = node.filterChild(cell => cell.isNode())
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
        const children = node.filterChild(cell => cell.isNode())
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
    this.dealNodeSize(data)
    return data
  }

  dealNodeSize(data) {
    const loop = (list, dep = 0) => {
      list.forEach(item => {
        item.rawData = JSON.parse(JSON.stringify(item))
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
    loop(data)
  }

  dealLayout(graph, root) {
    const loop = (list, parent, parentNode) => {
      list.forEach(item => {
        if (parent) {
          item.x = parent.x + item.x
          item.y = parent.y + item.y
        }
        let node = graph.createNode({
          id: item.id,
          label: item.name,
          x: item.x,
          y: item.y,
          width: item.width,
          height: item.height,
          zIndex: item._dep,
          attrs: {
            label: item.children?.length
              ? {
                  refX: 0,
                  refX2: 5,
                  refY: -_nodeHeight - 5,
                  refY2: 5,
                  textAnchor: 'start',
                  textVerticalAnchor: 'top',
                  fontSize: 16
                }
              : {
                  fontSize: 12
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
        if (parentNode) {
          parentNode.addChild(node)
        } else {
          graph.addNode(node)
        }
        if (item.children?.length) {
          loop(item.children, item, node)
        }
      })
    }

    loop(root.children, { x: 100, y: 100 }, null)
  }

  initLayout(graph, data) {
    this.initNodeLayout(graph, data.nodeList || [])
    this.initEdgeLayout(graph, data.egdeList || [])
  }

  initNodeLayout(graph, nodeList) {
    const loop = (list, parentNode) => {
      list.forEach(item => {
        item = {
          ...item,
          ...item.x6Data,
          name: item.data.name,
          id: item.data.id
        }
        let node = graph.createNode({
          id: item.id,
          label: item.name,
          x: item.x,
          y: item.y,
          width: item.width,
          height: item.height,
          zIndex: item._dep,
          attrs: {
            label: item.children?.length
              ? {
                  refX: 0,
                  refX2: 5,
                  refY: -_nodeHeight - 5,
                  refY2: 5,
                  textAnchor: 'start',
                  textVerticalAnchor: 'top',
                  fontSize: 16
                }
              : {
                  fontSize: 12
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
        if (parentNode) {
          parentNode.addChild(node)
        } else {
          graph.addNode(node)
        }
        if (item.children?.length) {
          loop(item.children, node)
        }
      })
    }

    loop(nodeList, null)
  }

  initEdgeLayout(graph, egdeList) {
    for (const item of egdeList) {
      const edge = this.createEdge(graph, item)
      graph.addEdge(edge)
    }
  }
  /**
   * @Author: wyb
   * @Descripttion: 创建边
   * @param {*} graph
   * @param {*} options
   */
  createEdge(graph, options) {
    const edge = graph.createEdge({
      data: options.data || {},
      source: options.source,
      target: options.target,
      // 线路由规则
      // router: 'metro',
      router: {
        name: 'manhattan',
        args: {
          step: 20
        }
      },
      // 线连接器规则
      connector: 'normal',
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
        },
        zIndex: 1
      },
      data: {}
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
    this.setNodeContextmenu(graph)

    this.setEdgeMouseEnterLeave(graph)
    this.setEdgeConnected(graph)

    this.setBlankContextmenu(graph)
    this.setBlankMouseDown(graph)
  }
  /**
   * @Author: wyb
   * @Descripttion: 设置节点鼠标进入事件
   * @param {*} graph
   */
  setNodeMouseEnterLeave(graph) {
    graph.on('cell:mouseenter', e => {
      const { node, cell } = e
      setPortsVisible(cell, 'visible')
    })
    graph.on('node:mouseleave', e => {
      const { node, cell } = e
      setPortsVisible(cell, 'hidden')
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
      const { source, target } = edge
      // 移除自动生成的边
      graph.removeEdge(edge)
      // 验证重复边
      const sourceEdges = graph
        .getConnectedEdges(graph.getCell(source.cell))
        .filter(
          v =>
            [v.source.port, v.target.port].includes(source.port) &&
            [v.source.cell, v.target.cell].includes(target.cell)
        )
      const existTargetPorts = sourceEdges
        .map(v => [v.source.port, v.target.port])
        .flat()
      if (existTargetPorts.includes(target.port)) {
        // console.log('连线已存在，不可重复添加')
        alert('连线已存在，不可重复添加')
        return
      }
      const edges = this.createEdge(graph, {
        source,
        target
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
      this.hiddenContextmenu()
      // 隐藏锚点 fix无效移动后不触发 node:mouseleave 事件
      setPortsVisible(e.cell, 'hidden')
      // 缓存状态
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
        // console.log(`${node.data.name}与${data.data.name}非法相交`)
        alert(`${node.data.name}与${data.data.name}非法相交`)
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
        // console.log(`${node.data.name}与${data.data.name}非法相交`)
        alert(`${node.data.name}与${data.data.name}非法相交`)
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
    // 移动完毕
    graph.on('node:moved', e => {
      // 移除dom调整框
      const transformDom = document.querySelector('.x6-widget-transform')
      transformDom && transformDom.parentNode.removeChild(transformDom)
    })
  }
  /**
   * @Author: wyb
   * @Descripttion:
   * @param {*} graph
   */
  setNodeContextmenu(graph) {
    graph.on('node:contextmenu', e => {
      // todo 如果点击的时接口 则阻止默认事件
      this.showContextmenu(e, graph, [
        {
          type: 'add',
          text: '添加子级'
        },
        {
          type: 'edit',
          text: '编辑'
        },
        {
          type: 'delete',
          text: '删除'
        }
      ])
    })
  }
  /**
   * @Author: wyb
   * @Descripttion:
   * @param {*} graph
   */
  setBlankContextmenu(graph) {
    graph.on('blank:contextmenu', e => {
      this.showContextmenu(e, graph, [
        {
          type: 'add',
          text: '新增接口'
        }
      ])
    })
  }
  /**
   * @Author: wyb
   * @Descripttion:
   * @param {*}
   */
  showContextmenu(e, graph, menuList = []) {
    const dom = document.querySelector('#container-contextmenu')
    dom.innerHTML = ''
    const frag = document.createDocumentFragment()
    menuList.map(menu => {
      const div = document.createElement('div')
      div.textContent = menu.text
      div.addEventListener('click', () => {
        this.handleContextmenu({ type: menu.type, data: e.node?.data || {} })
      })
      frag.appendChild(div)
    })
    // 转换坐标
    const pos = graph.localToGraph(e.x, e.y)
    dom.appendChild(frag)
    dom.style = `left: ${pos.x}px;top: ${pos.y}px;display:block;`
  }
  /**
   * @Author: wyb
   * @Descripttion:
   * @param {*} graph
   */
  setBlankMouseDown(graph) {
    graph.on('blank:mousedown', e => {
      this.hiddenContextmenu()
    })
  }
  /**
   * @Author: wyb
   * @Descripttion:
   * @param {*}
   */
  hiddenContextmenu() {
    const dom = document.querySelector('#container-contextmenu')
    dom.style = `display:none;`
    dom.innerHTML = ''
  }
  /**
   * @Author: wyb
   * @Descripttion:
   * @param {*} type
   * @param {*} data
   */
  handleContextmenu({ type, data }) {
    console.log(type)
    console.log(data)
    this.hiddenContextmenu()
  }
  /**
   * @Author: wyb
   * @Descripttion:
   * @param {*} graph
   */
  getGraphJSON(graph) {
    const cellList = graph.toJSON().cells
    const cellMap = {}
    const [nodeList, egdeList] = [[], []]
    cellList.map(cell => {
      if (cell.shape === 'edge') {
        egdeList.push({
          source: cell.source,
          target: cell.target,
          lineType: '1'
        })
      } else {
        cellMap[cell.id] = cell
        if (!cell.parent) {
          nodeList.push(cell)
        }
      }
    })
    const loop = list => {
      list = list.map(item => {
        if (item.children?.length) {
          item.children = item.children.map(id => cellMap[id])
          item.children = loop(item.children)
        }
        item.data.children = undefined
        return {
          data: {
            ...item.data.rawData,
            fontSize: item.data.fontSize
          },
          children: item.children || [],
          x6Data: {
            ...item.position,
            ...item.size,
            _dep: item.data._dep
          }
        }
      })
      return list
    }

    return {
      nodeList: loop(nodeList),
      egdeList
    }
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

/**
 * @Author: wyb
 * @Descripttion:
 * @param {*}
 */
function setPortsVisible(cell, value) {
  if (cell.isNode()) {
    const ports = cell.getPorts()
    ports.map(port => {
      cell.portProp(port.id, 'attrs/circle/style/visibility', value)
    })
  }
}
