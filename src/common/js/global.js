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
  }
};
export default obj;
