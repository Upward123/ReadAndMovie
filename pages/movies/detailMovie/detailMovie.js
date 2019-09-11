// pages/movies/detailMovie/detailMovie.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.movieId;
    console.log(movieId);
    var detailUrl = 'http://douban.uieee.com/v2/movie/subject/'+movieId;
    // var detailUrl = 'https://easy-mock.com/mock/5cac06574790386b351fdaef/example/detailMovie';
    util.http(detailUrl,this.processData);
  },

  processData:function(detailMovie){
    var movies={};
    var summary = detailMovie.summary;
    if (summary.length > 100) {
      summary = summary.substring(0, 100) + "...";
    }
    var img = "";
    var average = "";
    var stars="";
    var director="";
    if(detailMovie!=null){
      if (detailMovie.images != null) {
        img = detailMovie.images.large;
      }
      if (detailMovie.rating != null) {
        average = detailMovie.rating.average;
        stars = util.scoreStar(detailMovie.rating.stars);
      }
      if (detailMovie.directors != null) {
        director = detailMovie.directors[0].name;
      }
      movies = {
        headImg: img,
        sideImg: img,
        imgTitle: detailMovie.title,
        country: detailMovie.countries[0],
        year: detailMovie.year,
        like: detailMovie.collect_count,
        comment: detailMovie.comments_count,
        firstTitle: detailMovie.original_title,
        average: average,
        stars: stars,
        director: director,
        actor: util.processActor(detailMovie.casts),
        type: util.processType(detailMovie.genres),
        summary: summary,
        actorShow: util.actorShow(detailMovie.casts)
      }
    }
    else{
      movies={};
    }
    this.setData({
      movies:movies
    })
    // console.log(this.data.movies);
  },

  // 查看大图
  onPreviewImg:function(event){
    // console.log(event);
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      current:src,
      urls: [src]
    })
  }
})