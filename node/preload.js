window.addEventListener("DOMContentLoaded", () => {
  const fs = require("fs");
  const childProcess = require("child_process");
  const { shell } = require("electron");

  const { contextBridge } = require("electron");

  const runCwd = (...args) => {
    const { spawn, exec } = childProcess;

    const ls = exec(...args);

    ls.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    ls.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });

    ls.on("error", (error) => {
      console.log(`error: ${error.message}`);
    });

    ls.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  };

  function testaa() {
    // runCwd("ls", ["-la"], {
    //   cwd: "/Users/huangyao/Documents/ArcBlock/blocklet-study/testdir",
    // });
    runCwd("npm init", {
      cwd: "/Users/huangyao/Documents/ArcBlock/blocklet-study/testdir",
    });
  }

  contextBridge.exposeInMainWorld("mainAPI", {
    fs,
    childProcess,
    shell,
    testaa,
  });
});
