Page({

  // 关联下一个页面的点击事件
  onTap: function() {
    // wx.navigateTo({
    //   url: '../posts/posts',
    // });

    // wx.switchTab可以实现小程序首页不显示tabBar,而其他页面显示，wx.navigateTo和wx.redirectTo都不行（跳转不了）
    wx.switchTab({
      url: '../posts/posts',
    })
  },

  onClearTap:function(event){
    wx.clearStorage();
    wx.showToast({
      title: '清除成功',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(this.count(1000))
  },

  // 得到1到num中0的个数
  // count:function(num){
  //   console.log(Array.from({ length: num }, (v, i) => i+1));
  //   console.log(Array.from({ length: num }, (v, i) => i+1).join());
  //   console.log(Array.from({ length: num }, (v, i) => i+1).join().split("0"));
  //   return Array.from({ length: num }, (v, i) => i+1).join().split("0").length-1;
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    // if(res.from==="button"){
    //   console.log("成功")
    // }
    return {
      title: "来跟我一起看看这个优秀的小程序！",
      path: "/pages/welcome/welcome"
    }
  }
})