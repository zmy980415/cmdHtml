
function clearInput(eDoc) {
    eDoc.val("");
}

function setInputHeader(eDoc, env,user) {
    eDoc.find(".env").text("["+env+"]");
    eDoc.find(".user").text("["+user+"]");
}

