const LogicalOperatorEnum = {
  AND: 1,
  OR: 2,
  NOT: 3
}

const FilterOperatorEnum = {
  /* 等于 */
  Equal: 0x01,
  /* 不等于 */
  NotEqual: 0x02,
  /* 为空 */
  Null: 0x03,
  /* 不为空 */
  NotNull: 0x04,
  /* 模糊匹配 */
  Like: 0x05,
  /* 模糊不匹配 */
  NotLike: 0x06,
  /* 包含 */
  In: 0x07,
  /* 不包含 */
  NotIn: 0x08,
  /* 大于 */
  Greater: 0x09,
  /* 大于等于 */
  GreaterEqual: 0x0a,
  /* 小于 */
  Less: 0x0b,
  /* 小于等于 */
  LessEqual: 0x0c,
  /* 介于 */
  Between: 0x0d,
  /* 不介于 */
  NotBetween: 0x0e,
  /* 包括 */
  Include: 0x17,
  /* 不包括 */
  NotInclude: 0x18,
  /* 之前N天内 */
  DateTimeRecentDay: 0xff07f4,
  /* 之前N周内 */
  DateTimeRecentWeek: 0xff07f5,
  /* 之前N月内 */
  DateTimeRecentMonth: 0xff07f6,
  /* 之前N年内 */
  DateTimeRecentYear: 0xff07f8,
  /* 之后N天内 */
  DateTimeComingDay: 0xff07e4,
  /* 之后N周内 */
  DateTimeComingWeek: 0xff07e5,
  /* 之后N月内 */
  DateTimeComingMonth: 0xff07e6,
  /* 之后N年内 */
  DateTimeComingYear: 0xff07e8,
  /* 当前这一周//本周 */
  DateTimeThisWeek: 0xff0705,
  /* 当前这一月//本月 */
  DateTimeThisMonth: 0xff0706,
  /* 当前这一季//本季 */
  DateTimeThisSeason: 0xff0707,
  /* 当前这一年//今年 */
  DateTimeThisYear: 0xff0708,
  /* 以*开头 */
  StartWith: 0x25,
  /* 不以*开头 */
  NotStartWith: 0x26,
  /* 以*结尾 */
  EndWith: 0x15,
  /* 不以*结尾 */
  NotEndWith: 0x16,
  /* 类似全部 */
  LikeAll: 0x35,
  /* 不类似全部 */
  NotLikeAll: 0x36,
  /* 类似任意 */
  LikeAny: 0x45,
  /* 不类似任意 */
  NotLikeAny: 0x36,
  /*多选不包含 */
  MultiIn: 0x37,
  /*不类似任意 */
  NotMultiIn: 0x38,
  /*多选包括 */
  MultiInclude: 0x47,
  /*多选不包括 */
  NotMultiInclude: 0x48,
  /* -------------------- 以下权限只有关联有 -------------------- */
  EqualVar: 0x0101, // 等于{属性}
  /// !: @value
  NotEqualVar: 0x0102, // 不等于{属性}
  /// LIKE @%value%
  LikeVar: 0x0105,
  /// NOT LIKE @%value%
  NotLikeVar: 0x0106,
  /// > @value
  GreaterVar: 0x0109,
  /// >: @value
  GreaterEqualVar: 0x010a,
  /// &lt; @value
  LessVar: 0x010b,
  /// &lt;: @value
  LessEqualVar: 0x010c,
  /* -------------------- 以下权限只在规则权限中有 -------------------- */
  // UserEqualUserFunc : 0x010101, // {人员} 等于 {人员}
  // UserNotEqualUserFunc : 0x010102, // {人员} 不等于 {人员}
  UserInUserFunc: 0x010107, // {人员} 包含 {人员}
  UserNotInUserFunc: 0x010108, // {人员} 不包含 {人员}
  UserInOrgUserFunc: 0x010207, // {人员} 同级组织 {组织}
  UserNotInOrgUserFunc: 0x010208, // {人员} 非同级组织 {组织}
  UserInGreaterOrgUserFunc: 0x010209, //  {人员} 上级组织 {组织}
  UserInGreaterEqualOrgUserFunc: 0x01020a, //  {人员} 上级或同级组织 {组织}
  UserInLessOrgUserFunc: 0x01020b, //  {人员} 下级组织 {组织}
  UserInLessEqualOrgUserFunc: 0x01020c, //  {人员} 下级或同级组织 {组织}
  UserInUserOrgLeadUserFunc: 0x011607, // 是...同级负责人(人员)
  UserNotInUserOrgLeadUserFunc: 0x011608, // 不是...同级负责人(人员)
  UserInUserGreaterOrgLeadUserFunc: 0x011609, // 是...上级负责人(人员)
  UserInUserGreaterEqualOrgLeadUserFunc: 0x01160a, // 是...上级或同级负责人(人员)
  UserInUserLessOrgLeadUserFunc: 0x01160b, // 是...下级负责人(人员)
  UserInUserLessEqualOrgLeadUserFunc: 0x01160c, // 是...下级或同级负责人(人员)
  UserInUserLeadOrgUserFunc: 0x011507, // 是...所负责部门同级(人员)
  UserNotInUserLeadOrgUserFunc: 0x011508, // 	不是...所负责部门上级(人员)
  UserInUserGreaterLeadOrgUserFunc: 0x011509, // 是...所负责部门上级(人员)
  UserInUserGreaterEqualLeadOrgUserFunc: 0x01150a, // 是...所负责部门上级或同级(人员)
  UserInUserLessLeadOrgUserFunc: 0x01150b, // 是...所负责部门下级(人员)
  UserInUserLessEqualLeadOrgUserFunc: 0x01150c, // 	是...所负责部门下级或同级(人员)
  UserInUserOrgUserFunc: 0x011207, //  {人员} 同部门 {人员}
  UserNotInUserOrgUserFunc: 0x011208, //  {人员} 非同部门 {人员}
  UserInUserGreaterOrgUserFunc: 0x011209, //  {人员} 领导  {人员}
  UserInUserGreaterEqualOrgUserFunc: 0x01120a, //  {人员}  领导或同级 {人员}
  UserInUserLessOrgUserFunc: 0x01120b, //  {人员} 下属 {人员}
  UserInUserLessEqualOrgUserFunc: 0x01120c, //  {人员} 下属或同级 {人员}
  UserInUserRoleUserFunc: 0x011307, // {人员} 同角色{人员}
  UserNotInUserRoleUserFunc: 0x011308, // {人员} 非同角色{人员}
  UserInRoleUserFunc: 0x010307, // {人员} 属于角色 {角色}
  UserNotInRoleUserFunc: 0x010308, // {人员} 不属于角色 {角色}
  UserInOrgLeadUserFunc: 0x010607, // 等于组织负责人，---当前登录人所在组织，自定义（选组织）
  UserNotInOrgLeadUserFunc: 0x010608, // 不等于组织负责人，---当前登录人所在组织，自定义（选组织）
  UserInGreaterOrgLeadUserFunc: 0x010609, // 是...上级负责人(组织)
  UserInGreaterEqualOrgLeadUserFunc: 0x01060a, // 是...上级或同级负责人(组织)
  UserInLessOrgLeadUserFunc: 0x01060b, // 是...下级负责人(组织)
  UserInLessEqualOrgLeadUserFunc: 0x01060c, // 	是...下级或同级负责人(组织)
  /* -------------------- 以下权限只在规则权限中有 -------------------- */
  /* [组织] 包含(组织) [组织] */
  OrgInOrgFunc: 0x020207,
  /* [组织] 不包含(组织) [组织] */
  OrgNotInOrgFunc: 0x020208,
  /* [组织] 包括(组织) [组织] */
  OrgIncludeOrgFunc: 0x020217,
  /* [组织] 不包括(组织) [组织] */
  OrgNotIncludeOrgFunc: 0x020218,
  /* [组织] 包含(人员) [人员] */
  OrgInUserOrgFunc: 0x021207,
  /* [组织] 不包含(人员) [人员] */
  OrgNotInUserOrgFunc: 0x021208,
  /* [组织] 包括(人员) [人员] */
  OrgIncludeUserOrgFunc: 0x021217,
  /* [组织] 不包括(人员) [人员] */
  OrgNotIncludeUserOrgFunc: 0x021218
}

const fieldConfigMap = new Map()

const fieldConfigList = [
  {
    Id: null,
    Title: '代号',
    DisplayTitle: '代号',
    Type: 'text',
    Name: 'PLM_ID',
    DefaultValue: '',
    value: null,
    DataLength: 100,
    DataType: 4,
    Precision: '',
    Proportion: '4',
    AllowNull: true,
    Order: 0,
    TextContent: '[]',
    PLM_ATTR_OID: '',
    IsExisting: true,
    ClientGroupOid: '3db9dd4a-ffbd-064a-9cab-941b8879f752',
    ExtendedProperty: 'true',
    SortNum: 0,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '0',
    DisableSearch: '1',
    Filterable: '1',
    VirtualClass: '0',
    SpecialType: '',
    Remark: '',
    PermStatus: 'R',
    IsStandardComponent: false
  },
  {
    Id: 'cc0ca036-0da2-ec40-8d87-ee933f282926',
    Title: '名称',
    DisplayTitle: '名称',
    Type: 'text',
    Name: 'NAME',
    DefaultValue: '名称默认值',
    value: null,
    DataLength: 200,
    DataType: 4,
    Precision: '',
    Proportion: '4',
    AllowNull: false,
    Order: 1,
    TextContent: '[]',
    PLM_ATTR_OID: 'cc0ca036-0da2-ec40-8d87-ee933f282926',
    IsExisting: true,
    ClientGroupOid: '3db9dd4a-ffbd-064a-9cab-941b8879f752',
    ExtendedProperty: null,
    SortNum: 2,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '父级组件说明（子类）',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '1e3d3a97-16e6-4a0c-a767-3e109b8c85ae',
    Title: '摘要信息',
    DisplayTitle: '摘要信息',
    Type: 'text',
    Name: 'PLMHZXDESC',
    DefaultValue: '摘要信息默认值',
    value: null,
    DataLength: 800,
    DataType: 4,
    Precision: '',
    Proportion: '4',
    AllowNull: true,
    Order: 2,
    TextContent: '[]',
    PLM_ATTR_OID: '1e3d3a97-16e6-4a0c-a767-3e109b8c85ae',
    IsExisting: true,
    ClientGroupOid: '3db9dd4a-ffbd-064a-9cab-941b8879f752',
    ExtendedProperty: null,
    SortNum: 3,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '1',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '1',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '84aa50f9-2f5d-4453-abf4-8ed597139116',
    Title: '文本框',
    DisplayTitle: '文本框',
    Type: 'text',
    Name: 'WBK',
    DefaultValue: '文本框默认值',
    value: null,
    DataLength: 200,
    DataType: 4,
    Precision: '',
    Proportion: '6',
    AllowNull: false,
    Order: 3,
    TextContent: '[]',
    PLM_ATTR_OID: '84aa50f9-2f5d-4453-abf4-8ed597139116',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 4,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '7907290f-f8f0-415c-a386-3dc0fbfaf402',
    Title: '整数框',
    DisplayTitle: '整数框',
    Type: 'integer',
    Name: 'ZSK',
    DefaultValue: '12',
    value: null,
    DataLength: 200,
    DataType: 1,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 4,
    TextContent: '[{"isPositive":true}]',
    PLM_ATTR_OID: '7907290f-f8f0-415c-a386-3dc0fbfaf402',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 5,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: 'f8f71648-46d2-4519-9525-06e2c9127900',
    Title: '小数框',
    DisplayTitle: '小数框',
    Type: 'decimals',
    Name: 'XSK',
    DefaultValue: '1.2',
    value: null,
    DataLength: 8,
    DataType: 6,
    Precision: '8',
    Proportion: '6',
    AllowNull: true,
    Order: 5,
    TextContent: '[{"decimalDigits":2}]',
    PLM_ATTR_OID: 'f8f71648-46d2-4519-9525-06e2c9127900',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 6,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '157d71d2-dcaf-429e-8968-3023473d6372',
    Title: '单选项',
    DisplayTitle: '单选项',
    Type: 'radio',
    Name: 'DXX',
    DefaultValue: '0',
    value: null,
    DataLength: 200,
    DataType: 4,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 6,
    TextContent:
      '[{"ResCls":"399ad7f6-92a7-fa94-0638-ced00b9c33fb","ResCode":"SYS_DMSOURCE","CustomizeMenus":[{"label":"客户","value":"0","code":"0"},{"label":"市场","value":"1","code":"1"},{"label":"产品","value":"2","code":"2"}],"ResStyle":"","ParentName":""}]',
    PLM_ATTR_OID: '157d71d2-dcaf-429e-8968-3023473d6372',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 7,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '04857479-b6e3-4378-8f4a-8757864e5cb8',
    Title: '多选框',
    DisplayTitle: '多选框',
    Type: 'checkbox',
    Name: 'DXK',
    DefaultValue: 'BusinessReport,CostBudget',
    value: null,
    DataLength: 200,
    DataType: 4,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 7,
    TextContent:
      '[{"ResCls":"cb7fca70-1e1b-aaaf-071f-5ded7892f963","ResCode":"SYS_WRPT_BUSINESSREPORTCATEGORY","CustomizeMenus":[{"label":"业务报表","value":"BusinessReport","code":"BusinessReport"},{"label":"成本预算统计","value":"CostBudget","code":"CostBudget"},{"label":"其他","value":"Other","code":"Other"},{"label":"项目统计","value":"ProjectReport","code":"ProjectReport"},{"label":"待办类","value":"Workbenches","code":"Workbenches"}],"ResStyle":"","ParentName":""}]',
    PLM_ATTR_OID: '04857479-b6e3-4378-8f4a-8757864e5cb8',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 8,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '25b324d4-3786-4b63-bd79-dc819d3cb1fd',
    Title: '是否框',
    DisplayTitle: '是否框',
    Type: 'whether',
    Name: 'SFK',
    DefaultValue: 'N',
    value: null,
    DataLength: 200,
    DataType: 4,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 8,
    TextContent: '[]',
    PLM_ATTR_OID: '25b324d4-3786-4b63-bd79-dc819d3cb1fd',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 9,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '927e081c-c439-4178-ae1a-571131b81cfa',
    Title: '下拉框(单选)',
    DisplayTitle: '下拉框',
    Type: 'dropdown',
    Name: 'XLK',
    DefaultValue: 'CostBudget',
    value: null,
    DataLength: 200,
    DataType: 4,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 9,
    TextContent:
      '[{"ResCls":"cb7fca70-1e1b-aaaf-071f-5ded7892f963","ResCode":"SYS_WRPT_BUSINESSREPORTCATEGORY","CustomizeMenus":[{"label":"业务报表","value":"BusinessReport","code":"BusinessReport"},{"label":"成本预算统计","value":"CostBudget","code":"CostBudget"},{"label":"其他","value":"Other","code":"Other"},{"label":"项目统计","value":"ProjectReport","code":"ProjectReport"},{"label":"待办类","value":"Workbenches","code":"Workbenches"}],"isMultiple":false,"IsMultiBind":"","ParentName":"","ResStyle":"","allowInput":true,"checkInput":false}]',
    PLM_ATTR_OID: '927e081c-c439-4178-ae1a-571131b81cfa',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 10,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '1c16cb8e-097d-4e26-a87f-d763a4faf5e5',
    Title: '下拉框(多选)',
    DisplayTitle: '下拉框(多选)',
    Type: 'dropdown',
    Name: 'XLKDX',
    DefaultValue: '1',
    value: null,
    DataLength: 200,
    DataType: 4,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 10,
    TextContent:
      '[{"ResCls":"399ad7f6-92a7-fa94-0638-ced00b9c33fb","ResCode":"SYS_DMSOURCE","CustomizeMenus":[{"label":"客户","value":"0","code":"0"},{"label":"市场","value":"1","code":"1"},{"label":"产品","value":"2","code":"2"}],"isMultiple":true,"IsMultiBind":"","ParentName":"","ResStyle":""}]',
    PLM_ATTR_OID: '1c16cb8e-097d-4e26-a87f-d763a4faf5e5',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 11,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: 'faccecdd-1b23-4a6a-bef6-82b1d7932ccb',
    Title: '日期框-日期',
    DisplayTitle: '日期框-日期',
    Type: 'datetime',
    Name: 'RQKRQ',
    DefaultValue: '0',
    value: null,
    DataLength: 0,
    DataType: 7,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 11,
    TextContent: '[{"Dateformat":"0"}]',
    PLM_ATTR_OID: 'faccecdd-1b23-4a6a-bef6-82b1d7932ccb',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 12,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '11ef34f8-f4e1-492b-8631-ec49c7a55916',
    Title: '日期框-日期时间',
    DisplayTitle: '日期框-日期时间',
    Type: 'datetime',
    Name: 'RQKRQSJ',
    DefaultValue: '1',
    value: null,
    DataLength: 0,
    DataType: 7,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 12,
    TextContent: '[{"Dateformat":"1"}]',
    PLM_ATTR_OID: '11ef34f8-f4e1-492b-8631-ec49c7a55916',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 13,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '03542182-f87b-4146-97c5-0c0b5d438df3',
    Title: '选择框(单选)',
    DisplayTitle: '选择框(单选)',
    Type: 'select',
    Name: 'XZK',
    DefaultValue: '',
    value: null,
    DataLength: 200,
    DataType: 4,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 13,
    TextContent:
      '[{"Verify":"","ResCls":"6466cb53-4ac6-006e-1bc2-38525ec8d7a9","ResCode":"SYS_REF_SRM","IsMultiBind":"","GroupName":"","ParentName":"","ResStyle":"","allowInput":false}]',
    PLM_ATTR_OID: '03542182-f87b-4146-97c5-0c0b5d438df3',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 14,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: 'ca2ae040-f840-4cab-882b-903c024c0057',
    Title: '选择框(多选)',
    DisplayTitle: '选择框(多选)',
    Type: 'select',
    Name: 'XZKDX',
    DefaultValue: '',
    value: null,
    DataLength: 200,
    DataType: 4,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 14,
    TextContent:
      '[{"Verify":"","ResCls":"4c3cff77-138b-4227-a2ce-4694f8f3411f","ResCode":"CUS_KHXX","IsMultiBind":"","GroupName":"","ParentName":"","ResStyle":"[M_ID]_[NAME]","isMultiple":true}]',
    PLM_ATTR_OID: 'ca2ae040-f840-4cab-882b-903c024c0057',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 15,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '50284385-dd6a-480b-b8b3-8d0ed6ee04dc',
    Title: '人员(单选)',
    DisplayTitle: '人员(单选)',
    Type: 'organize',
    Name: 'RY',
    DefaultValue: '48d7e469-61ad-4f4b-a8a0-00ba5c2e86a0',
    value: null,
    DataLength: 200,
    DataType: 4,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 15,
    TextContent: '[{"MultiSelect":false}]',
    PLM_ATTR_OID: '50284385-dd6a-480b-b8b3-8d0ed6ee04dc',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 16,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '4bbbf70d-142c-4c25-a047-ccb3d7957470',
    Title: '人员(多选)',
    DisplayTitle: '人员(多选)',
    Type: 'organize',
    Name: 'RYDX',
    DefaultValue:
      '48d7e469-61ad-4f4b-a8a0-00ba5c2e86a0,9c01c4da-fb7e-43b2-9ba3-00e65ac4ebb6',
    value: null,
    DataLength: 200,
    DataType: 4,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 16,
    TextContent: '[{"MultiSelect":true}]',
    PLM_ATTR_OID: '4bbbf70d-142c-4c25-a047-ccb3d7957470',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 17,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '6f9eb9b0-4805-4a94-88ae-1a4d5f42e6de',
    Title: '组织(单选)',
    DisplayTitle: '组织(单选)',
    Type: 'organization',
    Name: 'ZZ',
    DefaultValue: '',
    value: null,
    DataLength: 200,
    DataType: 4,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 17,
    TextContent: '[{"MultiSelect":false}]',
    PLM_ATTR_OID: '6f9eb9b0-4805-4a94-88ae-1a4d5f42e6de',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 18,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '93f6768f-1adb-47ed-ba61-9e55e0bf0a34',
    Title: '组织(多选)',
    DisplayTitle: '组织(多选)',
    Type: 'organization',
    Name: 'ZZDX',
    DefaultValue: '',
    value: null,
    DataLength: 200,
    DataType: 4,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 18,
    TextContent: '[{"MultiSelect":true}]',
    PLM_ATTR_OID: '93f6768f-1adb-47ed-ba61-9e55e0bf0a34',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 19,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '2ea9a859-0652-427f-af91-213d89271340',
    Title: '当前信息',
    DisplayTitle: '当前信息',
    Type: 'currentInfo',
    Name: 'DQXX',
    DefaultValue: '',
    value: null,
    DataLength: 2000,
    DataType: 4,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 19,
    TextContent: '[{"CurrentInfoDataType":"organization"}]',
    PLM_ATTR_OID: '2ea9a859-0652-427f-af91-213d89271340',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 20,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '24685f69-581a-41e8-a885-f70c7bebef87',
    Title: '自定义表格',
    DisplayTitle: '自定义表格',
    Type: 'customtable',
    Name: 'ZDYBG',
    DefaultValue: '',
    value: null,
    DataLength: 99999,
    DataType: 11,
    Precision: '',
    Proportion: '12',
    AllowNull: true,
    Order: 20,
    TextContent:
      '[{"Cols":[{"label":"附件","name":"FJ","type":"upload","width":"150","align":"left","allowNull":true,"defaultValue":"","TextContent":[{}]},{"label":"图片框","name":"TPK","type":"img","width":"150","align":"left","allowNull":true,"defaultValue":"","TextContent":[{"isMultiple":true}]},{"label":"资源选择框","name":"ZYXZK","type":"resSelect","width":"150","align":"left","allowNull":true,"defaultValue":"","TextContent":[{"IsMultiBind":"","ParentName":"","GroupName":"","CustomizeMenus":[],"ResCode":"CUS_ZZJG","isMultiple":true}]},{"label":"下拉框","name":"XLK","type":"dropdown","width":"150","align":"left","allowNull":true,"defaultValue":"","TextContent":[{"CustomizeMenus":[{"label":"业务报表","value":"BusinessReport","code":"BusinessReport"},{"label":"成本预算统计","value":"CostBudget","code":"CostBudget"},{"label":"其他","value":"Other","code":"Other"},{"label":"项目统计","value":"ProjectReport","code":"ProjectReport"},{"label":"待办类","value":"Workbenches","code":"Workbenches"}],"IsMultiBind":"","ParentName":"","ResCode":"SYS_WRPT_BUSINESSREPORTCATEGORY","isMultiple":true}]},{"label":"组织","name":"ZZ","type":"organization","width":"150","align":"left","allowNull":true,"defaultValue":"","TextContent":[{"MultiSelect":true}]},{"label":"人员","name":"RY","type":"organize","width":"150","align":"left","allowNull":true,"defaultValue":"","TextContent":[{"MultiSelect":true}]},{"label":"日期框","name":"RQK","type":"datetime","width":"150","align":"left","allowNull":true,"defaultValue":"","TextContent":[{"Dateformat":"1"}]},{"label":"小数框","name":"XSK","type":"decimals","width":"150","align":"left","allowNull":true,"defaultValue":"","TextContent":[{}]},{"label":"整数框","name":"ZSK","type":"integer","width":"150","align":"left","allowNull":true,"defaultValue":"","TextContent":[{}]},{"label":"输入框","name":"SRK","type":"input","width":"150","align":"left","allowNull":false,"defaultValue":"","TextContent":[{}]}],"DefaultValue":[],"Mode":"table"}]',
    PLM_ATTR_OID: '24685f69-581a-41e8-a885-f70c7bebef87',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 21,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '6a73f266-e215-4df0-840c-9aedf32bfe25',
    Title: '超链接1',
    DisplayTitle: '超链接1',
    Type: 'link',
    Name: 'CLJ',
    DefaultValue:
      '4a2e0891-f81c-4151-b5e4-1489507b3735,ab07adf6-d3cd-4f48-8a69-2370984377b8',
    value: null,
    DataLength: 200,
    DataType: 4,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 21,
    TextContent: '[{"LinkClass":"ROOTBI"}]',
    PLM_ATTR_OID: '6a73f266-e215-4df0-840c-9aedf32bfe25',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 22,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '1d82bad9-ebfc-40da-ad29-bd111d5934d3',
    Title: '超链接2',
    DisplayTitle: '超链接2',
    Type: 'link',
    Name: 'CLJ2',
    DefaultValue: '',
    value: null,
    DataLength: 200,
    DataType: 4,
    Precision: '',
    Proportion: '12',
    AllowNull: true,
    Order: 22,
    TextContent: '[{"LinkClass":"ROOTBI"}]',
    PLM_ATTR_OID: '1d82bad9-ebfc-40da-ad29-bd111d5934d3',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 23,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '431703d9-c2cf-4c9b-ae98-ff8501e8efdf',
    Title: '分割线-测试',
    DisplayTitle: '分割线-测试',
    Type: 'cutOffRule',
    Name: 'FGXB0D0DF76-F6D4-DD01-063E-5E7A6115234D',
    DefaultValue: '',
    value: null,
    DataLength: 0,
    DataType: 0,
    Precision: null,
    Proportion: '12',
    AllowNull: true,
    Order: 23,
    TextContent: '[{"CutOffRuleLocation":"center"}]',
    PLM_ATTR_OID: null,
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: 'false',
    SortNum: 24,
    LineEnd: false,
    IsAuxiliaryComponent: true,
    FixAttr: null,
    Viewable: null,
    Editable: null,
    DisableSearch: null,
    Filterable: null,
    VirtualClass: null,
    SpecialType: null,
    Remark: '',
    PermStatus: 'R',
    IsStandardComponent: true
  },
  {
    Id: 'f0d44dea-d870-44b9-aa2a-f68eb48362af',
    Title: '图片框(单选)',
    DisplayTitle: '图片框(单选)',
    Type: 'img',
    Name: 'TPK1',
    DefaultValue: '',
    value: null,
    DataLength: 2000,
    DataType: 4,
    Precision: '',
    Proportion: '4',
    AllowNull: true,
    Order: 24,
    TextContent: '[{"isMultiple":false}]',
    PLM_ATTR_OID: 'f0d44dea-d870-44b9-aa2a-f68eb48362af',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 25,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '07b7ac59-eb6b-4b9f-950e-ce660450f1de',
    Title: '图片框(多选)',
    DisplayTitle: '图片框(多选)',
    Type: 'img',
    Name: 'TPK',
    DefaultValue: '',
    value: null,
    DataLength: 2000,
    DataType: 4,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 25,
    TextContent: '[{"isMultiple":true}]',
    PLM_ATTR_OID: '07b7ac59-eb6b-4b9f-950e-ce660450f1de',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 26,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '5fbabff8-d803-4c37-a2d9-dc3884e8fefb',
    Title: '附件上传',
    DisplayTitle: '附件上传',
    Type: 'upload',
    Name: 'FJSC',
    DefaultValue: '',
    value: null,
    DataLength: 2000,
    DataType: 4,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 26,
    TextContent: '[]',
    PLM_ATTR_OID: '5fbabff8-d803-4c37-a2d9-dc3884e8fefb',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 27,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '4b1b2e49-7d76-4997-8152-8739b370f383',
    Title: '状态',
    DisplayTitle: '状态12',
    Type: 'text',
    Name: 'STATUS',
    DefaultValue: '',
    value: null,
    DataLength: 200,
    DataType: 4,
    Precision: '',
    Proportion: '6',
    AllowNull: true,
    Order: 27,
    TextContent: '[]',
    PLM_ATTR_OID: '4b1b2e49-7d76-4997-8152-8739b370f383',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 28,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '1',
    Viewable: '1',
    Editable: '0',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'R',
    IsStandardComponent: false
  },
  {
    Id: '0d18ae8b-ea41-467d-9753-817c08235f25',
    Title: '编辑器',
    DisplayTitle: '编辑器',
    Type: 'texteditor',
    Name: 'BJQ',
    DefaultValue: '编辑器默认值',
    value: null,
    DataLength: 99999,
    DataType: 11,
    Precision: '',
    Proportion: '12',
    AllowNull: true,
    Order: 28,
    TextContent: '[{"Height":"120","Verify":""}]',
    PLM_ATTR_OID: '0d18ae8b-ea41-467d-9753-817c08235f25',
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: null,
    SortNum: 29,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  },
  {
    Id: '5e37f038-c92b-40f1-868e-1666f0fcb610',
    Title: '富文本',
    DisplayTitle: '富文本',
    Type: 'html',
    Name: 'FWBA104A9B5-5A58-EE22-E31B-69A9FF2E1D0C',
    DefaultValue: '',
    value: null,
    DataLength: 0,
    DataType: 0,
    Precision: null,
    Proportion: '12',
    AllowNull: true,
    Order: 29,
    TextContent:
      '[{"RichText":"%3Ch2%3E%3Cspan%20style%3D%22background-color%3A%20rgb%28249%2C%20150%2C%2059%29%3B%22%3E%u5BCC%u6587%u672C%3C/span%3E%3C/h2%3E%3Ch4%3E%3Cb%3E%3Ci%3E132465%3C/i%3E%3C/b%3E%3C/h4%3E"}]',
    PLM_ATTR_OID: null,
    IsExisting: true,
    ClientGroupOid: '89d8e344-03be-4cb1-b933-3df7b155a8af',
    ExtendedProperty: 'false',
    SortNum: 30,
    LineEnd: false,
    IsAuxiliaryComponent: true,
    FixAttr: null,
    Viewable: null,
    Editable: null,
    DisableSearch: null,
    Filterable: null,
    VirtualClass: null,
    SpecialType: null,
    Remark: '',
    PermStatus: 'R',
    IsStandardComponent: true
  },
  {
    Id: '56824d48-b3e6-4bda-aabb-24e352fd1c8e',
    Title: '文本区',
    DisplayTitle: '文本区',
    Type: 'textarea',
    Name: 'WBQ',
    DefaultValue: '死亡人数',
    value: null,
    DataLength: 200,
    DataType: 4,
    Precision: '',
    Proportion: '12',
    AllowNull: false,
    Order: 30,
    TextContent: '[{"Height":"100","Verify":""}]',
    PLM_ATTR_OID: '56824d48-b3e6-4bda-aabb-24e352fd1c8e',
    IsExisting: true,
    ClientGroupOid: '0a719cc9-1c9a-4b90-8e5f-0e8e85e8d1dd',
    ExtendedProperty: null,
    SortNum: 31,
    LineEnd: false,
    IsAuxiliaryComponent: false,
    FixAttr: '0',
    Viewable: '1',
    Editable: '1',
    DisableSearch: '0',
    Filterable: '0',
    VirtualClass: '0',
    SpecialType: '0',
    Remark: '',
    PermStatus: 'M',
    IsStandardComponent: false
  }
].map(c => {
  fieldConfigMap.set(c.Name, c)
})

const obj = {
  PLM_ID: '16877044810104955',
  fileList: [
    {
      id: '877a4c5d-f0a0-488f-8ddc-9fecdeb597fa',
      name: 'tsx中使用css变量.png',
      type: 'PNG',
      size: 101952
    },
    {
      id: 'ff607d30-3b42-4507-9916-b37a3d13620f',
      name: 'tsx中使用css变量类型检测.png',
      type: 'PNG',
      size: 92912
    },
    {
      id: 'f161ebb8-d8db-4cb1-8d83-8ad7d989be50',
      name: '本地office使用说明.docx',
      type: 'DOCX',
      size: 167930
    }
  ],
  NAME: '66哈哈哈',
  PLMHZXDESC: '',
  WBK: 'Hdhd',
  ZSK: 12,
  XSK: 1.2,
  DXX: '0',
  DXK: 'CostBudget,Other',
  SFK: 'Y',
  XLK: ['ProjectReport'],
  XLKDX: ['2'],
  RQKRQ: '2023-11-24T00:00:00',
  RQKRQSJ: '2023-06-25T17:58:00',
  XZK: '谷歌',
  XZKDX: '139_PAK',
  RY: '48d7e469-61ad-4f4b-a8a0-00ba5c2e86a0',
  RYDX: '48d7e469-61ad-4f4b-a8a0-00ba5c2e86a0,9c01c4da-fb7e-43b2-9ba3-00e65ac4ebb6,db90e185-cffd-4b47-af6a-012100d5024f,6128b9c4-46d0-4a7c-982c-3e0eab8a75ba,c2c7ea02-02cb-4fdf-9458-95af40238684',
  ZZ: 'b6bebf8a-9a41-4d82-9a3f-44332423633b',
  ZZDX: '4e560328-9ad2-4d7d-a66f-d091e24ace78,d3a4073f-c052-4c6d-b06c-4f3231ca155d',
  DQXX: '4e560328-9ad2-4d7d-a66f-d091e24ace78,d3a4073f-c052-4c6d-b06c-4f3231ca155d,8286a3dc-b2c8-406a-9c2e-b43f29635bac,58c58571-53b7-4cb3-a96f-603b97d0e561,37af78be-403b-4539-b823-7208a3966447,3b9000e1-2840-48e7-9ee9-e0a4b23b73b9,fbe47fe1-9604-45ce-bb87-5e0dec2829cf',
  ZDYBG: [
    {
      ZZ: '4e560328-9ad2-4d7d-a66f-d091e24ace78',
      XSK: '545',
      ZSK: '12555',
      FJ: 'e73f49ca-011a-47ed-bd91-7a39a9b4d9e0,c199af3a-da65-4cb4-b091-9c4ad4255bce',
      ZYXZK: '16808831150061853,16808831150403804,16808831149883489',
      XLK: ['Workbenches', 'ProjectReport', 'BusinessReport'],
      RY: 'db90e185-cffd-4b47-af6a-012100d5024f,48d7e469-61ad-4f4b-a8a0-00ba5c2e86a0,1175df0f-05fd-413d-ba13-079e8365a7ff,56ab2b26-0c40-4cb8-b8f1-07ee1a935185,c73403c8-7787-41c2-8d3a-0e49dde24aa3,6128b9c4-46d0-4a7c-982c-3e0eab8a75ba',
      id: '77a62eb1-7880-4f5c-21e5-526fbd72ff2a',
      RQK: '2023-06-20 06:00',
      SRK: '测试123',
      TPK: '2263685f-e14c-4a01-afa6-4d6f410c9561,6f6ef2ac-6056-40d6-bc3a-5043d215dae6'
    }
  ],
  CLJ: '4a2e0891-f81c-4151-b5e4-1489507b3735,ab07adf6-d3cd-4f48-8a69-2370984377b8',
  CLJ2: '',
  'FGXB0D0DF76-F6D4-DD01-063E-5E7A6115234D': '',
  TPK1: 'd6de555a-d3c4-454e-be97-e3089f9768ae',
  TPK: '25520a29-1b6d-410d-bf99-6a1cf966beb2,2ad49d2c-320d-499c-89f0-7a08c91e9e87,3922bd32-8f0f-4c59-8cc0-a15edb4dcb4c,76e49467-b57b-483e-8459-0dffec58a740',
  FJSC: 'bba11742-fd67-4e0c-948f-46892d3ecec8,5fc0cebe-d52b-4850-a8d9-283e0a210c74',
  STATUS: '',
  BJQ: '<p>编辑器默认值</p>',
  'FWBA104A9B5-5A58-EE22-E31B-69A9FF2E1D0C': '',
  WBQ: '死亡人数666'
}

const condition = {
  Field: null,
  Table: null,
  FilterOperator: 0,
  Value: null,
  VPreFix: null,
  LogicalOperator: 3,
  Type: -1,
  Conditions: [
    {
      Field: 'NAME',
      Table: 'I',
      FilterOperator: 2,
      Value: '哈哈哈',
      VPreFix: null,
      LogicalOperator: 1,
      Type: 4,
      Conditions: []
    },
    {
      Field: 'ZSK',
      Table: 'I',
      FilterOperator: 1,
      Value: '1',
      VPreFix: null,
      LogicalOperator: 2,
      Type: 1,
      Conditions: []
    },
    {
      Field: null,
      Table: null,
      FilterOperator: 0,
      Value: null,
      VPreFix: null,
      LogicalOperator: 1,
      Type: -1,
      Conditions: [
        {
          Field: 'ZSK',
          Table: 'I',
          FilterOperator: 1,
          Value: '12',
          VPreFix: null,
          LogicalOperator: 1,
          Type: 1,
          Conditions: []
        }
      ]
    }
  ]
}

function dealCondition(rootCondition, obj) {
  function loop(source) {
    if (source.Conditions && source.Conditions.length) {
      let tag = false
      for (const condition of source.Conditions) {
        const { LogicalOperator } = source
        // 如果结果为 true 下个操作符是 || 直接返回
        if (tag && LogicalOperator === LogicalOperatorEnum.OR) return tag
        const res = loop(condition)
        switch (LogicalOperator) {
          case LogicalOperatorEnum.AND:
            tag = tag && res
            break
          case LogicalOperatorEnum.OR:
            tag = tag || res
            break
          case LogicalOperatorEnum.NOT:
            tag = tag && !res
            break
          default:
            break
        }
        tag = res
      }
      return tag
    } else {
      let res = false
      let { Field, FilterOperator, Value } = source
      // 当前登录人
      if (Value === 'v$thisuser') {
        Value = currentUserInfo()?.UserOid
      }
      // 表单值
      const formValue = obj[Field]
      // 表单配置
      const fieldConfig = fieldConfigMap.get(Field)

      switch (FilterOperator) {
        case FilterOperatorEnum.Equal:
          res = Value == formValue
          break
        case FilterOperatorEnum.NotEqual:
          res = Value != formValue
          break
        case FilterOperatorEnum.Null:
          res = !(Array.isArray(val) ? val.length > 0 : val || val === 0)
          break
        default:
          break
      }

      return res
    }
  }
  let res = loop(rootCondition)
  // 根条件
  if (rootCondition.LogicalOperator === LogicalOperatorEnum.NOT) res = !res
  return res
}

console.log(dealCondition(condition, obj))
