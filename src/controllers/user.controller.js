import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';



export const singUp = async (req, res, next) => {
  try {
    const data = await UserService.singUp(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const login=async (req,res)=>{
  try{
    
    const{email,password}=req.body;

    const user=await UserService.loginUser(email,password);

    res.status(200).json({
      message: 'Login Successful', user});
  }
  catch(error)
  {
    res.status(400).json({error:error.message});
  }
};

export const forgotPassWord = async (req, res) => {
  try {
    const user = await UserService.forgotPassWord(req.body.email);
    res.status(HttpStatus.OK).json({
      message: `Reset token sent to user email ${user.email}` 
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ 
      error: error.message 
    });
  }
};

export const resetPassWord = async (req, res) => {
  try {
    console.log(req.user.id,"id");
    const user = await UserService.resetPassWord(req.user.id,req.body.newpassword);
    res.status(HttpStatus.OK).json({
      message: user
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ 
      error: error.message 
    });
  }
};



