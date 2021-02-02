let obj = {
  throttle(fn, delay = 200) {
    let timer = false;
    return () => {
      if (timer) return;
      timer = setTimeout(() => {
        fn.apply(this);
        timer = false; // 置空操作
      }, delay);
    };
  },
  get(url, data) {
    return axios.get("https://www.worksp.cn/platform-framework/api/" + url, data);
  },
  post(url, data) {
    return axios.post("https://www.worksp.cn/platform-framework/api/" + url, data);
  }
};
export default obj;
