/*
 * @Description:
 * @Author: wyb
 * @LastEditors: wyb
 * @LastEditTime: 2022-04-20 17:35:03
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
  }
]
