



cmdData = {
    "historyPointer": 0,
    "historyList": [],
    "clear": (eDoc)=>{
        $($(eDoc).find("#cmHead")).html("");
        eDoc.find("#cmdMsg #cmdMsgText").text("");
        $("#extendsion").html("");
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
    },
    "logo":()=>{
        
        $("#extendsion").html("<img src='https://moeimg.net/wp-content/uploads/img/moeimg_pc_2.gif'></img>");
    }
}

function getLastCmd(dir){
    console.log(cmdData.historyList.length === 0 ,
        cmdData.historyPointer === -1,
        cmdData.historyPointer === cmdData.historyList.length+1)
    if(cmdData.historyList.length === 0 ) {
            
            dir > 0 ? cmdData.historyPointer = 0 : cmdData.historyPointer = cmdData.historyList.length;
            return "";
        }
        cmdData.historyPointer+=dir;
        if(cmdData.historyPointer === -1) cmdData.historyPointer = 0;
        if(cmdData.historyPointer === cmdData.historyList.length+1) cmdData.historyPointer = cmdData.historyList.length;
    return cmdData.historyList[cmdData.historyPointer];
}

function cmdHandle(eDoc, cmd){
    if(cmd !== ""){
        cmdData.historyList.push(cmd);
        cmdData.historyPointer=cmdData.historyList.length;
    }
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

function cmdHandleHelp(eDoc,cmd,targetEDoc){
    let cmdHelpList = "";
    console.log(cmd)
    let cnt = 0;
    for(key in cmdData){
        if(key.search(cmd) === 0){
            cmdHelpList += "\t" + key;
            cnt++;
        }
    }
    if(cnt === 1 && targetEDoc){
        $(targetEDoc).val(cmdHelpList.trim())
    }
    $(eDoc).text(cmdHelpList);
}