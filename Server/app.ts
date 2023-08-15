// Import the express in typescript file
import express, { NextFunction } from 'express';
import user from './Routes/userRout.ts'
import cors from 'cors';
import { error } from 'console';

// Initialize the express engine
const app: express.Application = express();

// Take a port 3000 for running server.
const port: number = 5000;
app.use(cors());
app.use(express.json());
// Handling '/' Request
app.get('/', (req, res) => {
	res.send("TypeScript With Express");
});
app.use("/user",user)

// app.use((error:unknown,req:Request,res:Response,next:NextFunction)=>{
// 	console.log(error);
// 	let errorMassage=`An error occurred: ${error}`;
// 	let statusCode=500;
// 	if(error instanceof HttpError){
// 		statusCode=error.status
// 	}
// })

// Server setup
app.listen(port, () => {
	console.log(`listening with Express
		http://localhost:${port}/`);
});
