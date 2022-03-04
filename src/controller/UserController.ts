import { validateUserSignUp } from '../utilis/userValidation';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt'
import { Express } from 'express';
import db from '../db/models/index';
import { validateUser } from '../Interface/userInterface';
import crypto from "crypto";
import { transporter } from '../middlewares/Nodemailer';
import { emailVerification } from '../middlewares/Nodemailer';
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

