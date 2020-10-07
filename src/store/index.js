import { createStore } from "redux"

// 导入我们自己创建好的reducer
import { reducer } from "../reducer";

// 构建 store
const store = createStore(reducer)

export default store;