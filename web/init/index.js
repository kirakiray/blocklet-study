// ofa = async () => {
//   const runcmd = await load("util/runcmd.js");

//   runcmd("node --version").then((data) => console.log(data));
// };

define(async () => {
  return {
    data: {
      home: "pages/home -p",
    },
  };
});
