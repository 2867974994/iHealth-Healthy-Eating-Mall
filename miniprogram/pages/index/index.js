// pages/index/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0, //
    list:[]  //用来存放首页信息

  },
  //1.当轮播自动修改的时候触发
  swiperChange:function(e){
    console.log(e,'轮播触发');
    //e.detail.current swiper改变的是偶 获取当前选中的下表
    this.setData({
      currentIndex:e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    //1.进入页面--请求轮播数据--获取小程序api-网络
    //这里应该是添加后台的ip地址
    //这一段几乎没什么用，因为我没有使用它给的接口  这里知只是为了让控制台进行输出
    wx.request({
      
      url: 'http://iwenwiki.com:3002/api/banner',
      success:function(res){
        console.log(res.data)
        
      }
    }),

    //添加数据拼命记载中 显得高端（doge）
    wx.showLoading({
      title: '数据拼命加载中',
    })
    //进入页面后获取下面的推荐信息 列表信息
       wx.request({
       url: 'http://iwenwiki.com:3002/api/indexlist',
       success:res=>{
        //将上面的装逼加载隐藏 
        wx.hideLoading()
        wx.showToast({
          //完成后的弹窗  1.5s自动关闭
          title: '数据加载完毕',
        })

          if(res.data.status==200){
            console.log(res.data);
            this.setData({
              list:res.data.data
            })
          }

        //加载完毕--提示框信息--1.5s 自动隐藏
    

           
         },
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})