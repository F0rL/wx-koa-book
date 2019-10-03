import { Base64 } from 'js-base64'
Page({
  onGetToken(){
    wx.login({
      success: (res) => {
        if(res.code){
          wx.request({
            url: 'http://localhost:3000/v1/token',
            method: 'POST',
            data: {
              account: res.code,
              type: 100
            },
            success: res => {
              console.log(res)
              const code = res.statusCode.toString()
              if(code.startsWith('2')){
                wx.setStorageSync('token', res.data.token)
              }
            }
          })
        }
      }
    })
  },
  onVerifyToken(){
    wx.request({
      url: 'http://localhost:3000/v1/token/verify',
      method: 'POST',
      data: {
        //token: wx.getStorageSync('token')
        token: '213sfdsfgf'
      },
      success: res=>{
        console.log(res)
      }
    })
  },
  onGetLatest(){
    wx.request({
      url: 'http://localhost:3000/v1/classic/lastest',
      method: 'GET',
      success: res=>{
        console.log(res)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },
  _encode(){
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token+':')
    // Authorization: Basic base64(account: password)
    return 'Basic '+ base64
  },
  onLike(){
    wx.request({
      url: 'http://localhost:3000/v1/like',
      method: 'POST',
      header: {
        Authorization: this._encode()
      },
      data: {
        art_id: 1,
        type: 100
      },
      success: res=>{
        console.log(res)
      }
    })
  },
  disLike(){
    wx.request({
      url: 'http://localhost:3000/v1/like/cancel',
      method: 'POST',
      header: {
        Authorization: this._encode()
      },
      data: {
        art_id: 1,
        type: 100
      },
      success: res=>{
        console.log(res.data)
      }
    })
  },
  onGetNext(){
    wx.request({
      url: 'http://localhost:3000/v1/classic/6/next',
      method: 'GET',
      header: {
        Authorization: this._encode()
      },
      success: res=>{
        console.log(res.data)
      }
    })
  },
  onGetPrevious(){
    wx.request({
      url: 'http://localhost:3000/v1/classic/6/previous',
      method: 'GET',
      header: {
        Authorization: this._encode()
      },
      success: res=>{
        console.log(res.data)
      }
    })
  }
})