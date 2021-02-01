import axios from 'axios'

// 因为这里可能有多个函数，所以不使用default
// 导出函数，在外面就可以调用函数；request();
export function request(config) {
    // 1、创建axios的实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })

    // 2、axios的拦截器interceptors
    /*
        拦截请求：
            interceptors.request

        拦截响应：
            interceptors.response
    */
    instance.interceptors.request.use(config => {
        // console.log(config);
        // 必须返回拦截的数据，否则发送不出去
        return config
    }, err => {
        // console.log(err);
    })

    // 响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res);

        // 同样要return拦截的数据
        // 这里返回时，只需返回拦截到的数据中的data
        return res.data
    }, err => {
        // console.log(err);
    })

    // 3、发送真正的网络请求
    return instance(config)
}