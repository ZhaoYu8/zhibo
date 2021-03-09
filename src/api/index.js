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
    ".AspNetCore.yiyuanmaidian=CfDJ8G41fqGd6VhLsxKEHimI3Bnh5vlxdvX5BZXROQZeLksnGSu1IOhG4d0nbk079O-3fIOzMZLRMk1TwF3S1TrRGOYXsaA_cDxXr4F0PXOUYrn-m_P9bTDqfdwP556shGqtSCeWiqgiEJHO6exRmYWj4mB-l1i4A447b7tFkyMoDBocjEsd3ejw78Gh0X4uQ3r43zgL2inxokZ3-QE35kFtNiuF9EMdO5r-GHV3TltoV2fBtvjvDGPhWPw01Yc9JlBe9y16WoOa7lU8eBsvvdvRCDNGkvAzMZux07tFfwShiKrnanqCv2PKKTDnhZKJASDXnW6Bo4aQab-C4VtbBcJXupKla5suyVjO3yGH36UnS3LD";
} else {
  document.cookie = "";
}
// 拦截请求
instance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    token = token != "null" ? token : "px1xz6517e1bc9kjgddtiv64nd7yb18b";
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
