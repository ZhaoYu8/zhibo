let instance = axios.create({
  baseURL: 'api/',
  timeout: 15000,
  responseType: 'json',
  validateStatus(status) {
    return status === 200;
  },
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
  (response) => {
    if (response.status === 200 && response.data.error) {
      this.$notify('错误');
    }
    return response;
  },
  (error) => {
    let errorMessage = '错误，请联系管理员！';
    if (error.response) {
      errorMessage = error.response.data.error ? error.response.data.error.message : errorMessage;
      switch (error.response.status) {
        case 404:
          this.$notify({
            message: '很抱歉，资源未找到',
            duration: 4000,
          });
          break;
        case 403:
        case 401:
          this.$notify({
            message: errorMessage,
            duration: 4000,
          });
          break;
        default:
          this.$notify({
            message: errorMessage,
            duration: 4000,
          });
          break;
      }
      return;
    }
    this.$notify({
      message: errorMessage,
      duration: 4000,
    });
    return Promise.reject(error);
  }
);
const request = {
  post(url, params = {}) {
    return instance.post(url, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  get(url, params) {
    let _params;
    let _paramsarr = [];
    if (Object.is(params, undefined)) {
      _params = '';
    } else {
      for (let key in params) {
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _paramsarr.push(`${key}=${params[key]}`);
        }
      }
      _paramsarr.length === 0 ? (_params = '') : (_params = '?' + _paramsarr.join('&'));
    }
    return instance.get(`${url}${_params}`);
  },
};
export default request;
