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
    if (res.status === 200 && !res.data.success) {
      vant.Notify(res.data.msg || "调用失败！");
    }
    return res;
  },
  (error) => {
    let errorMessage = "调用失败！";
    if (error.response.status) {
      errorMessage = error.response.data ? error.response.data.error.message : error.response.status + errorMessage;
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
