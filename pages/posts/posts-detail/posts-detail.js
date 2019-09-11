// pages/posts/posts-detail/posts-detail.js
// 引入posts-data.js中的数据
var postsData = require("../../../data/posts-data.js");
var app=getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 得到从posts.js传过来的id的值
    var postId = options.id;
    this.setData({
      currentPostId: postId
    })
    // console.log(postId);
    // 找到与postId序号对应的那组数据，并赋值给detailData
    var detailDatas = postsData.postList[postId];
    // 把detailData中的数据写入此页面的data:{.....}中，因为wxml页面访问数据是去data:{.....}中找
    this.setData({
      detailData: detailDatas
    });


    // 我自己写的（改了好久......55555555555）
    // wx.clearStorage();
    var postsCollected = wx.getStorageSync('posts_collected');
    // console.log(postsCollected);
    // if里面写postsCollected的话，会报错；
    // 因为如果序号为0的文章读过了，而序号为1的文章没读过，那么postsCollected还是为真，
    // 但是此时点击序号为1的文章，那么postsCollected[1]为空，赋值给postCollected，postCollected也为空；
    // 则会说this.setData里面的collected没有定义
    if (postsCollected[postId]) {
      var postCollected = postsCollected[postId];
      // console.log(postsCollected[postId]);
      this.setData({
        collected: postCollected
      })
    } 
    else if (postsCollected && !postsCollected[postId]){
      // 如果写这句的话，相当于每次点开一篇没读过的文章时，都把postsCollected变成了空的，那之前收藏的记录就没有了
      // var postsCollected = {};
      postsCollected[postId] = false;
      // console.log(postsCollected[postId]);
      wx.setStorageSync('posts_collected', postsCollected);
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    }
    // postsCollected不存在时，需要写var postsCollected = {};
    else {
      postsCollected = {};
      postsCollected[postId] = false;
      // console.log(postsCollected[postId]);
      wx.setStorageSync('posts_collected', postsCollected);
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    }

    if(app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId==postId){
      this.setData({
        isPlayingMusic:true
      })
    }
    this.setMusicMonitor();

    this.onChangeSeeNum();
  },

  // 点击收藏按钮，改变图片，并且显示toast反馈给用户
  onCollectTap: function(event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    // console.log(postCollected);
    // console.log(this.data.currentPostId);
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    // wx.setStorageSync('posts_collected', postsCollected);
    // this.setData({
    //   collected: postCollected
    // });
    // this.onShowModal(postCollected, postsCollected);
    this.onShowToast(postCollected, postsCollected);
  },
    // 别人写的
        // 在第一次点进detail界面（所有文章记录均为未读时，postsCollected为空）时，不会报错；
        // 但是当读过任意一篇文章后，再去点击没读过的文章，就会报错，除非这时就点击收藏按钮（点一次以上都可以），之            后再点进来这篇文章才不会报错；如果不收藏，就会一直报错
        // wx.clearStorage();
        //   var postsCollected = wx.getStorageSync('posts_Collected')
        //   if (postsCollected) {
        //     var postCollected = postsCollected[postId]
        //     this.setData({
        //       collected: postCollected
        //     })
        //   }
        //   else {
        //     var postsCollected = {}
        //     postsCollected[postId] = false;
        //     wx.setStorageSync('posts_Collected', postsCollected);
        //   }
        // },
        // onCollectTap: function (event) {
        //   var postsCollected = wx.getStorageSync('posts_Collected');
        //   var postCollected = postsCollected[this.data.currentPostId];
        //   console.log(postCollected);
        //   console.log(this.data.currentPostId);
        //   //收藏变成未收藏，未收藏变成收藏
        //   postCollected = !postCollected;
        //   console.log(postCollected);
        //   postsCollected[this.data.currentPostId] = postCollected;
        //   //更新文章是否收藏的缓存值
        //   wx.setStorageSync('posts_Collected', postsCollected);
        //   //更新数据绑定变量，从而实现切换图片
        //   this.setData({
        //     collected: postCollected
        //   })
        // }
  
  // 与用户交互时显示模态弹窗
  onShowModal: function (postCollected, postsCollected){
    var that =this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? '收藏该文章?' :"取消收藏该文章?",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success:function(res){
        if (res.confirm){
          wx.setStorageSync('posts_collected', postsCollected);
          that.setData({
            collected: postCollected
          });
        }
      }
    })
  },

  // 与用户交互时显示toast消息
  onShowToast: function (postCollected, postsCollected){
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected: postCollected
    });
    wx.showToast({
      title: postCollected?'收藏成功':"取消收藏",
      duration: 1000,
    })
  },

  // 实现菜单分享功能
  onShareAppMessage:function(res){
    // if(res.from==="button"){
    //   console.log("成功")
    // }
    return{
      title:"来跟我一起看看这篇优秀的文章！",
      path:"/pages/posts/posts-detail/posts-detail"
    }
  },
  
  // 实现页面按钮分享功能
  onShareTap:function(event){
    var list=[
      "分享给微信好友",
      "分享到朋友圈",
      "分享给qq好友",
      "分享到qq空间",
      "分享到微博",
      "分享到博客"
    ];
    wx.showActionSheet({
      // 数组中最多6个元素
      itemList: list,
      itemColor:"#405f80",
      success:function(res){
        wx.showModal({
          title: '用户'+list[res.tapIndex],
          content: '微信小程序不能以按钮形式' + list[res.tapIndex]+",是否使用菜单分享？",
        })
      }
    })
  },

  // 点击音乐图标，实现音乐播放
  onMusicTap:function(event){
    if(this.data.isPlayingMusic==false){
      wx.playBackgroundAudio({
        dataUrl: this.data.detailData.music.url,
        title: this.data.detailData.music.title,
        coverImgUrl: this.data.detailData.music.coverImg,
      });
      this.setData({
        isPlayingMusic:true
      })
    }
   else{
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
   }
  },

  // 监听音乐播放/暂停的方法，使得点击总控开关时，界面变化同步
  setMusicMonitor:function(){
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    })

    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })

    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })
  },

  // 使浏览量每点击一次增加1
  onChangeSeeNum: function () {
    var allPostsContent = postsData.postList;
    var postId = this.data.currentPostId;
    var see = wx.getStorageSync("see");
    var posts_keys = wx.getStorageSync("posts_keys");
    if (see[postId]) {
      see[postId] += 1;
      wx.setStorageSync("see", see);
      // postsData.postList[postId].see_num = see[postId];
      if (posts_keys) {
        posts_keys[postId].see_num = see[postId];
        this.setData({
          posts_key: posts_keys
        })
      }
      else {
        allPostsContent[postId].see_num = see[postId];
        this.setData({
          posts_key: allPostsContent
        })
      }
    }
    else if (see && !see[postId]) {
      // see={};
      see[postId] = allPostsContent[postId].see_num;
      see[postId] += 1;
      wx.setStorageSync("see", see);
      // postsData.postList[postId].see_num = see[postId];
      if (posts_keys) {
        posts_keys[postId].see_num = see[postId];
        this.setData({
          posts_key: posts_keys
        })
      }
      else {
        allPostsContent[postId].see_num = see[postId];
        this.setData({
          posts_key: allPostsContent
        })
      }
    }
    else {
      see = {};
      see[postId] = allPostsContent[postId].see_num;
      see[postId] += 1;
      wx.setStorageSync("see", see);
      // postsData.postList[postId].see_num = see[postId];
      if (posts_keys) {
        posts_keys[postId].see_num = see[postId];
        this.setData({
          posts_key: posts_keys
        })
      }
      else {
        allPostsContent[postId].see_num = see[postId];
        this.setData({
          posts_key: allPostsContent
        })
      }
    }
    wx.setStorageSync("posts_keys", this.data.posts_key);
    // 因为给allPostsContent[postId].see_num赋值为see[postId]时，postsData.postList[postId].see_num的值也一起改变了，所以要在把allPostsContent存入缓存之后再把postsData.postList[postId].see_num回复到默认值0（不知道为什么两个会一起改变，明明没有反赋值啊？？？）
    postsData.postList[postId].see_num=0;
  }
})