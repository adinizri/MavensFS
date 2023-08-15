import express from 'express';
const router = express.Router();

router.get("/", function (req, res) {
  res.send("user home page");
});

router.post("/", function (req, res) {
    console.log({requestBody: req.body})
   res.send({requestBody: req.body}) 
});

export default router