// pages/food/food.ts
/*引入模块*/
var productData = require('../../utils/productData.js');
var http=require('../../utils/http');
console.log(productData);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    location:"北京",  //起始位置
    productType: productData,
    list :[], //列表数据
    num:1,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('onshow',app);
    // //请求数据-------------
    // console.log(app.globalData.cityName)
    //---------
    //获取本地存储----------------------------------------
    var cityname=wx.getStorageSync('cityName');
    console.log('onshow切换页面',cityname);
    if(cityname){
      this.setData({
        location:cityname
      })

      wx.request({
        url: 'http://iwenwiki.com:3002/api/foods/list',
        data:{
          city:cityname,
          page: 1
        },
        success:res=>{
          console.log(res.data);
          if(res.data.status==200){
            this.setData({
              list: res.data.data.result
            })
          }else{
            console.log('请求无数据');
            //清空listArr
            this.setData({
              listArr: []
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onLoad:function(options) {
    console.log("下拉到底部 加载更多数据");
    console.log(options);
      http("get","/api/foods/list",  //  /api/foods/list
      {
        city:this.data.location,
        page:1,
      },"数据记载中",(res)=>{ //成功函数
        console.log(res.data.result); 
        this.setData({
           list:this.data.list.concat(res.data.result)
        })
      },function(error){
        console.log(error);
      })

    /*
    //进入当前页面去获取当前列表数据
    wx.request({
      url: 'http://iwenwiki.com:3002/api/foods/list',
      data:{
        city:this.data.location,
        page:this.data.num,
      },
      success:res=>{
        console.log(res.data);
        if(res.data.statu=200){
          console.log(res.data.data.result);
          this.setData({
            list:res.data.data.result,
            isShow:true,
          })
        }else{
          console.log('无数据');
          this.setData({
            isShow:false,
          })
        }
      }
    })
    */
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  
/*
  getMore:function(){
    //this.data.num++;
    console.log('请求数据页面' + this.data.num);
    wx.request({
      url: 'http://iwenwiki.com:3002/api/foods/list',
      data:{
        city:this.data.location,
        page:this.data.num
      },
      success:res=>{
        if(res.data.statu==200){
          this.setData({
            list:res.data.data.result
          })
        }else{
          //否则说明接口木有数据
          console.log("没有更多数据");
          this.setData({
              isShow:false,
             moreInfo:"我是有底线的-----",
          })
        }
      }
    })
  },

  */

  onUnload:function(){
    console.log('下拉刷新 需要配置json文件 开启下拉刷新')
  },


  onShareAppMessage:function(){

  },
/**
   * 页面上拉触底事件的处理函数
   */

 onReachBottom: function () {
  console.log('下拉到页面底部，加载更多数据');
    this.data.num++; 
    console.log('请求下一个数据', this.data.num)
   //下拉加载下一页面数据 num++ 老数据+新数据
   http("get","/api/foods/list",  //  /api/foods/list
   {
     city:this.data.location,
     page:this.data.num,
   },"数据记载中",(res)=>{ //成功函数
     console.log(res.data.result); 
     this.setData({
        list:this.data.list.concat(res.data.result)
     })
   },function(error){
     console.log(error);
   })
   
  },
  /*
  console.log('下拉到页面底部，加载更多数据');
  //当前的数据 页码++ 
  this.data.num++;
  console.log('请求下一个数据', this.data.num)

  //页面滚动到底部的时候 加载更多数据-----------------------
  //1.变量控制当前的第几次下拉--2.请求对应的页码接口---3.数据：老数据+新数据
  wx.request({
    url: 'http://iwenwiki.com:3002/api/foods/list',
    data: {
      city:this.data.location,
      page: this.data.num
    },
    success:res=>{
      console.log('加载更多的新数据', res.data)
      // console.log('加载更多的新数据', res.data.data.result);
      if(res.data.status==200){
          this.setData({
            listArr: this.data.listArr.concat(res.data.data.result)
          })
      }else{
        //没有数据了 
        this.setData({
          msg:'我是有底线的，没有更多数据'
        })
      }
    }

  })

  */
//点击产品分类，进入特定的产品框
productType:function(e){
  wx.navigateTo({
    url: '../productType/productType?itemId=' +e.currentTarget.setData.mark ,
  })
},

//点击进入详情
productDatail:function(e){
  console.log(e.currentTarget.dataset.id);
  wx.navigateTo({
    url: '../productDetail/productDetail?itemId' + e.currentTarget.dataset.id,
  })
},


//点击列表信息-进入详情
productDatail:function(e){
  console.log(e.currentTarget.dataset.id);
  wx.navigateTo({
    url: '../productDetail/productDetail?itemId=' + e.currentTarget.dataset.id,
  })
},



  onReady:function(){

  }
  


})