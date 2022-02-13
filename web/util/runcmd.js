define(() => {
  const { childProcess, fs } = mainAPI;

  return (cmd) => {
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
  };
});
