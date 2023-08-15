// Import the express in typescript file
import express from 'express';
import user from './Routes/userRout.ts'
import cors from 'cors';

const apiPath="/api"
// Initialize the express engine
const app: express.Application = express();

// Take a port 3000 for running server.
const port: number = 5000;
app.use(cors());
app.use(express.json());
// Handling '/' Request
app.get(apiPath+'/', (req, res) => {
	res.send("TypeScript With Express");
});
app.use(apiPath+"/user",user)

// Server setup
app.listen(port, () => {
	console.log(`listening with Express
		http://localhost:${port}/`);
});
