// console.log(mockData)

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
  }
})

const finalData = dealData(mockData)

// graph.data() // { nodes: [], edges: [] }
// graph.render()

function dealData(){

}

// https://blog.csdn.net/xiaoxiangzi520/article/details/103926013