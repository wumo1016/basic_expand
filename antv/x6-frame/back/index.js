/* ----------------------------------------- 父级宽度自适应 ------------------------------------- */

;(function () {
  const embedPadding = 20
  graph.on('node:change:size', ({ node, options }) => {
    if (options.skipParentHandler) {
      return
    }
    const children = node.getChildren()
    if (children && children.length) {
      node.prop('originSize', node.getSize())
    }
  })

  graph.on('node:change:position', ({ node, options }) => {
    if (options.skipParentHandler) {
      return
    }

    const children = node.getChildren()
    if (children && children.length) {
      node.prop('originPosition', node.getPosition())
    }

    const parent = node.getParent()
    if (parent && parent.isNode()) {
      let originSize = parent.prop('originSize')
      if (originSize == null) {
        originSize = parent.getSize()
        parent.prop('originSize', originSize)
      }

      let originPosition = parent.prop('originPosition')
      if (originPosition == null) {
        originPosition = parent.getPosition()
        parent.prop('originPosition', originPosition)
      }

      let x = originPosition.x
      let y = originPosition.y
      let cornerX = originPosition.x + originSize.width
      let cornerY = originPosition.y + originSize.height
      let hasChange = false

      const children = parent.getChildren()
      if (children) {
        children.forEach(child => {
          const bbox = child.getBBox().inflate(embedPadding)
          const corner = bbox.getCorner()

          if (bbox.x < x) {
            x = bbox.x
            hasChange = true
          }

          if (bbox.y < y) {
            y = bbox.y
            hasChange = true
          }

          if (corner.x > cornerX) {
            cornerX = corner.x
            hasChange = true
          }

          if (corner.y > cornerY) {
            cornerY = corner.y
            hasChange = true
          }
        })
      }

      if (hasChange) {
        parent.prop(
          {
            position: { x, y },
            size: { width: cornerX - x, height: cornerY - y }
          },
          { skipParentHandler: true }
        )
      }
    }
  })
})

/* ----------------------------------------- 节点位置改变事件 ------------------------------------- */

;(function () {
  nodeChangePotison(graph) {
    graph.on('node:change:position', e => {
      console.log(e)
    })
  }
})

/* ----------------------------------------- 节点鼠标事件 ------------------------------------- */

;(function () {
  nodeMouseEvent(graph) {
    graph.on('node:mousedown', e => {
      const {
        store: {
          data: { position }
        }
      } = e.node
      this.sourceNodePosition = {
        x: position.x,
        y: position.y
      }
    })
  
    graph.on('node:mouseup', e => {
      const {
        store: {
          data: { position: position }
        }
      } = e.node
      if (
        this.sourceNodePosition.x === position.x &&
        this.sourceNodePosition.y === position.y
      )
        return
      console.log(e)
    })
  }
})

/* ----------------------------------------- 获取相交节点 ------------------------------------- */

;(function () {
  graph.getNodesUnderNode()
})


;(function () {
  graph.getNodesUnderNode()
})