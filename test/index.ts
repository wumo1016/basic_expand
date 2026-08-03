
enum ApplyStatusEnum {
  toSubmitted = '0', //待提交
  toAllot = '1', //待分配
  published = '2', //已发布
  detecting = '3', //检测中
  finish = '4', //检测完成
  withdraw = '5' //撤回
}


console.log(Object.keys(ApplyStatusEnum));
