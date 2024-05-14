



cmdData = {
    "historyList": {},
    "clear": (eDoc)=>{
        $($(eDoc).find("#cmHead")).html("");
        eDoc.find("#cmdMsg #cmdMsgText").text("");
    },
    "getPcThreadPoolInfo": async (eDoc)=>{
        let flag = true;
        let reqFlag = false;
        Post("http://localhost:8080/pc/getPcThreadPoolInfo",{},
        (res) =>{
            console.log(res)
            eDoc.find("#cmdMsg #cmdMsgText").text(JSON.stringify(res));
        },
        (res) =>{
            console.log(res);
            eDoc.find("#cmdMsg #cmdMsgText").text(JSON.stringify(res));
        },
        () =>{

        });
        
        
    }
}


function cmdHandle(eDoc, cmd){
    if(cmdData[cmd]){
        cmdData[cmd](eDoc);
        return true;
    }else{
        if(cmd === ""){
            eDoc.find("#cmdMsg #cmdMsgText").text("");
            return true;
        }
        eDoc.find("#cmdMsg #cmdMsgText").text("Unknown command: " + cmd);
        return false;
    }
}