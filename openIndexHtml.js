let connect = require("connect");
let path = require("path");
let serveStatic = require("serve-static");

let app = connect();
let p = path.resolve(__dirname, './build')
console.log(p)
app.use(serveStatic(p));

app.listen("7724", () => {
    console.log("7724 my-dd-music web 前端")
});