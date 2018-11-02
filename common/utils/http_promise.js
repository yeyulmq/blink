import Config from '../comScript.js'

class Http {
  request({url,data={},method="GET"}){
    return new Promise((resolve,reject) => {
      this._request(url,resolve,reject,data,method)
    })
  }
  _request(url,resolve,reject,data,method) {
    wx.request({
      url: Config.BASE_URL + url,
      header: {
        appkey: Config.APPKEY,
      },
      method: method,
      data: data,
      success: (res) => {
        let code = res.statusCode.toString();
        if (code.startsWith("2")) {
          resolve(res.data)
        } else {
          reject()
          let error_code = res.data.error_code;
          this._showError(error_code)
        }
      },
      fail: (err) => {
        reject()
        this._showError(1)
      }
    })
  }

  _showError(error_code) {
    const tips = {
      1: '抱歉，出现了一个错误',
      1005: 'appkey无效，请前往www.7yue.pro申请',
      3000: '期刊不存在'
    }
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export { Http }