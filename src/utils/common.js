export default {
    getDomain() {
        // if (window.location.host.includes("derlol.top")) {
        return "http://derlol.top:3002"
        // } else {
        //     return "http://localhost:3002"
        // }
    },
    // 补全前面
    myPadStart(_num, _num2) {
        let str = String(_num)
        return str.padStart(_num2, "0")
    },
    // 将秒转成分钟
    makeMinutes(_seconds) {
        if (!_seconds) {
            return "00:00"
        }
        let tempStr = "";
        let t = Number(_seconds).toFixed(0)
        // console.log("makeMinutes -> t", t)
        let minutes = Math.floor(t / 60)
        let second = t - minutes * 60
        return this.myPadStart(minutes, 2) + ":" + this.myPadStart(second, 2)
    },
    // 节流
    throttle(func, wait, type) {
        if (type === 1) {
            var previous = 0;
        } else if (type === 2) {
            var timeout;
        }
        return function () {
            let context = this;
            let args = arguments;
            if (type === 1) {
                let now = Date.now();

                if (now - previous > wait) {
                    func.apply(context, args);
                    previous = now;
                }
            } else if (type === 2) {
                if (!timeout) {
                    timeout = setTimeout(() => {
                        timeout = null;
                        func.apply(context, args)
                    }, wait)
                }
            }
        }
    }
}