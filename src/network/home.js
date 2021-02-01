// 这里封装所有首页发送的请求


// 导入封装好的request:要注意这里需要用{}来导入！！！！因为request.js文件中不是使用default导出
import {request} from './request.js'

export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

