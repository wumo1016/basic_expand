const mockData1 = {
  name: '管道脱落',
  fontColor: '',
  lineColor: '',
  link: '',
  children: [
    {
      name: '病人',
      fontColor: '',
      lineColor: '',
      link: '',
      children: [
        {
          children: [
            {
              children: [],
              name: '睡眠中迷糊',
              fontColor: '',
              lineColor: '',
              link: ''
            },
            {
              children: [],
              name: '意识不清',
              fontColor: '',
              lineColor: '',
              link: ''
            },
            {
              children: [],
              name: '精神异常',
              fontColor: '',
              lineColor: '',
              link: ''
            }
          ],
          name: '精神因素',
          fontColor: '',
          lineColor: '',
          link: 'http://www.baidu.com'
        },
        {
          children: [
            {
              children: [],
              name: '舒适度改变',
              fontColor: '',
              lineColor: '',
              link: ''
            },
            {
              children: [],
              name: '其它',
              fontColor: '',
              lineColor: '',
              link: ''
            }
          ],
          name: '依从性差',
          fontColor: '',
          lineColor: '',
          link: ''
        },
        {
          children: [
            {
              children: [],
              name: '自身理解',
              fontColor: '',
              lineColor: '',
              link: ''
            },
            {
              children: [],
              name: '护士指导',
              fontColor: '',
              lineColor: '',
              link: ''
            }
          ],
          name: '知识缺乏',
          fontColor: '',
          lineColor: '',
          link: ''
        }
      ]
    },
    {
      name: '医生护士',
      fontColor: '',
      lineColor: '',
      link: '',
      children: [
        {
          children: [
            {
              children: [],
              name: '缺乏安全意识',
              fontColor: '',
              lineColor: '',
              link: ''
            },
            {
              children: [],
              name: '自身知识不足',
              fontColor: '',
              lineColor: '',
              link: ''
            }
          ],
          name: '安全告知不到位',
          fontColor: '',
          lineColor: '',
          link: ''
        },
        {
          name: '未及时发现安全隐患',
          fontColor: '',
          lineColor: '',
          link: '',
          children: [
            {
              children: [],
              name: '工作责任心不强',
              fontColor: '',
              lineColor: '',
              link: ''
            },
            {
              children: [],
              name: '分级护理落实差',
              fontColor: '',
              lineColor: '',
              link: ''
            }
          ]
        },
        {
          children: [
            {
              children: [],
              name: '医生固定',
              fontColor: '',
              lineColor: '',
              link: ''
            }
          ],
          name: '违反管道护理常规',
          fontColor: '',
          lineColor: '',
          link: ''
        },
        {
          children: [
            {
              children: [],
              name: '分级护理交接班制度执行差',
              fontColor: '',
              lineColor: '',
              link: ''
            },
            {
              children: [],
              name: '医护沟通不足',
              fontColor: '',
              lineColor: '',
              link: ''
            },
            {
              children: [],
              name: '特殊病人、重点环节风险评估不足',
              fontColor: '',
              lineColor: '',
              link: ''
            }
          ],
          name: '约束措施、无力、不当',
          fontColor: '',
          lineColor: '',
          link: ''
        }
      ]
    },
    {
      name: '家属',
      fontColor: '',
      lineColor: '',
      link: '',
      children: [
        {
          children: [],
          name: '粗心大意',
          fontColor: '',
          lineColor: '',
          link: ''
        },
        {
          children: [
            {
              children: [],
              name: '对保护性约束',
              fontColor: '',
              lineColor: '',
              link: ''
            },
            {
              children: [],
              name: '对自行拔管可能带来的危害不清',
              fontColor: '',
              lineColor: '',
              link: ''
            }
          ],
          name: '家属随意终止约束',
          fontColor: '',
          lineColor: '',
          link: ''
        }
      ]
    },
    {
      name: '管理',
      fontColor: '',
      lineColor: '',
      link: '',
      children: [
        {
          children: [
            {
              children: [],
              name: '未沟通',
              fontColor: '',
              lineColor: '',
              link: ''
            }
          ],
          name: '质量问题',
          fontColor: '',
          lineColor: '',
          link: ''
        },
        {
          children: [],
          name: '培训不足',
          fontColor: '',
          lineColor: '',
          link: ''
        },
        {
          children: [
            {
              children: [],
              name: '护士长',
              fontColor: '',
              lineColor: '',
              link: ''
            }
          ],
          name: '监管不足',
          fontColor: '',
          lineColor: '',
          link: ''
        },
        {
          children: [],
          name: '护士人力不足',
          fontColor: '',
          lineColor: '',
          link: ''
        }
      ]
    }
  ]
}

const mockData2 = {
  name: '管道脱落',
  fontColor: '',
  lineColor: '',
  link: '',
  children: [
    {
      name: '病人',
      fontColor: '',
      lineColor: '',
      link: '',
      children: [
        {
          name: '精神因素',
          fontColor: '',
          lineColor: '',
          link: 'http://www.baidu.com'
        },
        {
          name: '依从性差',
          fontColor: '',
          lineColor: '',
          link: ''
        },
        {
          name: '知识缺乏',
          fontColor: '',
          lineColor: '',
          link: ''
        }
      ]
    },
    {
      name: '医生护士',
      fontColor: '',
      lineColor: '',
      link: '',
      children: [
        {
          name: '安全告知不到位',
          fontColor: '',
          lineColor: '',
          link: ''
        },
        {
          name: '未及时发现安全隐患',
          fontColor: '',
          lineColor: '',
          link: ''
        },
        {
          name: '违反管道护理常规',
          fontColor: '',
          lineColor: '',
          link: ''
        },
        {
          name: '约束措施、无力、不当',
          fontColor: '',
          lineColor: '',
          link: ''
        }
      ]
    },
    {
      name: '家属',
      fontColor: '',
      lineColor: '',
      link: '',
      children: [
        {
          children: [],
          name: '粗心大意',
          fontColor: '',
          lineColor: '',
          link: ''
        },
        {
          name: '家属随意终止约束',
          fontColor: '',
          lineColor: '',
          link: ''
        }
      ]
    },
    {
      name: '管理',
      fontColor: '',
      lineColor: '',
      link: '',
      children: [
        {
          name: '质量问题',
          fontColor: '',
          lineColor: '',
          link: ''
        },
        {
          children: [],
          name: '培训不足',
          fontColor: '',
          lineColor: '',
          link: ''
        },
        {
          name: '监管不足',
          fontColor: '',
          lineColor: '',
          link: ''
        },
        {
          children: [],
          name: '护士人力不足',
          fontColor: '',
          lineColor: '',
          link: ''
        }
      ]
    }
  ]
}

const mockData = {
  name: '管道脱落',
  fontColor: '',
  lineColor: '',
  link: '',
  children: [
    {
      name: '病人',
      fontColor: '',
      lineColor: '',
      link: ''
    },
    {
      name: '医生护士',
      fontColor: '',
      lineColor: '',
      link: ''
    },
    {
      name: '家属',
      fontColor: '',
      lineColor: '',
      link: ''
    },
    {
      name: '管理',
      fontColor: '',
      lineColor: '',
      link: ''
    }
  ]
}