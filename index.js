import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import userRouter from "./routers/userRouter.js";
import cors from "cors";
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/user',userRouter);
app.use(cors());
const port = process.env.PORT ||8080;

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})

