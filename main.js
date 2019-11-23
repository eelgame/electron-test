const {app, BrowserWindow, Menu} = require('electron');
Menu.setApplicationMenu(null);

function createWindow() {
    // 创建浏览器窗口
    let win = new BrowserWindow({
        width: 800,
        height: 600
    });
    // win.setSkipTaskbar(true);
    win.loadURL('http://localhost:4001/login.html')
}

const zmq = require("zeromq");

async function run() {
    const sock = new zmq.Publisher;

    await sock.bind("tcp://127.0.0.1:12345");
    console.log("Publisher bound to port 3000");

    while (true) {
        console.log("sending a multipart message envelope");
        await sock.send(["LOGIN_RESULT", "meow!"]);
        await new Promise(resolve => setTimeout(resolve, 500))
    }
}

run();


app.on('ready', createWindow);

