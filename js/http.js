

//Get
function Get(url,callback,errorCallback,completeCallback){
    let headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*"
    };
    $.ajax({
        url: url,
        method: "GET",
        headers: headers,
        success: function(res) {
            if(callback && typeof callback === "function")callback(res);
        },
        error: function(xhr, status, error) {
            if (xhr.status === 404) {
                // 404 错误处理逻辑
                console.log('资源不存在');
            } else {
                // 其他错误处理逻辑
            }
            if(errorCallback && typeof errorCallback === "function")errorCallback(error);
        },
        complete:function(){
            if(completeCallback && typeof completeCallback === "function")completeCallback();
            console.log("complete");
        },
    });
}



//Post
function Post(url,data,callback,errorCallback){
    $.ajax({
        url: url,
        method: "POST",
        data: data,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*"
        },
        success: function(res) {
            if(callback && typeof callback === "function")callback(res);
        },
        error: function(error) {
            if(errorCallback && typeof errorCallback === "function")errorCallback(error);
        }
    });
}














