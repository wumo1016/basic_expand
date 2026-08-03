import Decimal from 'decimal.js'

console.log(new Decimal(2).div(0))

const a = {
  RecordOid: '28113903-debd-4dcd-97e3-d98bdc456df7',
  HasPLMMaterial: false,
  RecordRelItems: [
    {
      CLASSNAME: 'EXP_RECORDTODITEM',
      LeftOidStr: '28113903-debd-4dcd-97e3-d98bdc456df7',
      LEFT_CLASSNAME: 'EXP_RECORD',
      RIGHT_CLASSNAME: 'WEXP_DETECTITEM',
      RightMOidStr: '91652590-9364-4642-ad5a-af0c4abc8a5f',
      REL_ORDER: 1,
      ATTRIBUTES: {
        UNIT: '',
        DETECTIONRESULT: '',
        CONDITION: '',
        DETECTIONVALUE: '',
        DETECTRATING: '',
        EQUIPMENTMOID: '',
        PARTITERATION: 1,
        PARTREVISION: 1,
        ORDER: 1
      }
    },
    {
      CLASSNAME: 'EXP_RECORDTODITEM',
      LeftOidStr: '28113903-debd-4dcd-97e3-d98bdc456df7',
      LEFT_CLASSNAME: 'EXP_RECORD',
      RIGHT_CLASSNAME: 'WEXP_DETECTITEM',
      RightMOidStr: '64412fa8-6ecb-4b7b-bb67-752e0a9962ec',
      REL_ORDER: 2,
      ATTRIBUTES: {
        UNIT: '',
        DETECTIONRESULT: '',
        CONDITION: '',
        DETECTIONVALUE: '',
        DETECTRATING: '',
        EQUIPMENTMOID: '',
        PARTITERATION: 1,
        PARTREVISION: 1,
        ORDER: 2
      }
    }
  ],
  ModuleInformation:
    '[{"code":"exp-purpose","id":"4006c7ef-e40e-edf4-1247-dc9b0c8bf69b","title":"实验目的","width":"100%","perm":16384,"configs":{"placeholder":"请输入实验目的","showLimit":false,"maxLen":200}},{"code":"formulaExperimentRecordBlock","id":"e9e65b98-1260-e7c0-4c81-018a9cca2c9d","title":"实验检测","width":"100%","perm":16416,"configs":{"columnList":[{"title":"检测项目","field":"NAME","perm":0,"show":true,"report":true,"isCanEdit":true,"visible":true},{"title":"测试项目zy","field":"CSXMZY","perm":0,"show":true,"report":true,"visible":true},{"title":"所属部门","field":"SSBM","perm":0,"show":true,"report":true,"visible":true},{"title":"归属部门","field":"GSBM","perm":0,"show":true,"report":true,"visible":true},{"title":"代号","field":"PLM_ID","perm":0,"show":false,"report":true},{"title":"检测分类","field":"PROJECTCLASS","perm":0,"show":true,"report":true,"visible":true},{"title":"检测方法","field":"JCFF","perm":0,"show":true,"report":true,"visible":true},{"title":"描述","field":"DESCRIBE","perm":0,"show":true,"report":true,"visible":true},{"title":"指标","field":"INDICATOR","perm":0,"show":true,"report":true,"visible":true},{"title":"单位","field":"UNIT","perm":0,"show":true,"report":true,"visible":true},{"title":"委托说明","field":"ORDERSTATEMENT","perm":0,"show":true,"report":true,"visible":true},{"title":"单位","field":"REL_UNIT","perm":0,"show":true,"report":true,"isCanEdit":true,"isRel":true,"visible":true},{"title":"检测结果","field":"REL_DETECTIONRESULT","perm":0,"show":true,"report":true,"isCanEdit":true,"isRel":true,"visible":true},{"title":"检测条件","field":"REL_CONDITION","perm":0,"show":true,"report":true,"isCanEdit":true,"isRel":true,"visible":true},{"title":"检测值","field":"REL_DETECTIONVALUE","perm":0,"show":true,"report":true,"isCanEdit":true,"isRel":true,"visible":true},{"title":"检测指标","field":"REL_DETECTRATING","perm":0,"show":true,"report":true,"isCanEdit":true,"isRel":true,"visible":true},{"title":"设备","field":"REL_EQUIPMENTMOID","perm":0,"show":true,"report":true,"isCanEdit":true,"isRel":true,"visible":true},{"field":"FXFF","title":"分析方法","show":true,"report":true,"visible":true}],"ranges":[],"detectRowConfigMap":{"95cde14c-efa6-4580-9cca-4927ed004286":{"FXFF":""},"04878932-e987-48bf-92e0-da104d7e04c8":{"FXFF":"b51870b0-dee6-4e5d-b2dd-2a7727980bf7"}}}}]',
  StructuralData: [
    {
      ModuleId: 'e9e65b98-1260-e7c0-4c81-018a9cca2c9d',
      className: 'WEXP_DETECTITEM',
      addDataList: [],
      editDataList: [],
      deleteDataList: []
    }
  ],
  DeleteModuleIds: []
}
