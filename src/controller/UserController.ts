import { validateSignIn, validateUserSignUp } from '../utilis/userValidation';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt'
import db from '../db/models/index';
import crypto from "crypto";
import { transporter } from '../middlewares/Nodemailer';
import { emailVerification } from '../middlewares/Nodemailer';
import jwt from 'jsonwebtoken'
const { User } = db as any


export async function userSignUp(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = validateUserSignUp(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { firstName, lastName, userName, profilePicture, phone, email, password, confirmPassword, } = req.body;
    let checkuserEmail = await User.findOne({ where: { email: email } });
    let checkuserPhone = await User.findOne({ where: { phone: phone } });
    if (checkuserEmail)
      return res.status(400).send({ Message: "Email  already exist" });
    if (checkuserPhone)
      return res.status(400).send({ Message: " Phone Number already exist" });

    const salt = await bcrypt.genSalt(15);
    const passwordHashed = await bcrypt.hash(password, salt);
    const randomNumber = crypto.randomBytes(64).toString("hex");
    const createUser = await User.create({
      firstName,
      lastName,
      userName,
      phone,
      verificaticationToken: randomNumber,
      profilePicture,
      email,
      password: passwordHashed,
      confirmPassword,
    });

    // Confirm that the email has been sent to the user
      transporter.sendMail(
      emailVerification(email, createUser),
      (error: any, info: any) => {
      if(error) {
           return res.status(400).json(error.message)
        }else{
            res .send({ message: "Verification email has been sent to your email account", verificaticationToken: createUser.verificaticationToken, }) .status(200);
        }
      }
    );

  } catch (error) {
    res.send(error);
  }
}


// Login To keep track of the user existence and authorization
export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { error } = validateSignIn(req.body)
        if(error) return res.status(400).send(error.details[0].message)
    const { password, email } = req.body;
    const checkUserExit = await User.findOne({ where: { email: email } });
    if (!checkUserExit)
      return res.status(400).json("The user with the email does not Exist");
    else {
    const comparePassword =await bcrypt.compare(password, checkUserExit.password);
    if (!comparePassword)
    return res.status(400).json("The password you enter is incorrect");
    else {
    const payload = { email, lastName: checkUserExit.lastName };
    const token = jwt.sign(payload, process.env.SIGNIN_TOKEN_SECRET);
    res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    })
    .status(200).send({
    Message: "User Successfully Login",
    accessToken: token,
    firstName: checkUserExit.firstName,
    });
    }
    }
  } catch (error) {
    res.json(error);
  }
}


