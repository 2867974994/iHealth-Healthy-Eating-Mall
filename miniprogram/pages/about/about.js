// pages/about/about.js
var app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShow:true,
    nickName:'', //昵称
    avataUrl:'',//头像
  },


  getUserInfo:function(e){
    console.log(e.detail.getUserInfo);
    //获取后存储本地数据
    this.setData({
      isShow:false,
      nickName:e.detail.userInfo.nickName,
      avataUrl:e.detail.userInfo.avatarUrl
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //进入页面获取全局信息
    console.log(app.globalData);
    if(app.globalData.userInfo){
      console.log('全局变量用户信息存在');
      this.setData({
        nickName:app.globalData.userInfo.nickName,
        avataUrl:app.globalData.userInfo.avataUrl,
        isShow:false,
      })
    }else{
      app.userInfoReadyCallback=res=>{
        console.log('userInfoReadyCallback 获取数据')
        this.setData({
          isShow:false,
          nickName:res.nickName,//昵称
          avataUrl:res.avataUrl,//头像       
        })
      }
    }
  },
  //点击授权信息
  getUserInfo:function(e){
    console.log(e.detail.userInfo);
    this.setData({
      isShow:false,
      nickName:e.detail.userInfo.nickName,
      avataUrl:e.detail.userInfo.avataUrl
    })
    //登录----
  },
  login:function(e){
    //获取用户头像和昵称
    this.setData({
      isShow:false,
      nickName:e.detail.userInfo.nickName,
      avataUrl:e.detail.userInfo.avataUrl
    })

    //登录--
    wx.login({
      success:res=>{
        //获取登录凭证
        console.log(res.code);
        //获取登录凭证后 网络请求--访问后台服务器接口 换成session——key
        wx.request({
          url: 'h后台地址',//后台地址http://iwenwiki.com:3302/api/getSession
          data:{
            codeId:res.code
          },
          success:result=>{
            console.log(result.data);
            var loginInfo=result.data;
            console.log('openid',result.data.openid);
            wx.setStorageSync('openid', data);
            //wx.request({
           //   url: '///login',
          //    data:{
           //     openid: result.data.openid,
          //    },
         //     success:data=>{
             //   console.log('成功登录 后台的结果');
           //   }
          //  })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})