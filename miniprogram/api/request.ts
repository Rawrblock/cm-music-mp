const baseUrl = 'https://cm-music-1876979-1310787064.ap-shanghai.run.tcloudbase.com'

export const get = (uri: string) => {
    wx.showLoading({
        title: "加载中"
    })
    // 返回一个 promise对象 resolve:成功，reject:失败
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + uri,
            method: 'GET',
            // 成功时
            success: (res) => {
                resolve(res.data)
            },
            // 失败时
            fail: reject,
            // 成功失败都会执行
            complete: () => {
                wx.hideLoading()
            }
        })
    })
    
}