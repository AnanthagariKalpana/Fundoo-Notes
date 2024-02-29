
import {client} from "../config/redis";
import HttpStatus from 'http-status-codes';

const cacheAuthGetAll = async (req, res, next) => {
    try {
       const key = req.body.userId
       const data = await client.get(key)
       if (data) {
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: 'Note fetched from cache successfully'
        });
      }else{
       next();
      }
    } catch (error) {
      console.log(error);
    }
  };

  export default cacheAuthGetAll

//   const cacheAuthGetNote = async (req, res, next) => {
//     try {
//        const key = req.body
//        console.log(req.body);
//        const data = await client.get(key)
//        console.log('2');
//        if (data) {
//         res.status(HttpStatus.OK).json({
//           code: HttpStatus.OK,
//           data: data,
//           message: 'Note fetched from cache successfully'
//         });
//       }else{
//        next();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

  //export default cacheAuthGetNote;