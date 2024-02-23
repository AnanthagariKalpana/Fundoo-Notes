import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    bearerToken= bearerToken.split(" ");
    console.log(bearerToken[1]);
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };

    const user = await jwt.verify(bearerToken[1],process.env.SECRET_KEY );
    console.log(user);
    req.user=user;
    next();
  } catch (error) {
    next(error);
  }
};
