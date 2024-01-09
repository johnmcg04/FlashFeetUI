import { SignUp } from "../model/SignUp"
import { Request, Response, Application } from "express"
const axios = require("axios");

interface SignUp {
  // Define your SignUp interface properties here
}

export const signUp = async function (signUp: SignUp): Promise<void> {
  const passwordValidationResult = validateSignUpPassword(signUp.password);

  if (passwordValidationResult.length > 0) {
    const errorMessage = "Invalid password. Please fix the following issues:\n" +
      passwordValidationResult.join('\n');
    throw new Error(errorMessage);
  }

  try {
    const response = await axios.post("http://localhost:8080/api/signup", signUp);
    // Handle the successful sign-up response as needed
    console.log(response.data); // For example, log the response data
    
  } catch (e) {
    throw new Error("Could not sign up");
  }
};

// Password validation function
function validateSignUpPassword(password: string): string[] {
  const errors: string[] = [];

  // Check for at least 8 characters
  if (password.length < 8) {
    errors.push("Password needs to be a minimum of 8 characters");
  }

  // Check for at least 1 special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("Password must contain at least 1 special character");
  }

  // Check for at least 1 upper case letter
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least 1 upper case letter");
  }

  // Check for at least 1 lower case letter
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least 1 lower case letter");
  }

  // Check for at least 1 digit
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least 1 digit");
  }

  return errors;
}


