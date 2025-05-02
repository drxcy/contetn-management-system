import mongoose from 'mongoose';

  export const mongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
         
     } catch (err) {
         console.log(err)
         process.exit(1);
     }
    };
 
    
 export default mongoDb;