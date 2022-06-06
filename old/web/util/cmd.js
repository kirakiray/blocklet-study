define(() => {
  const { childProcess, fs, testaa } = mainAPI;

  return {
    run: (cmd) => {
      return new Promise((resolve, reject) => {
        childProcess.exec(
          cmd,
          {
            maxBuffer: 1024 * 2000,
          },
          function (err, stdout, stderr) {
            if (err) {
              reject(err);
            } else if (stderr.lenght > 0) {
              reject(new Error(stderr.toString()));
            } else {
              resolve(stdout);
            }
          }
        );
      });
    },
    test() {
      // var exec = childProcess.exec;
      // var coffeeProcess = exec("ls /usr");

      // coffeeProcess.stdout.on("data", function (data) {
      //   console.log(data);
      // });

      testaa();
      // const { spawn } = childProcess;

      // const ls = spawn("ls", ["-la"]);

      // ls.stdout.on("data", (data) => {
      //   console.log(`stdout: ${data}`);
      // });

      // ls.stderr.on("data", (data) => {
      //   console.log(`stderr: ${data}`);
      // });

      // ls.on("error", (error) => {
      //   console.log(`error: ${error.message}`);
      // });

      // ls.on("close", (code) => {
      //   console.log(`child process exited with code ${code}`);
      // });
    },
  };
});
