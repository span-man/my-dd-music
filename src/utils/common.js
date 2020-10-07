export default {
    getDomain() {
        if(window.location.host.includes("derlol.top")) {
            return "http://derlol.top:3002"
        } else {
            return "http://localhost:3002"
        }
    }
}