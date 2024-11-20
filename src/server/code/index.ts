/*
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2021-05-12 20:47:22
 * @LastAuthor: lizlong
 * @lastTime: 2021-05-12 20:47:22
 */
const code = {
  success: 200, //请求成功
  timeout: 408, //请求超时
  fail: -200, //请求失败
  no_data: 204, //未查询到数据
  land_timeout: 401, //用户登陆超时
  land_abort: 304, //用户或密码名错误
};

export default code;
