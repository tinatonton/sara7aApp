import { successResponse } from "../../Utils/response/success.response.js";
import { decrypt } from "../../Utils/security/encryption.security.js";
import UserModel from "../../DB/Models/user.model.js";

import { findByIdAndUpdate, findById, updateOne } from "../../DB/database.repo.js";
import { compareHash, generateHash } from "../../Utils/security/hash.security.js";
import { badRequestException } from "../../Utils/response/error.response.js";
import { HashEnum } from "../../Utils/enums/security.enum.js";

export const getProfile = async (req, res) => {
  req.user.phone = await decrypt(req.user.phone);
  return successResponse({
    res,
    statusCode: 200,
    message: "User found successfully",
    data: req.user,
  });
};

export const updateProfilePic = async (req, res) => {
  const user = await findByIdAndUpdate({
    model: UserModel,
    id: req.user._id,
    update: { profilePic: req.file.finalPath },
  });

  return successResponse({
    res,
    statusCode: 200,
    message: "Profile pic updated successfully",
    data: { user },
  });
};

export const updateCoverPic = async (req, res) => {
  const user = await findByIdAndUpdate({
    model: UserModel,
    id: req.user._id,
    update: { coverPictures: req.files?.map((file) => file.finalPath) },
  });

  return successResponse({
    res,
    statusCode: 200,
    message: "Cover picture updated successfully",
    data: { user },
  });
};


// update password

export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  const user = await findById({
    model: UserModel,
    id: req.user._id,
  });

  const isValidPassword = await compareHash({
    plainTextPassword: oldPassword,
    cipherText: user.password,
    algo: HashEnum.ARGON,
  })
  if (!isValidPassword) throw badRequestException({ message: "Invalid password" });

  const hashedPassword = await generateHash({
    plainTextPassword: newPassword,
    algo: HashEnum.ARGON,
  });
  await updateOne({
    model: UserModel,
    filter: { _id: req.user._id },
    update: {
      password: hashedPassword,
    },
  });
  return successResponse({
    res,
    statusCode: 200,
    message: "password updated successfully",
  });
};