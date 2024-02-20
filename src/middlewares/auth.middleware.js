import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    console.log(bearerToken);
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };

    const user = await jwt.verify(bearerToken,process.env.SECRET_KEY );
    console.log(user);
    req.user=user;
    next();
  } catch (error) {
    next(error);
  }
};
