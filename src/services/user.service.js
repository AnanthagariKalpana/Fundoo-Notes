import User from '../models/user.model';
import bcrypt from 'bcrypt';

export const newUser = async (body) => {
  const existUser=await User.findOne({ email: body.email });
  if(existUser){
    throw new Error('User with this email already exist');
  }
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const data = await User.create({email: body.email,password:hashedPassword});
  return data;
};


export const loginUser = async (email, password)=>{
  try{
      const user = await User.findOne({email});

      if(!user){
          throw new Error('user not found');
      }
      const ispasswordValid=await bcrypt.compare(password,user.password);

      if(!ispasswordValid)
      {
          throw new Error('Invalid password');
      }
      return user;
  }
  catch(error){
      throw error;
  }
}

//get single user
export const getUser = async (mail) => {
  const data = await User.find({email:mail});
  return data;
};
