import nodemailer from "nodemailer";
import { Request, Response, NextFunction } from "express";
import db from "../db/models/index";
const { User } = db as any;



//Setup email verification variables by intializing nodemailer transporter
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


//Send the email from the Nodemailer seteup using email been created
export const emailVerification = (req: Request, createUser: any) => {
  const validationEmail = {
    from: " 'Email Verification' <noreplyTimeisNow247@gmail.com> ",
    to: createUser.email,
    subject: "Customer Relation Mnangement - Email Verification",
    html: `<h2> ${createUser.firstName}! Thank you for choosen CRM </h2>
      <h3>Please verify your email to complete the registration...</h3>
      Kindly click this <a href="http://localhost:7700/users/verify-email?token=${createUser.verificaticationToken}"><b>Link</b></a>`,
  };
  return validationEmail;
};




// Check if the user is verified with the verification link that was sent to the user
export const emailVerified = async (req: Request, res: Response) => {
try{
  const token = req.query.token;
  // Set accountVerified to true and verification token to empty string once the user is verified
   let verifyNewUser = await User.findOne({ where: { verificaticationToken:token } });
  if (!verifyNewUser) return res.send({ Message: "Invalid Link" });
  res.send({ Message: "You have been successfully verified" });
  verifyNewUser.verificaticationToken = "";
  verifyNewUser.accountVerified = true;
  await verifyNewUser.save();
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};