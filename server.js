const express = require("express");
const { spawn } = require("child_process");
const cors = require("cors");
const path = require("path");
const app = express();

PORT = 8080;
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

// app.post("/hello", (req, res) => {
//   const { User, Password, RubeusDir, RequestType } = req.body;

//   const rubeusPath = path.join(RubeusDir, "Rubeus.exe");
//   const command = `${rubeusPath} ask${RequestType} /user:${User} /password:${Password}`;

//   const childProcess = spawn("cmd.exe", ["/c", command]);

//   childProcess.stdout.on("data", (data) => {
//     console.log(`stdout: ${data}`);
//   });

//   childProcess.stderr.on("data", (data) => {
//     console.error(`stderr: ${data}`);
//   });

//   childProcess.on("close", (code) => {
//     console.log(`child process exited with code ${code}`);
//   });

//   res.send("Command executed successfully");
// });

app.post("/confVal", (req, res) => {
  console.log(req.body);
  res.send("ma kore");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
