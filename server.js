const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");
const path = require("path");
const app = express();
const builder = require("xmlbuilder");
const fs = require("fs");
const bodyParser = require("body-parser");
const { CLIENT_RENEG_LIMIT } = require("tls");
const configPath = path.join("c:\\", "KerbShield", "KerbShieldConfig.xml");

PORT = 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

app.post("/hello", (req, res) => {
  const { User, Password, RubeusDir, Stress, thread } = req.body;
  console.log(req.body);

  let cmd = `Rubeus.exe asktgt /user:${User} /password:${Password}`;

  if (Stress) {
    const numIterations = parseInt(Stress);
    cmd = `for /L %i in (1,1,${numIterations}) do @${RubeusDir}\\Rubeus.exe asktgt /user:${User} /password:${Password}`;
  }

  if (thread) {
    const numThreads = parseInt(thread);
    const commands = Array(numThreads).fill(cmd).join(" & ");

    exec(`${commands}`, { cwd: RubeusDir }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        res.status(500).send(`exec error: ${error}`);
        return;
      }

      // console.log(`stdout: ${stdout}`);
      // console.error(`stderr: ${stderr}`);

      res.send("done!");
    });
  } else {
    exec(cmd, { cwd: RubeusDir }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        res.status(500).send(`exec error: ${error}`);
        return;
      }

      // console.log(`stdout: ${stdout}`);
      // console.error(`stderr: ${stderr}`);

      res.send(stdout);
    });
  }
});
// const xml = builder.create("KerbShield");

// app.post("/confVal", (req, res) => {
//   const {
//     user,
//     AEncType,
//     CEncType,
//     domain,
//     Action,
//     ConditionalAccess,
//     ReplyTicketOPTS,
//     Name,
//     ip,
//     TGTReqFlags,
//     Script
//   } = req.body;

//   const rule1 = xml.ele("Rule");
//   const cond1 = rule1.ele("Condition");
//   const tgt1 = cond1.ele("TGT");
//   tgt1.ele("Name", Name);
//   tgt1.ele("user", user);
//   tgt1.ele("domain", domain);
//   tgt1.ele("TGTReqFlags", TGTReqFlags);
//   tgt1.ele("ip", ip);
//   tgt1.ele("EncType", AEncType);
//   const act1 = rule1.ele("Action");
//   act1.ele("Script", Script);
//   act1.ele("TGTRepFlags", ReplyTicketOPTS);
//   act1.ele("EncType", CEncType);
//   act1.ele("ConditionalAccess", ConditionalAccess);

//   //   } else {
//   //     const cond1 = rule1.ele("Condition");
//   //     const tgs = cond1.ele("TGS");
//   //     tgs.ele("Name", Name);
//   //     tgs.ele("TGTREQUESTOR", Name);
//   //     tgs.ele("service", req.body.service);
//   //     tgs.ele("server", req.body.server);
//   //     tgs.ele("domain", Domain);
//   //     tgs.ele("TGSReqFlags", ReplyTicketOPTS);
//   //     tgs.ele("ip", req.body.ip);
//   //     tgs.ele("EncType", EncType);
//   //     const act3 = rule1.ele("Action");
//   //     act3.ele("Script", Action);
//   //     act3.ele("TGSRepFlags", ReplyTicketOPTS);
//   //     act3.ele("EncType", EncType);
//   //     act3.ele("ConditionalAccess", ConditionalAccess);
//   //   }
//   fs.writeFile(configPath, xml.toString({ pretty: true }), (err) => {
//     if (err) {
//       console.error(err);
//     }
//   });
//   res.send("Updated to xml!");
// });

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
