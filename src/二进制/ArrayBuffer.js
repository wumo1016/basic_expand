/* ArrayBuffer
- 用来表示通用的、固定长度的原始二进制数据缓冲区
- 它是一个字节数组，通常在其他语言中称为byte array
- 本身不能操作字节 要借助 TypedArray 或 DataView 才能操作buffer
- 一个字节占8位
*/

/* TypedArray
- 分类
  类型	      单个元素值的范围	  大小(bytes)	          描述
  Int8Array	    -128~127	           1	          8位二进制有符号整数
  Uint8Array	  0~255	               1	          8位无符号整数
  Int16Array	  -32768~32767	       2	          16位二进制有符号整数
  Uint16Array	  0~65535	             2	          16位无符号整数
  - 大小的意思是 1个元素用1个字节大小/2个字节大小
- buffer: 实例属性 可以获取原本的buffer
*/
;(function () {
  const buffer = new ArrayBuffer(8) // 8个字节
  console.log(buffer.byteLength) // 8

  const int8Array = new Int8Array(buffer)
  console.log(int8Array.length) // 8(因为一共8个字节 而1个元素需要1个字节)

  const int16Array = new Int16Array(buffer) // 如果字节数不是2的倍数会直接报错
  console.log(int16Array.length) // 4(因为一共8个字节 而1个元素需要1个字节)

  console.log(int8Array.buffer)
})

/* DataView
- setInt8(offset, data): 从第几个字节储存数据(从0开始)
- getInt8(offset): 获取第几个字节储存的数据
- buffer: 实例属性 可以获取原本的buffer
*/
;(function () {
  const buffer = new ArrayBuffer(2)

  const dataView = new DataView(buffer)
  dataView.setInt8(0, 1) // 00000001 00000000
  dataView.setInt8(1, 2) // 00000001 00000010
  console.log(dataView.getInt8(0)) // 1 => 00000001
  console.log(dataView.getInt8(1)) // 2 => 00000010
  console.log(dataView.getInt16(0)) // 258 => 0000000100000010

  console.log(dataView.buffer)
})
