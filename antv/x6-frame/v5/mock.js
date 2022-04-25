/*
 * @Description:
 * @Author: wyb
 * @LastEditors: wyb
 * @LastEditTime: 2022-04-25 16:42:47
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
  },
]
