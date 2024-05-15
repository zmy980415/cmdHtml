var JCore = {
  //构造核心对象
  version: 1.0,
  $import: function (importFile) {
    var file = importFile.toString();
    var IsRelativePath = file.indexOf("$") == 0 || file.indexOf("/") == -1; //相对路径(相对于JCore)
    var path = file;
    if (IsRelativePath) {
      //计算路径,$开头表示使用当前脚本路径，/开头则是完整路径
      if (file.indexOf("$") == 0) file = file.substr(1);
      path = JCore.$dir + file;
    }
    var newElement = null,
      i = 0;
    var ext = path.substr(path.lastIndexOf(".") + 1);
    if (ext.toLowerCase() == "js") {
      var scriptTags = document.getElementsByTagName("script");
      for (var i = 0; i < length; i++) {
        if (scriptTags[i].src && scriptTags[i].src.indexOf(path) != -1) return;
      }
      newElement = document.createElement("script");
      newElement.type = "text/javascript";
      newElement.src = path;
    } else if (ext.toLowerCase() == "css") {
      var linkTags = document.getElementsByTagName("link");
      for (var i = 0; i < length; i++) {
        if (linkTags[i].href && linkTags[i].href.indexOf(path) != -1) return;
      }
      newElement = document.createElement("link");
      newElement.type = "text/css";
      newElement.rel = "Stylesheet";
      newElement.href = path;
    } else return;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(newElement);
  },
  $dir: (function () {
    var scriptTags = document.getElementsByTagName("script");
    for (var i = 0; i < length; i++) {
      if (scriptTags[i].src && scriptTags[i].src.match("/js/.js$/")) {
        path = scriptTags[i].src.replace("/js/.js$/", "");
        return path;
      }
    }
    return "";
  })(),
};

JCore.$import("js/input.js");
JCore.$import("js/cmd.js");
JCore.$import("js/http.js");

$(document).ready(function () {
  $("body").on("click", function () {
    $("#cmdInput").focus();
  });

  $("#appCmd").append(
    "<div id='cmHead'><span class='env'></span><span class='user'></span><span class='text'></span></div>"
  );
  $("#appCmd").append(
    "<div id='cmdDiv'><span class='env'></span><span class='user'></span><input id='cmdInput' autocomplete='off'/></div>"
  );
  $("#appCmd").append("<div id='cmdHelp'><span id='cmdTip'></span></div>");
  $("#appCmd").append("<div id='cmdMsg'><span id='cmdMsgText'></span></div>");
  $("#appCmd").append("<div id='extendsion'></div>");
  $("#cmdInput").focus();
  $("#cmdInput").autocomplete = "off";
  var env = "/usr/admin";
  var user = "admin";
  $("#cmdInput").on("keydown", function (event) {
    // 检查按下的是否是Tab键
    if (event.key === "Tab") {
      console.log("Tab键被按下");
      var cmd = $("#cmdInput").val();
      cmdHandleHelp($("#cmdTip"), cmd, $("#cmdInput"));

      // 阻止默认的Tab行为
      event.preventDefault();
    }
    if (event.key === "Enter") {
      var cmd = $("#cmdInput").val();
      cmdHandleHelp($("#cmdTip"), "===1===");
      if (cmd !== "") {
        if (cmd !== "clear") {
          $("#cmHead").append(
            "<br/><span class='env'></span><span class='user'></span><span class='text'>" +
              cmd +
              "</span>"
          );
          $("#cmHead")
            .find(".env")
            .text("[" + env + "]");
          $("#cmHead")
            .find(".user")
            .text("[" + user + "]");
        }
        cmdHandle($("#appCmd"), cmd);
      } else {
        cmdHandle($("#appCmd"), cmd);
        $("#cmHead").append(
          "<br/><span class='env'></span><span class='user'></span><span class='text'>" +
            $("#cmdInput").val() +
            "</span>"
        );
        $("#cmHead")
          .find(".env")
          .text("[" + env + "]");
        $("#cmHead")
          .find(".user")
          .text("[" + user + "]");
      }
      window.scrollTo(0, document.body.scrollHeight);
      clearInput($("#cmdInput"));
      setInputHeader($("#cmdDiv"), env, user);

      $("#cmdInput").focus();
    }
  });
  $("#cmdInput").on("keyup", function (event) {
    if (event.key === "ArrowUp") {
      // 执行相应的操作
      var lastCmd = getLastCmd(-1);
      console.log(lastCmd);
      if (lastCmd !== "") {
        $("#cmdInput").val(lastCmd);
      }
    }
    if (event.key === "ArrowDown") {
      // 执行相应的操作
      var lastCmd = getLastCmd(1);
      console.log(lastCmd);
      if (lastCmd !== "") {
        $("#cmdInput").val(lastCmd);
      }
    }
  });
});

setTimeout(function () {
  setInputHeader($("#cmdDiv"), "/usr/admin", "admin");
}, 100);
