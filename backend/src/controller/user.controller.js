import { UserModel } from "../Models/User.model.js";
import { OTPmodel  } from "../Models/OTP.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import twilio from "twilio";
import otpgenerator from "otp-generator";
import axios from "axios"

const RegisterUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log(username, email, password);

    const user = await UserModel.findOne({
      $or: [{ email }, { username }],
    });
    // console.log("user");

    if (user) {
      return res.status(404).json({ message: "User exists already, do login" });
    }
    // console.log("user check");

    const hashpassword = await bcrypt.hash(password, 10);
    // console.log("hashpassword");

    const newuser = await UserModel.create({
      username,
      email,
      password: hashpassword,
    });
    // console.log("newuser");

    const createduser = await UserModel.findById(newuser._id);
    if (!createduser) {
      return res
        .status(500)
        .json({ message: "Server issue while creating user" });
    }

    // console.log(createduser);
    // console.log("now from here");

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      data: createduser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error registering user: ${error.message}` });
  }
}

const LoginUser = async (req, res) => {
  try {
    const { email, password  } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist, please register" });
    }

    const ispasscorrect = await bcrypt.compare(password, user.password);
    // console.log(ispasscorrect);

    if (!ispasscorrect) {
      return res.status(401).json({ message: "Wrong password" }); // 🔹 401 for incorrect credentials
    }

    // console.log(process.env.Authentication_for_jsonwebtoken);

    const jsonewbestoken = jwt.sign(
      { email: user.email, _id: user.id },
      process.env.Authentication_for_jsonwebtoken,
      { expiresIn: "24h" }
    );
    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user,
      jwttoken: jsonewbestoken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error logging in user: ${error.message}` });
  }
};

const checking_token = async (req, res) => {
  return res.status(200).json({
    message: "Token is valid",
    success: true,
  });
};
const generateandsetOTP = async (req, res) => {
  try {
    const { phonenumber } = req.body;
    const twilio_bhai = new twilio(
      process.env.Account_SID,
      process.env.Auth_Token
    );

    const otp = otpgenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const stringWithoutSpaces = phonenumber.replace(/\s+/g, "");
    if (stringWithoutSpaces.length !== 13) {
      return res.status(400).json({
        message: "Give valid phone number",
        success: "False",
      });
    }
    await OTPmodel.findOneAndUpdate(
      { phonenumber: stringWithoutSpaces },
      { otp, otpexpiry: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await twilio_bhai.messages.create({
      body: `Your OTP from Codeeditor is ${otp}. Verify your account. Don't share your credentials.`,
      to: phonenumber,
      from: process.env.My_Twilio_phone_number,
    });

    res.status(200).json({
      status: 200,
      message: `OTP sent successfully to your ${phonenumber}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `${error}`,
      success: "False",
    });
  }
};

const checkingotp =async (req, res) => {
  try {
    const { phonenumber, otp ,id} = req.body;

    if (!otp) {
      return res.status(400).json({
        message: "Please provide both otp and id.",
      });
    }
    // phone number shold be in +911234567890 format no space between anythign 
    const otpdoc = await OTPmodel.findOne({ phonenumber });

    if (!otpdoc) {
      return res.status(400).json({
        message: "Register your mobile again",
      });
    }

    if (otpdoc.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP.",
        ans: "false",
      });
    }
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        ans: "false",
      });
    }
    user.isverified = true;
    await user.save();
    res.status(200).json({
      message: "User verified successfully.",
      ans: "true",
    });
  } catch (error) {
    // console.error("Error in checking OTP:", error);
    return res.status(400).json({
      message: `Having error in checking the OTP: ${error.message}`,
      ans: "false",
    });
  }
};

const languageVersionMap = {
  nodejs: "0", // Use "nodejs" instead of "javascript"
  javascript: "0", // Redirected to "nodejs"
  typescript: "4",
  python: "3",
  java: "3",
  c: "5",
  cpp: "5", // Redirect to cpp17
  cpp17: "5",
  ruby: "2",
  php: "3",
  go: "3",
  rust: "0",
  kotlin: "2",
  swift: "3",
  r: "3",
  perl: "3",
  dart: "3",
  haskell: "3",
  xml: "0",
  yaml: "0",
  html: "0",
  shell: "0",
};

const languageAliasMap = {
  javascript: "nodejs", // JavaScript should use Node.js
  cpp: "cpp17", // Use C++17 as the standard C++ version
};

const executeCode = async (req, res) => {
  const { code, input, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  // Normalize language and handle aliases
  const languageKey = languageAliasMap[language.toLowerCase()] || language.toLowerCase();
  const versionIndex = languageVersionMap[languageKey];

  if (!versionIndex) {
    return res.status(400).json({ error: `Unsupported language: ${language}` });
  }

  try {
    const response = await axios.post("https://api.jdoodle.com/v1/execute", {
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      script: code,
      stdin: input || "",
      language: languageKey,
      versionIndex,
      compileOnly: false,
    });

    console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to execute code",
      details: error.response?.data || error.message,
    });
  }
};

export {
  RegisterUser,
  LoginUser,
  checking_token,
  generateandsetOTP,
  checkingotp,
  executeCode
};
