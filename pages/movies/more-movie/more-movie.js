// pages/movies/more-movie/more-movie.js
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    totalCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {  
    var title = options.moreTitle;

    this.setData({
      title: title
    })
    wx.setNavigationBarTitle({
      title: this.data.title,
    })

    var inTheatersUrl = 'http://douban.uieee.com/v2/movie/in_theaters';
    var comingSoonUrl = 'http://douban.uieee.com/v2/movie/coming_soon';
    var top250Url = 'http://douban.uieee.com/v2/movie/top250';

    var url="";
    switch (title) {
      case "正在热映":
        url= inTheatersUrl;
        break;
      case "即将上映":
        url= comingSoonUrl;
        break;
      case "Top250":
        url= top250Url;
        break;
    }

    this.setData({
      url:url
    })

    this.getMovieData(url);

    // var Durl = 'http://douban.uieee.com/v2/movie/subject/27202819';
    // util.http(Durl, this.processDetailData);
  },

  // processDetailData:function(data){
  //   console.log(data);
  // },

  getMovieData: function(url) {
    // var that = this;
    util.http(url, this.processData);
  },

  processData: function(movieData) {
    var movies = this.data.movies;
    for (var idx in movieData.subjects) {
      var subject = movieData.subjects[idx];
      var title = subject.title;
      if (title.length > 5) {
        title = title.substring(0, 5) + "..."
      }
      var obj = {
        image: subject.images.large,
        title: title,
        average: subject.rating.average,
        movieId: subject.id,
        stars: util.scoreStar(subject.rating.stars)
      }
      movies.push(obj);
    }
    this.setData({
      movies: movies,
      totalCount:this.data.totalCount+20
    })
    // console.log(this.data.movies);
    wx.hideNavigationBarLoading();
  },

  onReachBottom:function(){
    var url = this.data.url + "?start="+this.data.totalCount+"&count=20";
    util.http(url, this.processData);
    wx.showNavigationBarLoading();
  },

  onPullDownRefresh:function(){
    this.setData({
      movies:[],
      totalCount:0
    })
    var url = this.data.url;
    util.http(url, this.processData);
    wx.showNavigationBarLoading();
  },

  onMovieTap: function (event) {
    wx.navigateTo({
      url: '../detailMovie/detailMovie?movieId=' + event.currentTarget.dataset.movieid,
    })
  }
})