### 基本组件（Basic Components）

- **View**：最基本的容器组件，支持布局、样式和触摸事件（类似于 div）。
- **Text**：用于显示文本，支持嵌套和样式。
- **Image**：显示图片，支持本地、网络和静态资源。
- **ScrollView**：可滚动的容器，支持垂直/水平滚动。
- **TextInput**：文本输入框，支持键盘类型、占位符等。

### 交互组件（User Interface）

- **Button**：简单按钮（跨平台一致外观）。
- **Pressable**：更灵活的按压响应组件，支持各种触摸反馈（推荐替代 Touchable 系列）。
- **TouchableOpacity / TouchableHighlight / TouchableWithoutFeedback**：触摸反馈组件（Pressable 更现代）。
- **Switch**：开关控件。
- **Picker**（已弃用，推荐使用社区替代如 @react-native-picker/picker）。

### 列表组件（List Views）

- **FlatList**：高性能扁平列表，支持大数据渲染、分页、拉刷新等。
- **SectionList**：支持分组的列表。
- **VirtualizedList**：底层虚拟化列表（FlatList 和 SectionList 基于它）。

### 其他常见组件

- **ActivityIndicator**：加载指示器（ spinner ）。
- **Alert**：弹窗提示（非组件，但常用 API）。
- **ImageBackground**：带背景图片的容器。
- **KeyboardAvoidingView**：自动避开键盘。
- **Modal**：模态弹窗。
- **RefreshControl**：下拉刷新控件（常与 ScrollView/FlatList 结合）。
- **SafeAreaView**：处理刘海屏/安全区域。
- **StatusBar**：状态栏控制。
