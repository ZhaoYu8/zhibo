let baseURL = process.env.NODE_ENV === "development" ? "api/" : "/";
let instance = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  responseType: "json",
  validateStatus(status) {
    return status === 200;
  }
});
if (process.env.NODE_ENV === "development") {
  document.cookie =
    ".AspNetCore.yiyuanmaidian=CfDJ8G41fqGd6VhLsxKEHimI3BlpfFdEcfhx1du95KP3WaBqiHsO_WO6o1AYx_cR6aUV_76PNxF2CnscaHn4HAU6eQyKXJM0LZ-W_v-0l4LupeKAwZfEvfeMVufbPqEiGxDd-WKdLXvUagZO3E4EWx5MKJNgOvwPeeZN7R2koQHWKJFTO8dH0F-JZ2llWLEgpaDuAwoFWb4k0BKgTFlDw-dxyT-cweyvdheE6vCAEwqWPj4JMvGTl8mZRpZ4QvjtBzgxjX2rbf3bBHOX1u3RvAj1djgNc0OShfP52tEAzwF2r-bShScBrCC3-H9POwU03OG6vaXDXovyaRRYo3jm3QIFwoVUtHLQhAp24IxR_2FL84IL";
} else {
  document.cookie = "";
}
// 拦截请求
instance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    token = token != "null" ? token : "5tjg4rt9cuf2tk4ukhtor7co230dmvq1";
    if (token) {
      config.headers["X-Nideshop-Token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    if (res.status === 200 && !res.config.url.includes("www.worksp.cn") && !res.data.success) {
      if (res.data.msg !== "投币失败") vant.Notify(res.data.msg || "调用失败！");
    }
    return res;
  },
  (error) => {
    // let errorMessage = "调用失败！";
    // if (error.response.status) {
    //   errorMessage = error.response.data ? error.response.data.error.message : error.response.status + errorMessage;
    // }
    // vant.Notify({
    //   message: errorMessage,
    //   duration: 4000
    // });
    return Promise.reject(error);
  }
);
const request = {
  post(url, params = {}, custom) {
    if (custom) {
      url = `https://www.worksp.cn/platform-framework/api/${url}`;
    }
    return instance.post(url, params, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  get(url, params, custom) {
    if (custom) {
      url = `https://www.worksp.cn/platform-framework/api/${url}`;
    }
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
