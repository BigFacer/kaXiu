//index.js
const app = getApp()
var QQMapWX = require('../../libs/qqmap-wx-jssdk')
var qqmapsdk;

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    latitude: '',
    longitude: '',
    address:'',
    takeSession: false,
    requestResult: ''
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    qqmapsdk = new QQMapWX({
      key: 'FD5BZ-AZXK4-LIDUV-XMUJI-HPLL3-CWFAU'
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    });
    //获取地理位置
    wx.getLocation({
      type: 'wgs84',
      success: (res)=> {
         this.setData({
            latitude: res.latitude,
            longitude: res.longitude
         });
         this.getLocationName(res)
        // console.log(res)
      }
    });
    //获取天气
    // wx.request({
    //   url: 'http://v3.wufazhuce.com:8000/api/channel/one/0/上海',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success (res) {
    //     console.log(res.data)
    //   }
    // })
  
  },
  onShow: function() {
    qqmapsdk.search({
      keyword: '酒店',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {
           console.log(res)
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        console.log('[云函数] [login] user openid: ', res.result)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  getLocationName: function(e) {
    var that = this
    qqmapsdk.reverseGeocoder({
      location: { 
       latitude: e.latitude,
       longitude: e.longitude
      },
       get_poi: 1,    
       success: function(res) {
         console.log(res)
         that.setData({
          address: res.result.address_component.city+res.result.address_component.district
          });
               console.log(res);           
       },
       fail: function(res) {
             console.log(res);
       },
       complete: function(res) {
               console.log(res)
       }
 })
  }

})
