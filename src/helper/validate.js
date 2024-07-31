import toast from "react-hot-toast";
import { authenticate } from "./helper";

// validate login page email
export async function emailValidate(values) {
  const errors = emailVerify({}, values);

  if (values.email) {
    //check user exist or not
    const { status } = await authenticate(values.email);
    if (status !== 200) {
      errors.exist = toast.error("Email does not exist...!");
    }
  }
  return errors;
}

//validate password
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

// validate reset password
export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error("Password not match...!");
  }

  return errors;
}

//validate register form
export async function registerValidation(values) {
  const errors = emailVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);
  return errors;
}

//validate profile page
export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}

/*************************************************************** */


//verify password
function passwordVerify(error = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    error.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong Password...!");
  } else if (values.password.length < 4) {
    error.password = toast.error("Password must be 4 characters long.");
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error("Password must have special characters ");
  }
  return error;
}

//validate email
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address...!");
  }

  return error;
}
