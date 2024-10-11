import { NextFunction, Request,Response } from "express";
import response  from "../../../utils/errorHandler";
import {  fork } from "child_process";
import path from "path";

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
    const child_process = fork(path.join(__dirname, 'ChildProcess.js'));

    // Event: When child process is connected
    child_process.on("spawn", () => {
      console.log('Child process is connected.');
    });
    
    // Event: Receiving message from the child process
    child_process.on('message', (data) => {
      console.log('Received message from child process:');
      console.log(data);
      
    });
    
    // Event: When the child process exits
    child_process.on('exit', (code, signal) => {
      console.log(`Child process exited with code ${code} and signal ${signal}`);
    });
    
    // Event: When the child process is closed
    child_process.on('close', (code) => {
      console.log(`Child process closed with code ${code}`);
    });
    
    // Event: Handle child process errors
    child_process.on('error', (error) => {
      console.log('Error in child process:', error.message);
    });
    
    // Kill the child process after some time
    setTimeout(() => {
      console.log('Killing child process...');
      child_process.kill();  // You can pass a signal if required
    }, 5000);
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