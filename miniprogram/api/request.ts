import { getToken, removeToken, setToken } from "../utils/auth"

const baseUrl = 'https://cm-music-1876979-1310787064.ap-shanghai.run.tcloudbase.com'

export const get = (uri: string) => {
    wx.showLoading({
        title: "加载中"
    })
    // 返回一个 promise对象 resolve:成功，reject:失败
    return new Promise<any>((resolve, reject) => {
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

export const post = (uri: string, data: object) => {
    // wx.showLoading({
    //     title: "加载中"
    // })
    return new Promise<any>((resolve, reject) => {
        wx.request({
            url: baseUrl + uri,
            method: 'POST',
            data,
            // 成功时
            success: (res) => {
                if(res.statusCode === 401) {
                    removeToken()
                    const currentPages = getCurrentPages();
                    const currentRoute = currentPages[currentPages.length - 1].route;
                    if(currentRoute !== 'pages/login/index') {
                        wx.navigateTo({
                            url: `/pages/login/index`
                        })
                    }
                    wx.showToast({
                        title: '用户未登录'
                    })
                }

                _handlerToken(res.header)

                resolve(res)
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

const _handlerToken = (header: any) => {
    const token = header['Authorization'] || null;
    if(token && getToken() !== token) {
        setToken(token)
        wx.navigateBack()
    }
}