const CitizenMapper = require("../Mappers/CitizenMapper");
const Citizen = require("../Models/CitizenModel");
const cloudinary = require("../Config/cloudinary.js");
const Response = require("../Utils/ResponseHandler.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const GetCitizenProfile = async (req, res) => {
  try {
    const citizenId = req.user;
    const citizen = await Citizen.findById(citizenId);
    if (!citizen) {
      return Response(res, 404, "Citizen not found");
    }
    return Response(
      res,
      200,
      "profile fetch successfully",
      CitizenMapper(citizen)
    );
  } catch (error) {
    console.error("failed to fetch profile", error);
    return Response(res, 500, "Internal server error");
  }
};

const UpdateCitizenProfile = async (req, res) => {
  try {
    const citizenId = req.user;
    const { name, email, phonesuffix, phonenumber, address } = req.body;
    const file = req.file;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return Response(res, 400, "Validation failed", errors.array());
    }
    //  console.log("file:", file);
    const citizen = await Citizen.findById(citizenId);
    if (!citizen) {
      return Response(res, 404, "Citizen not found");
    }
    let updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase().trim();
    if (phonesuffix) updateData.phonesuffix = phonesuffix;
    if (phonenumber) updateData.phonenumber = phonenumber;
    if (address) updateData.address = address;

    if (file) {
      //convert image to base64
      const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;
      //upload to cloudinary
      const cloudResponse = await cloudinary.uploader.upload(imageBase64, {
        folder: "mcc-delhi-complaints",
        resource_type: "image",
      });
      // get secure url from cloudinary
      updateData.profilepic = cloudResponse.secure_url;
    }
    //if no data to update
    if (Object.keys(updateData).length === 0) {
      return Response(res, 400, "No fields provided to update");
    }
    const updateuser = await Citizen.findByIdAndUpdate(
      citizenId,
      { $set: updateData },
      { new: true }
    );
    return Response(
      res,
      200,
      "Profile update successfully",
      CitizenMapper(updateuser)
    );
  } catch (error) {
    console.error("failed to update profile", error);
    return Response(res, 500, "Internal server error");
  }
};

const ChangeCitizenAccountPassword = async (req, res) => {
  try {
    const citizenId = req.user;
    const { oldpassword, newpassword } = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return Response(res, 400, "Validation failed", errors.array());
    }
    if (oldpassword === newpassword) {
      return Response(
        res,
        400,
        "New password must be different from old password"
      );
    }
    const citizen = await Citizen.findById(citizenId);
    if (!citizen) {
      return Response(res, 404, "Citizen not found");
    }
    const isMatch = await bcrypt.compare(oldpassword, citizen.password);
    if (!isMatch) {
      return Response(res, 401, "Old password is incorrect");
    }
    const hashpassword = await bcrypt.hash(newpassword, 10);
    await Citizen.findByIdAndUpdate(
      citizenId,
      { $set: { password: hashpassword } },
      { new: true }
    );
    return Response(res, 200, "password change successfully");
  } catch (error) {
    console.error("failed to change password", error);
    return Response(res, 500, "Internal server error");
  }
};

module.exports = {
  GetCitizenProfile,
  UpdateCitizenProfile,
  ChangeCitizenAccountPassword,
};
