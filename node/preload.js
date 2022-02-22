window.addEventListener("DOMContentLoaded", () => {
  const fs = require("fs");
  const childProcess = require("child_process");
  const { shell } = require("electron");

  const { contextBridge } = require("electron");

  function testaa() {
    const { spawn } = childProcess;

    const ls = spawn("ls", ["-la"]);

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
  }

  contextBridge.exposeInMainWorld("mainAPI", {
    fs,
    childProcess,
    shell,
    testaa,
  });
});
