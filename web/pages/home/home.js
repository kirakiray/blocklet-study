Page(async ({ load }) => {
  const runcmd = await load("../../util/runcmd.js");

  return {
    data: {
      val: "asdasd",
      nodeVersion: "Loading",
      blockletVersion: "Loading",
    },
    ready() {
      runcmd("node --version")
        .then((e) => {
          this.nodeVersion = e;
        })
        .catch((err) => {
          this.nodeVersion = "未安装 " + err;
        });
      runcmd("blocklet --version")
        .then((e) => {
          this.blockletVersion = e;
        })
        .catch((err) => {
          this.blockletVersion = "未安装 " + err;
        });
    },
  };
});
