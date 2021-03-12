export default {
  components: {
    game: () => import("@/components/game"),
    svgs: () => import("@/components/svg")
  },
  data() {
    return {
      options: {},
      status: {},
      coinId: 0,
      ointmentList: {
        current: {},
        queue: []
      },
      webrtc: "",
      machineSetInterVal: "" // 机器状态的 setInterVal 的缓存
    };
  },
  beforeDestroy() {
    clearInterval(this.machineSetInterVal);
  },
  deactivated() {
    clearInterval(this.machineSetInterVal);
  },
  computed: {
    user() {
      return this.$store.state.user || {};
    },
    gameType() {
      return this.status.statusId !== 1 && !this.ointmentList.queue.find((r) => Number(r.userId) === Number(this.user.user.userId));
    },
    // 只有状态不是1的时候 并且 预约队列里面没有我
    bookingNumber() {
      return this.ointmentList.queue.findIndex((r) => Number(r.userId) === Number(this.user.user.userId)) + 1;
    },
    existence() {
      let current = this.ointmentList.current;
      return current && Number(current.userId) === Number(this.user.user.userId);
    }
  },
  created() {},
  methods: {
    // 查询当前机器状态
    async machineStatus() {
      let res = await this.$get("coin/queryStatus", {
        coinId: this.coinId
      });
      // 查询 排队列表
      let { data } = await this.$get("coin/AppointmentList", {
        coinId: this.coinId
      });
      this.ointmentList = data.result[this.coinId];
      this.status = res.data.result;
      // 成功了之后回调 应为二个游戏 回调逻辑不一样
      if (this.machineStatusCallBack) this.machineStatusCallBack();
    },
    async booking() {
      await this.$get("/coin/Appointment", {
        coinId: this.coinId
      });
      this.$toast("参加排队成功");
      this.machineStatus();
    }
  },
  activated() {
    this.options = this.$route.query;
    this.coinId = parseInt(this.options.coinId);
    this.machineStatus();
    this.machineSetInterVal = setInterval(() => {
      this.machineStatus();
    }, 3000);
  }
};
