function scoreStar(event) {

  // stringObject.substring(start,stop)  start到stop-1之间的字符
  // substring() 方法用于提取字符串中介于两个指定下标之间的字符。

  // substring() 方法返回的子串包括 start 处的字符，但不包括 stop 处的字符。
  // 如果参数 start 与 stop 相等，那么该方法返回的就是一个空串（即长度为 0 的字符串）。如果 start 比 stop 大，那么该方法在提取子串之前会先交换这两个参数。

  // substring() 不接受负的参数。

  var num1 = Number(event.substring(0, 1));
  var num2 = Number(event.substring(1, 2));
  var arr = [];
  for (var i = 1; i <= 5; i++) {
    if (num1 >= i) {
      arr.push(1);
    } 
    else if(num1==(i-1)&&num2==5){
      arr.push(2);
    }
    else {
      arr.push(0);
    }
  }
  return arr;
}

function http(url,callback){
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'content-type': 'application/text'
    },
    success: function (res) {
      callback(res.data)
    }
  })
}

function processActor(casts){
  var str = "";
  for(var i=0;i<casts.length;i++){
    str = str + casts[i].name+"/";
  }
  var actor = str.substring(0,str.length-1);
  return actor;
}

function processType(type) {
  var str = "";
  for (var i = 0; i < type.length; i++) {
    var str = str + type[i]+"、";
  }
  var genres = str.substring(0, str.length - 1);
  return genres;
}

function actorShow(casts){
  var actorShow = [];
  for (var i = 0; i < casts.length; i++){
    var actorName=casts[i].name;
    var actorImg = "";
    if (casts[i].avatars!=null){
      actorImg = casts[i].avatars.large;
    }
    var obj={
      actorName, actorImg
    }
    actorShow.push(obj);
  }
  return actorShow;
}

// 定义一个数据的出口，别的文件才能访问此文件中的数据
module.exports = {
  scoreStar: scoreStar,
  http:http,
  processActor: processActor,
  processType: processType,
  actorShow:actorShow
  // a_key:a
}