const { Shape, NumberExt, Path } = X6

X6.Shape.Path.define({
  shape: 'test1',
  overwrite: true,
  width: 60,
  height: 60,
  label: 'database',
  markup: [
    {
      tagName: 'rect',
      selector: 'bg'
    },
    {
      tagName: 'path',
      groupSelector: 'body',
      selector: 'bin'
    },
    {
      tagName: 'path',
      groupSelector: 'body',
      selector: 'top'
    },
    {
      tagName: 'text',
      selector: 'label'
    }
  ],
  attrs: {
    body: {
      stroke: '#000',
      strokeWidth: 1
    },
    bin: {
      fill: '#fff',
      binPath: ''
    },
    top: {
      fill: 'none',
      topPath: ''
    }
  },
  attrHooks: {
    binPath: {
      set(v, { refBBox }) {
        const { width, height } = refBBox
        const rx = +(width / 2).toFixed(2)
        const ry = +(height / 6).toFixed(2)
        return {
          d: new Path()
            .moveTo(0, height - ry)
            .lineTo(0, ry)
            .arcTo(rx, ry, 0, 0, 1, width, ry)
            .lineTo(width, height - ry)
            .arcTo(rx, ry, 0, 0, 1, 0, height - ry)
            .serialize()
        }
      }
    },
    topPath: {
      set(v, { refBBox }) {
        const { width, height } = refBBox
        const rx = +(width / 2).toFixed(2)
        const ry = +(height / 6).toFixed(2)
        return {
          d: new Path()
            .moveTo(0, ry)
            .arcTo(rx, ry, 0, 0, 0, width, ry)
            .serialize()
        }
      }
    }
  }
})
