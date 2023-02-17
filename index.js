const express=require("express")
const cors=require("cors")
const connection=require("./Cofig/db")
let app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("welcome");
  });

app.listen(process.env.PORT, async () => {
    try {
      await connection;
      console.log("Connected to server");
    } catch (err) {
      console.log("Error in connection", err);
    }
    console.log(`Listen on port ${process.env.PORT}`);
  });