let baseURL = process.env.NODE_ENV === "development" ? "api/" : "/";
let instance = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  responseType: "json",
  validateStatus(status) {
    return status === 200;
  }
});
// 拦截请求
instance.interceptors.request.use(
  (config) => {
    // let token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = 'Bearer ' + token;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    if (res.config.url.indexOf("webrtc")) {
      return res;
    }
    if (res.status === 200 && !res.data.success) {
      vant.Notify(res.data.msg || "调用失败！");
    }
    return res;
  },
  (error) => {
    let errorMessage = "错误，请联系管理员！";
    if (error.response) {
      errorMessage = error.response.data.error ? error.response.data.error.message : errorMessage;
      switch (error.response.status) {
        case 404:
          vant.Notify({
            message: "很抱歉，资源未找到",
            duration: 4000
          });
          break;
        case 403:
        case 401:
          vant.Notify({
            message: errorMessage,
            duration: 4000
          });
          break;
        default:
          vant.Notify({
            message: errorMessage,
            duration: 4000
          });
          break;
      }
      return;
    }
    vant.Notify({
      message: errorMessage,
      duration: 4000
    });
    return Promise.reject(error);
  }
);
const request = {
  post(url, params = {}, custom = true) {
    if (custom) {
      url = url;
    }
    return instance.post(url, params, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  get(url, params) {
    let _params;
    let _paramsarr = [];
    if (Object.is(params, undefined)) {
      _params = "";
    } else {
      for (let key in params) {
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _paramsarr.push(`${key}=${params[key]}`);
        }
      }
      _paramsarr.length === 0 ? (_params = "") : (_params = "?" + _paramsarr.join("&"));
    }
    return instance.get(`${url}${_params}`);
  }
};
export default request;
