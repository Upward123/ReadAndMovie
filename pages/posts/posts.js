// 只能用相对路径
var postsData=require("../../data/posts-data.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log("onLoad");
    // 下面的数据被单独定义在了 /data/posts-data.js文件中
        // var posts_content = [{
        //     date: "Nov 20 2016",
        //     title: "正是虾肥蟹壮时",
        //     post_img: "/image-posts/crab.png",
        //     avatar_img: "/image-posts/4.png",
        //     content: "我们常说的大闸蟹，双螯处有如墨绒毛团，其余六爪呈金黄色，腿毛稀疏，挺拔有力，配上曲爪弯钩，看起来攻击力十足。其实蟹是否好吃，分辨起来甚是简单。好的大闸蟹养殖区，选择在水库上游敞水区域或者河流入水口的两侧一带，因为这一区域避开了主河道，水域开阔、水质良好没污染。",
        //     news_img: "/image-posts/chat1.png",
        //     star_img: "/image-posts/chat.png",
        //     news_num: "92",
        //     star_num: "62"
        //   },
        //   {
        //     date: "Sep 25 2016",
        //     title: "比利·林恩的中场战事",
        //     post_img: "/image-posts/bl.png",
        //     avatar_img: "/image-posts/2.png",
        //     content: "该片讲述了在伊拉克战争中的美国士兵比利·林恩与战友战胜归来并被誉为美国英雄，在一场橄榄球公开赛的中场表演过程中，揭露这群士兵在战场上真实经历的故事。",
        //     news_img: "/image-posts/chat1.png",
        //     star_img: "/image-posts/chat.png",
        //     news_num: "292",
        //     star_num: "112"
        //   },
        //   {
        //     date: "Mar 20 2019",
        //     title: "比悲伤更悲伤的故事",
        //     post_img: "/image-posts/sorrow.jpg",
        //     avatar_img: "/image-posts/sorrow_avator.jpg",
        //     content: "唱片制作人张哲凯（刘以豪饰）和王牌作词人宋媛媛（陈意涵饰）相依为命，两人自幼身世坎坷只有彼此为伴，他们是亲人、是朋友，也彷佛是命中注定的另一半。父亲罹患遗传重症而被母亲抛弃的哲凯，深怕自己随时会发病不久人世，始终没有跨出友谊的界线对媛媛展露爱意。",
        //     news_img: "/image-posts/chat1.png",
        //     star_img: "/image-posts/chat.png",
        //     news_num: "111",
        //     star_num: "341"
        //   }
        // ];
     
    // wx.clearStorage();
  },

  // 从post-detail.js文件中点返回键回到父级页面posts.js文件时，会执行onshow方法，但不会执行onLoad方法
  onShow:function(){
    // 为了让浏览数，在从post-detail.js文件中点返回键回到父级页面posts.js文件时，也发生变化
    var see = wx.getStorageSync("see");
    var posts_keys = wx.getStorageSync("posts_keys");
    if (see) {
      this.setData({
        posts_key: posts_keys
      })
    }
    else {
      this.setData({
        posts_key: postsData.postList
      })
    }
  },

  // onImage:function(event){
  //   var postId = event.currentTarget.dataset.postid;
  //   wx.navigateTo({
  //     url: 'posts-detail/posts-detail?id=' + postId,
  //   })
  // },


  // 点击轮播图上的图片实现动态加载详情页面
  onSwiper: function (event) {
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'posts-detail/posts-detail?id=' + postId,
    })
  },

  // 点击内容上的图片实现动态加载详情页面
  onTap:function(event){
    // 得到posts.wxml文件中定义的自定义属性data-postid的值
    var postId=event.currentTarget.dataset.postid;
    // console.log(postId);
    wx.navigateTo({
      url: 'posts-detail/posts-detail?id='+postId,
    })
  },

  // 实现菜单分享功能
  onShareAppMessage: function (res) {
    // if(res.from==="button"){
    //   console.log("成功")
    // }
    return {
      title: "来跟我一起看看这个优秀的小程序！",
      path: "/pages/posts/posts"
    }
  }
})