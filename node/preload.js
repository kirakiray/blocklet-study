window.addEventListener("DOMContentLoaded", () => {
  const fs = require("fs");
  const childProcess = require("child_process");

  const { contextBridge } = require("electron");

  contextBridge.exposeInMainWorld("mainAPI", {
    fs,
    childProcess,
  });
});
