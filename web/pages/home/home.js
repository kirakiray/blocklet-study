Page(async ({ load }) => {
  const runcmd = await load("../../util/runcmd.js");

  return {
    data: {
      val: "asdasd",
      nodeVersion: "",
      nodejsChecking: false,
      blockletVersion: "",
      blockletChecking: false,
      step: 0,
    },
    proto: {
      // 检查本地Node环境
      checkNodeJS() {
        this.nodejsChecking = true;
        return runcmd("node --version")
          .then((e) => {
            this.nodeVersion = e;
          })
          .catch((err) => {
            console.error(err);
            this.nodeVersion = false;
          })
          .finally(() => {
            this.nodejsChecking = false;
          });
      },
      checkBlocklet() {
        this.blockletChecking = true;
        return runcmd("blocklet --version")
          .then((e) => {
            this.blockletVersion = e;
          })
          .catch((err) => {
            console.error(err);
            this.blockletVersion = false;
          })
          .finally(() => {
            this.blockletChecking = false;
          });
      },
      clickNext(stepId) {
        switch (stepId) {
          case 0:
            if (this.nodeVersion === false) {
              this.step = 1;
            } else {
              this.step = 2;
            }
            break;
          case 1:
            this.checkNodeJS().then(() => {
              if (this.nodeVersion) {
                this.step = 2;
              }
            });
            break;
        }
      },
      openNodejs() {
        mainAPI.shell.openExternal("https://nodejs.org/en/");
      },
    },
    ready() {
      setTimeout(() => {
        this.checkNodeJS();
        this.checkBlocklet();
      }, 1000);
    },
  };
});
