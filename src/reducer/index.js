// 这个文件是创建reducer函数的，专门用来处理发送过来的action
const initState = {
    value: "默认值"
}
const reducer = (state = initState, action) => {
    // console.log("到了reducer state", state)
    // console.log("到了reducer action", action)
    switch (action.type) {
        case "send_type":
            return Object.assign({}, state, action)
            break;

        default:
            return state
            break;
    }
}

module.exports = {
    reducer
}