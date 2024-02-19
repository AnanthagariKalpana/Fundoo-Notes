import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
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

    res.status(200).json({message: 'Login Successful', user});
  }
  catch(error)
  {
    res.status(400).json({error:error.message});
  }
};

export const getUser = async (req, res, next) => {
  try {
    const data = await UserService.getUser(req.params.email);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next)=>{
  try{
    const data = await UserService.getAll();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data:data,
      message:'Users fetched successfully'
    });
  }
  catch(error)
  {
    next(error);
  }
}
