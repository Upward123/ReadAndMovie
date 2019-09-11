// pages/movies/movies.js
var util = require("../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult: {},
    moviePage: true,
    searchPage: false,
    placeHolder: "复联4、转型团伙",
    totalCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var inTheatersUrl = 'http://douban.uieee.com/v2/movie/in_theaters?start=0&count=3';
    var comingSoonUrl = 'http://douban.uieee.com/v2/movie/coming_soon?start=0&count=3';
    var top250Url = 'http://douban.uieee.com/v2/movie/top250?start=0&count=3';

    this.getMovielistData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovielistData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovielistData(top250Url, "top250", "Top250");

  },

  // 从服务器请求访问数据
  getMovielistData: function(url, settedkey, head) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/text'
      },
      success: function(res) {
        // console.log(res);
        that.processData(res.data, settedkey, head);
      }
    })
  },

  // 获取从服务器申请到的数据到本地
  processData: function(movieData, settedkey, head) {
    var movies = [];
    // 循环,遍历movieData.data.subjects。加上 if (i < 3) 相当于for(var i=0;i<3;i++),但是这样写的话在success回调函数中会报错：“i”undefined
    for (var i in movieData.subjects) {
      // if (i < 3) {
      var subject = movieData.subjects[i];
      var stars = util.scoreStar(subject.rating.stars);
      var image = subject.images.large;
      var title = subject.title;
      if (title.length > 5) {
        title = title.substring(0, 5) + "...";
      }
      var average = subject.rating.average;
      var movieId = subject.id;
      var obj = {
        image,
        title,
        average,
        movieId,
        stars
      };
      movies.push(obj);
      // }
    }

    // var obj = {};
    // key = 'name';
    // value = 'shilei';
    // obj[key] = value; //相当于obj['name'] = 'shilei';
    // //此时ajax的data数据项应改为
    // data: obj,

    var head = head;
    // 上述6行代码可更好地理解使用对象类型来进行传递（动态属性）
    var readyData = {};
    readyData[settedkey] = {
      movies: movies,
      head: head
    };
    this.setData(readyData);
    this.setData({
      totalCount: this.data.totalCount + 20
    })
    wx.hideNavigationBarLoading();
    // console.log(this.data);
    // this.setData({
    //   movies: movies
    // })
  },

  onMoreTap: function(event) {
    var moreTitle = event.currentTarget.dataset.categorytitle;
    wx.navigateTo({
      url: 'more-movie/more-movie?moreTitle=' + moreTitle,
    })
  },

  onBindFocus: function() {
    this.setData({
      moviePage: false,
      searchPage: true
    })
  },

  onCancel: function() {
    this.setData({
      moviePage: true,
      searchPage: false,
      // 本来想在点击叉叉的时候让输入的字也消失，但是没有用，，，
      placeHolder: "复联4、转型团伙"
    })
  },

  onBindConfirm: function(event) {
    var text = event.detail.value;
    // encodeURI(encodeURI(text))先编码再解码，防止向服务器提交请求时因出现乱码而报错（感觉有时候不进行这个操作也不会报错.....???）
    var url = "http://douban.uieee.com/v2/movie/search?q=" + encodeURI(encodeURI(text));
    // var url = "http://douban.uieee.com/v2/movie/search?q=" + text;
    this.setData({
      url: url
    })
    this.getMovielistData(url, "searchResult", "");
  },

  // onReachBottom: function () {
  //   var url = this.data.url + "&start=" + this.data.totalCount + "&count=20";
  //   this.getMovielistData(url, "searchResult", "");
  //   wx.showNavigationBarLoading();
  // },

  onPullDownRefresh: function() {
    this.setData({
      searchResult: {},
      totalCount: 0
    })
    var url = this.data.url;
    this.getMovielistData(url, "searchResult", "");
    wx.showNavigationBarLoading();
  },

  onMovieTap: function(event) {
    wx.navigateTo({
      url: 'detailMovie/detailMovie?movieId=' + event.currentTarget.dataset.movieid,
    })
  }
})