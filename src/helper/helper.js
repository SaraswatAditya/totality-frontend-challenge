import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

/** authenticate function */
export async function authenticate(email) {
  try {
    return await axios.post("/api/authenticate", { email });
  } catch (error) {
    return { error: "Email doesn't exist...!" };
  }
}

/**get user Details */
export async function getUser({ email }) {
  try {
    const { data } = await axios.get(`/api/user/${email}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't Match...!" };
  }
}

// login function
export async function verifyPassword({ email, password }) {
  try {
    if (email) {
      const { data } = await axios.post("/api/login", { email, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}

// Generate OTP
export async function generateOTP(email) {
  try {
    const { data: { code }, status } = await axios.get("/api/generateOTP", { params: { email } });

    if (status === 201) {
      const userResponse = await getUser({ email });
      const userEmail = userResponse.data.email;

      const text = `Your Password Recovery OTP is ${code}. Verify and recover your password`;
      await axios.post("/api/registerMail", {
        userEmail,
        text,
        subject: "Password Recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    console.error("Error generating OTP:", error);
    return Promise.reject(error);
  }
}
// verify OTP
export async function verifyOTP({ email, code }) {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { email, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

//Reset Password
export async function resetPassword({ email, password }) {
  try {
    const { data, status } = await axios.put("/api/resetPassword", {
      email,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}
