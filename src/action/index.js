// 这是一个action的构建函数
const sendAction = (obj) => {
    // 我们需要返回一个action对象
    return {
        type: 'send_type',
        value: obj || "你没传对象呢"
    }
}

module.exports = {
    sendAction
}