const canvas = document.createElement('canvas')

function getStringWidth(str, fontSize = 12) {
  return canvas.getContext('2d').measureText(str).width * (fontSize / 10)
}

class X6FrameUtil {
  constructor() {}

  dealData(data) {
    const innerData = []
    const outerData = []
  }
}
