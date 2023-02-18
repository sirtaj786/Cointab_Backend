const express = require("express");
const {userModel} = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { tovalidate } = require("../Middleware/tovalidate");
const fetch = require("node-fetch");

const userRoute = express.Router();

userRoute.get("/get",(req,res)=>{
  res.send("working")
})

userRoute.post("/fetchdata", async (req, res) => {
    const{ url } = req.body;
  
    let response = await fetch(url);
  
    let data = await response.json();
  
    try {
      await userModel.insertMany(data.results);
      return res.status(201).send({ msg:"successfully fetched the data" });
    } catch (err) {
      return res.status(400).send({ msg:"something wrong" });
    }
  });

  
  
  userRoute.use(tovalidate);
  
  
  
  
  userRoute.delete("/deleteall", async (req, res) => {
   const data = await userModel.find();
    if (data.length > 0) {
    }
    try {
      await userModel.deleteMany({});
      res.status(202).send({ msg: "Deleted all details" });
    } catch (err) {
      res.status(204).send({ msg: "Nohting in the  collection" });
    }
  });
  
  
  
  
  userRoute.get("/details", async (req, res) => {
    const { age, gender, limit = 10, page = 1 } = req.query;
    console.log(age, gender);
    let filterage = age?.trim().split("-").map(Number) || [];
    console.log(filterage);
    let totalcount = await userModel.countDocuments({});
    let data = await userModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit);
    // console.log(data)
    if (age && gender) {
      data = await userModel
        .find({
          gender: gender,
          "dob.age": { $gt: filterage[0], $lt: filterage[1] },
        })
        .limit(limit)
        .skip((page - 1) * limit);
      totalcount = await userModel
        .find({
          gender: gender,
          "dob.age": { $gt: filterage[0], $lt: filterage[1] },
        })
        .count();
    } else if (age) {
      data = await userModel
        .find({ "dob.age": { $gt: filterage[0], $lt: filterage[1] } })
        .limit(limit)
        .skip((page - 1) * limit);
      totalcount = await userModel
        .find({ "dob.age": { $gt: filterage[0], $lt: filterage[1] } })
        .count();
    } else if (gender) {
      data = await userModel
        .find({ gender: gender })
        .limit(limit)
        .skip((page - 1) * limit);
      totalcount = await userModel.find({ gender: gender }).count();
    }
  
    console.log(data);
    res.json({ results: data, totalcount: totalcount });
  });
  

  module.exports = userRoute;