const {SerialPort, ReadlineParser} = require("serialport")
const robot = require("robotjs");
const parser = new ReadlineParser({ delimiter: '\r'})
const port = new SerialPort({
    path: 'COM3',
    baudRate: 9600
})
port.pipe(parser)

port.on("open", function() {
    console.log("connection opened");
})

parser.on("data",async function(data){
    let str = JSON.stringify(data);
    let strPar = JSON.parse(str);
    let commands = JSON.parse(strPar);
    if (commands.Y >= 3 || commands.Y <= -3) {  
        await robot.mouseClick();
        const timer = setTimeout(() => robot.mouseToggle("up"),1000)  
        const check = await (() => {
            if (commands.Y <= 1 && commands.Y >= -1) {
                clearTimeout(timer)
                return robot.mouseClick()
            }
        })
            
        
    }    
    }
    )

// parser.on("data",async function(data){
//     let str = JSON.stringify(data);
//     let strPar = JSON.parse(str);
//     let commands = JSON.parse(strPar);
//     if (commands.Y >= 3 || commands.Y <= -3) {    
//         robot.mouseClick();
//         const command = await waitForCommand(commands.Y)
//         if (command === 0) {
//             robot.mouseClick();
//             console.log(command);
//         }
//     }
//     if (commands.Y <= 1 && commands.Y >= -1) {
//         robot.mouseToggle("up")
//     }
    

// })

// async function waitForCommand (Y) {
//     const timer = setTimeout(()=> console.log("out"),2000)

//     const command = await getCommand(() => {
//         if(Y >= 3 || Y <= -3){
//             clearTimeout(timer)
//             return 0
//         }
//         else {
//             return null
//         }
//     })
// }

