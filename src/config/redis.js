import { createClient } from "redis";
import logger from "./logger";

export const client= createClient()

const redis=async()=>{
    try{
        client.connect();
        logger.info('Connected to Redis Database');
    }
    catch(error){
        logger.error("could not connect to redis",error)
    }
};

export default redis;