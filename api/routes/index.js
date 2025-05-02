import express ,{Router} from 'express';
import projectRoute from '../routes/project.route.js'
import userRoute from '../routes/user.route.js';
const app = express.Router();



app.use('/api/user',userRoute);
app.use('/api/projects',projectRoute);
export default app;
