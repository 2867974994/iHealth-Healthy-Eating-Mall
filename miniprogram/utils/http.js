/**
 * 网络请求的封装方法
 * 参数1：method（string）请求类型
 * 参数2：url（String） 请求的url地址
 * 参数3：params(json)请求携带的参数
 * 参数4：message(string)  loading=boolean 信息框弹窗内容
 * 参数5：success成功函数
 * 参数6：fail失败函数
 */
function http(method,url,params,message,success,fail){
  if(message!=''){
    wx.showLoading({
      title: 'message',
    })
  }
  //请求
  wx.request({
    //写一个请求的域名 修改网址时，可以进行统一修改
    url: 'http://iwenwiki.com:3002' + url,
    method:method,
    data:params,
    success:res=>{
      if(res.data.status==200){
        success(res.data);
      }else{
        fail(res.data);
      }
    },
    fail:function(res){
      fail();
    },
    complete:function(res){
      if(message!=''){
        wx.hideLoading();
    }
  },
})
}

//暴露出去
module.exports=http;//{http:http}
