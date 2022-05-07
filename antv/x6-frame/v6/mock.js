/*
 * @Description:
 * @Author: wyb
 * @LastEditors: wyb
 * @LastEditTime: 2022-04-26 14:02:33
 */
const mockData = [
  {
    id: '0',
    type: 'element',
    name: '容器',
    children: [
      {
        id: '1',
        type: 'element',
        name: '子1'
      },
      {
        id: '2',
        type: 'element',
        name: '子2',
        children: [
          {
            id: '2-1',
            type: 'element',
            name: '子2-1',
            children: [
              {
                id: '2-1-1',
                type: 'element',
                name: '子2-1-1'
              },
              {
                id: '2-1-2',
                type: 'element',
                name: '子2-1-2'
              }
            ]
          }
        ]
      },
      {
        id: '3',
        type: 'element',
        name: '子3'
      },
      {
        id: '4',
        type: 'element',
        name: '子4'
      },
      {
        id: '5',
        type: 'element',
        name: '子5'
      }
      // {
      //   id: '6',
      //   type: 'element',
      //   name: '子6'
      // },
      // {
      //   id: '7',
      //   type: 'element',
      //   name: '子7'
      // }
    ]
  },
  {
    id: 'j1',
    type: 'inter',
    name: '接口1'
  },
  {
    id: 'j2',
    type: 'inter',
    name: '接口2'
  },
  {
    id: 'j3',
    type: 'inter',
    name: '接口3'
  },
  {
    id: 'j4',
    type: 'inter',
    name: '接口4'
  },
  {
    id: 'j5',
    type: 'inter',
    name: '接口5'
  }
]

const mockData1 = {
  nodeList: [
    {
      id: '0',
      type: 'element',
      name: '容器',
      children: [
        {
          id: '1',
          type: 'element',
          name: '子1',
          children: [],
          x6Data: {
            x: 120,
            y: 245,
            width: 56.81199340820312,
            height: 40,
            _dep: 1,
            fontSize: 12
          }
        },
        {
          id: '2',
          type: 'element',
          name: '子2',
          children: [
            {
              id: '2-1',
              type: 'element',
              name: '子2-1',
              children: [
                {
                  id: '2-1-1',
                  type: 'element',
                  name: '子2-1-1',
                  children: [],
                  x6Data: {
                    x: 144,
                    y: 379,
                    width: 83.34395751953124,
                    height: 40,
                    _dep: 3,
                    fontSize: 12
                  }
                },
                {
                  id: '2-1-2',
                  type: 'element',
                  name: '子2-1-2',
                  children: [],
                  x6Data: {
                    x: 144,
                    y: 439,
                    width: 85.73196411132812,
                    height: 40,
                    _dep: 3,
                    fontSize: 12
                  }
                }
              ],
              x6Data: {
                x: 132,
                y: 367,
                width: 109.73196411132812,
                height: 124,
                _dep: 2,
                fontSize: 16
              }
            }
          ],
          x6Data: {
            x: 120,
            y: 330,
            width: 133.73196411132812,
            height: 173,
            _dep: 1,
            fontSize: 16
          }
        },
        {
          id: '3',
          type: 'element',
          name: '子3',
          children: [],
          x6Data: {
            x: 196.81199340820314,
            y: 245,
            width: 59.2,
            height: 40,
            _dep: 1,
            fontSize: 12
          }
        },
        {
          id: '4',
          type: 'element',
          name: '子4',
          children: [],
          x6Data: {
            x: 276.0119934082031,
            y: 245,
            width: 59.2,
            height: 40,
            _dep: 1,
            fontSize: 12
          }
        },
        {
          id: '5',
          type: 'element',
          name: '子5',
          children: [],
          x6Data: {
            x: 355.2119934082031,
            y: 245,
            width: 59.2,
            height: 40,
            _dep: 1,
            fontSize: 12
          }
        }
      ],
      x6Data: {
        x: 108,
        y: 233,
        width: 318.4119934082031,
        height: 282,
        _dep: 0,
        fontSize: 16
      }
    },
    {
      id: 'j1',
      type: 'inter',
      name: '接口1',
      children: [],
      x6Data: {
        x: 175,
        y: 83,
        width: 68.81199340820312,
        height: 40,
        _dep: 0,
        fontSize: 12
      }
    },
    {
      id: 'j2',
      type: 'inter',
      name: '接口2',
      children: [],
      x6Data: { x: 313, y: 84, width: 71.2, height: 40, _dep: 0, fontSize: 12 }
    },
    {
      id: 'j3',
      type: 'inter',
      name: '接口3',
      children: [],
      x6Data: { x: 277, y: 571, width: 71.2, height: 40, _dep: 0, fontSize: 12 }
    },
    {
      id: 'j4',
      type: 'inter',
      name: '接口4',
      children: [],
      x6Data: { x: 518, y: 85, width: 71.2, height: 40, _dep: 0, fontSize: 12 }
    },
    {
      id: 'j5',
      type: 'inter',
      name: '接口5',
      children: [],
      x6Data: { x: 519, y: 332, width: 71.2, height: 40, _dep: 0, fontSize: 12 }
    }
  ],
  egdeList: [
    {
      source: { cell: 'j4', port: 'bottom1' },
      target: { cell: '0', port: 'top1' },
      lineType: '1'
    },
    {
      source: { cell: 'j5', port: 'bottom1' },
      target: { cell: '0', port: 'right1' },
      lineType: '1'
    },
    {
      source: { cell: 'j5', port: 'bottom2' },
      target: { cell: '0', port: 'right2' },
      lineType: '1'
    },
    {
      source: { cell: 'j5', port: 'right2' },
      target: { cell: '2', port: 'right2' },
      lineType: '1'
    },
    {
      source: { cell: 'j1', port: 'bottom1' },
      target: { cell: '2-1-1', port: 'left2' },
      lineType: '1'
    },
    {
      source: { cell: 'j2', port: 'bottom2' },
      target: { cell: '2', port: 'right1' },
      lineType: '1'
    },
    {
      source: { cell: 'j3', port: 'left1' },
      target: { cell: '2-1-2', port: 'bottom1' },
      lineType: '1'
    }
  ]
}
