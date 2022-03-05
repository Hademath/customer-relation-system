import {validateUser } from  "../Interface/userInterface";
import joi from 'joi'



export const validateUserSignUp = (data: validateUser) => {
  const schema = joi
    .object({
      firstName: joi.string().min(2).max(20).required(),
      lastName: joi.string().min(2).max(20).required(),
      userName: joi.string().min(5).max(25).required(),
      email: joi.string().required().email(),
      phone: joi.number().min(11).required(),
      profilePicture: joi.string(),
      password: joi.string().trim().min(6).required(),
      confirmPassword: joi.ref("password"),
    })
    .unknown();
  const option = {
    errors: { wrap: { label: " " } },
  };
  return schema.validate(data, option); 
};

export const validateSignIn = (data: validateUser) => {
    const schema = joi.object({
    email: joi.string().required().email(),
    password:joi.string().trim().min(6).required()
    }).unknown();
    const matthew = {
    errors: { wrap: { label: " " } },
    };
    return schema.validate(data, matthew)
}