/*
 * @Description:
 * @Author: wyb
 * @LastEditors: wyb
 * @LastEditTime: 2022-04-25 17:49:01
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
      data: {
        id: '0',
        type: 'element',
        name: '容器',
        children: [
          { id: '1', type: 'element', name: '子1' },
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
                  { id: '2-1-1', type: 'element', name: '子2-1-1' },
                  { id: '2-1-2', type: 'element', name: '子2-1-2' }
                ]
              }
            ]
          },
          { id: '3', type: 'element', name: '子3' },
          { id: '4', type: 'element', name: '子4' },
          { id: '5', type: 'element', name: '子5' }
        ],
        _dep: 0,
        fontSize: 16
      },
      children: [
        {
          data: {
            id: '1',
            type: 'element',
            name: '子1',
            _dep: 1,
            fontSize: 12
          },
          children: [],
          x6Data: { x: 124, y: 209, width: 56.81199340820312, height: 40 }
        },
        {
          data: {
            id: '2',
            type: 'element',
            name: '子2',
            children: [
              {
                id: '2-1',
                type: 'element',
                name: '子2-1',
                children: [
                  { id: '2-1-1', type: 'element', name: '子2-1-1' },
                  { id: '2-1-2', type: 'element', name: '子2-1-2' }
                ]
              }
            ],
            _dep: 1,
            fontSize: 16
          },
          children: [
            {
              data: {
                id: '2-1',
                type: 'element',
                name: '子2-1',
                children: [
                  { id: '2-1-1', type: 'element', name: '子2-1-1' },
                  { id: '2-1-2', type: 'element', name: '子2-1-2' }
                ],
                _dep: 2,
                fontSize: 16
              },
              children: [
                {
                  data: {
                    id: '2-1-1',
                    type: 'element',
                    name: '子2-1-1',
                    _dep: 3,
                    fontSize: 12
                  },
                  children: [],
                  x6Data: {
                    x: 148,
                    y: 343,
                    width: 83.34395751953124,
                    height: 40
                  }
                },
                {
                  data: {
                    id: '2-1-2',
                    type: 'element',
                    name: '子2-1-2',
                    _dep: 3,
                    fontSize: 12
                  },
                  children: [],
                  x6Data: {
                    x: 148,
                    y: 403,
                    width: 85.73196411132812,
                    height: 40
                  }
                }
              ],
              x6Data: { x: 136, y: 331, width: 109.73196411132812, height: 124 }
            }
          ],
          x6Data: { x: 124, y: 294, width: 133.73196411132812, height: 173 }
        },
        {
          data: {
            id: '3',
            type: 'element',
            name: '子3',
            _dep: 1,
            fontSize: 12
          },
          children: [],
          x6Data: { x: 200.81199340820314, y: 209, width: 59.2, height: 40 }
        },
        {
          data: {
            id: '4',
            type: 'element',
            name: '子4',
            _dep: 1,
            fontSize: 12
          },
          children: [],
          x6Data: { x: 280.0119934082031, y: 209, width: 59.2, height: 40 }
        },
        {
          data: {
            id: '5',
            type: 'element',
            name: '子5',
            _dep: 1,
            fontSize: 12
          },
          children: [],
          x6Data: { x: 359.2119934082031, y: 209, width: 59.2, height: 40 }
        }
      ],
      x6Data: { x: 112, y: 197, width: 318.4119934082031, height: 282 }
    },
    {
      data: { id: 'j1', type: 'inter', name: '接口1', _dep: 0, fontSize: 12 },
      children: [],
      x6Data: { x: 112, y: 112, width: 68.81199340820312, height: 40 }
    },
    {
      data: { id: 'j2', type: 'inter', name: '接口2', _dep: 0, fontSize: 12 },
      children: [],
      x6Data: { x: 200.81199340820314, y: 112, width: 71.2, height: 40 }
    },
    {
      data: { id: 'j3', type: 'inter', name: '接口3', _dep: 0, fontSize: 12 },
      children: [],
      x6Data: { x: 292.0119934082031, y: 112, width: 71.2, height: 40 }
    },
    {
      data: { id: 'j4', type: 'inter', name: '接口4', _dep: 0, fontSize: 12 },
      children: [],
      x6Data: { x: 383.2119934082031, y: 112, width: 71.2, height: 40 }
    },
    {
      data: { id: 'j5', type: 'inter', name: '接口5', _dep: 0, fontSize: 12 },
      children: [],
      x6Data: { x: 474.4119934082031, y: 112, width: 71.2, height: 40 }
    }
  ],
  egdeList: [
    {
      source: { cell: '0', port: 'right1' },
      target: { cell: 'j5', port: 'bottom1' },
      lineType: '1'
    },
    {
      source: { cell: '0', port: 'right2' },
      target: { cell: 'j5', port: 'bottom2' },
      lineType: '1'
    }
  ]
}
