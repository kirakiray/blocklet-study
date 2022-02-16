Page(async ({ load }) => {
  const { run: runcmd, test } = await load("../../util/cmd.js");

  return {
    data: {
      val: "asdasd",
      nodeVersion: "",
      nodejsChecking: false,
      blockletVersion: "",
      blockletChecking: false,
      step: 2,
      blockletInstalling: false,
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
        return runcmd("blocklet2 --version")
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
            } else if (this.blockletVersion === false) {
              this.step = 2;
            } else {
              this.step = 3;
            }
            break;
          case 1:
            this.checkNodeJS().then(() => {
              if (this.nodeVersion) {
                this.step = 2;
              }
            });
            break;
          case 2:
            if (this.blockletVersion) {
              this.step = 3;
            }
            break;
        }
      },
      openNodejs() {
        mainAPI.shell.openExternal("https://nodejs.org/en/");
      },
      installBlockletCli() {
        this.blockletInstalling = true;
        return runcmd("npm install -g @blocklet/cli")
          .then((e) => {
            this.blockletInstalling = false;
            this.clickNext();
          })
          .catch((err) => {
            console.log(err);
          });
      },
      testapp() {
        test();
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
