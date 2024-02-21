import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as util from '../utils/user.util'

export const singUp = async (body) => {
  const existUser=await User.findOne({ email: body.email });
  if(existUser){
    throw new Error('User with this email already exist');
  }
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const data = await User.create({name:body.name,email: body.email,password:hashedPassword});
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
      
      var token = jwt.sign({id:user.id}, process.env.SECRET_KEY);
      return token;
  }
  catch(error){
      throw error;
  }
}
//Sending the requestToken to the email to perform ForgotPassword
export const forgotPassWord = async(mail)=>{

  const user=await User.findOne({email: mail})
  if(!user)
  {
    throw new Error('user not found');
  }

  const resetToken= jwt.sign({id:user.id}, process.env.RESET_SECRET_KEY,{
        expiresIn:'1h',});
  await util.sendResetToken(user.email,resetToken)
  return user;
}

//Performing the resetPassword 
export const resetPassWord=async(userId,newpassWord)=>{
  try{
  const user=await User.findById(userId)
  console.log(user,"user");
  if(!user)
  {
    throw new Error('user not found');
  }
  // Update the user's password with the new hashed password
  const hashedPassword=await bcrypt.hash(newpassWord,10);
  console.log(user.password,"before");
  user.password=hashedPassword;
  console.log(user.password,"after");
  await user.save();
  return 'password reset successfully';
}
catch(error)
{
  return error;
}

}










