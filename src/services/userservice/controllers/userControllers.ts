import { NextFunction, Request,Response } from "express";
import response  from "../../../utils/errorHandler";

// Registration handler
export const userRegister = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { name, email, password } = req.body;
    // Validate input
    // const user=undefined
    // user.split()
    if (!name || !email || !password) {
      return response.failureResponse({
        response: res,
        statusCode: 400,
        message: 'Please provide all required fields (name, email, password).',
      });
    }

    // Check if user already exists
    // const existingUser = await User.findOne({ where: { email } });
    // if (existingUser) {
    //   return response.errorResponse({
    //     response: res,
    //     statusCode: 409,
    //     message: 'User with this email already exists.',
    //   });
    // }

    // // Hash password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // // Create new user
    // const newUser = await User.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });

    // Success response
    return response.successResponse({
      response: res,
      statusCode: 201,
      message: 'User registered successfully.',
      data: { name,email,password },
    });
  } catch (error:any) {
    // Catch any unexpected errors
    // const err = new ErrorHandler({
    //      statusCode: 500,
    //      message: error.message,
    //    });
    // next(err); 
    return response.errorReResponse({next,error:{
      statusCode: 500,
      message: error.message,
    }});
  }
};


export const userServices={
    userRegister
};