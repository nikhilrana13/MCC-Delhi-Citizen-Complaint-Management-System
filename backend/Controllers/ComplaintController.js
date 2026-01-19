const sharp = require("sharp");
const cloudinary = require("../Config/cloudinary");
const Citizen = require("../Models/CitizenModel");
const Complaint = require("../Models/ComplaintModel");
const Response = require("../Utils/ResponseHandler");
const McModel = require("../Models/McModel");
const Notification = require("../Models/NotificationModel");
const sendPushNotification = require("../Config/sendPushNotification");
const { getIO } = require("../Utils/SocketService.js");
const { getCitizenRoomId } = require("../Utils/getCitizenRoomId.js");

// Citizen complaint api's
const CreateComplaint = async (req, res) => {
  try {
    const io = getIO();
    const citizenId = req.user;
    let { title, description, address, category } = req.body;
    // console.log("req body",req.body)
    const files = req.files;
    // Validation: Check if all required fields are present
    if (!title || !description || !address || !category) {
      return Response(res, 403, "All fields are required");
    }
    // parse address to object if it comes as string
    if (typeof address === "string") {
      address = JSON.parse(address);
    }
    //check user exists or not
    const user = await Citizen.findById(citizenId);
    if (!user) {
      return Response(res, 404, "User not found");
    }
    // find Mc
    const Mcadmin = await McModel.findOne({ role: "mc" });

    // if have any images then upload to cloudinary and give url
    let imagesurl = [];
    if (files && files.length > 0) {
      for (let file of files) {
        try {
          const optimizedImage = await sharp(file.buffer)
            .resize({ width: 500, height: 400 })
            .webp({ quality: 80 })
            .toBuffer();
          const imagebase64 = `data:image/webp;base64,${optimizedImage.toString(
            "base64"
          )}`;

          const cloudResponse = await cloudinary.uploader.upload(imagebase64, {
            folder: "mcc-delhi-complaints",
            resource_type: "image",
          });
          imagesurl.push(cloudResponse.secure_url);
        } catch (error) {
          console.log("cloudinary upload error", error);
          return Response(res, 500, "Image upload failed");
        }
      }
    }
    // create complaint
    const complaint = await Complaint.create({
      citizenId: citizenId,
      mcId: Mcadmin._id,
      title,
      description,
      address,
      category,
      images: imagesurl,
    });
    // update complaint id to citizen mycomplaints array
    user.mycomplaints.push(complaint._id);
    await user.save();
    // update complaint id to mc allcomplaints array
    Mcadmin.allcomplaints.push(complaint._id);
    await Mcadmin.save();
    // notification sent to citizen and save to db
    // DB notification (citizen)
    await Notification.create({
      complaintId: complaint._id,
      receiverId: citizenId,
      receiverRole: "citizen",
      title: "Complaint Registered",
      type: "complaint",
      message:
        "Your complaint has been registered successfully. It will be resolved within 48 hours.",
    });
    // Push notification (citizen)
    await sendPushNotification(
      user.fcmtoken,
      "Complaint Registered",
      "Your complaint has been registered successfully. It will be resolved within 48 hours.",
      {
        complaintId: complaint._id.toString(),
        role: "citizen",
      }
    );
    // socket citizen notification
    io.to(citizenId.toString()).emit("notification", {
      title: "Complaint Registered",
      message:
        "Your complaint has been registered successfully. It will be resolved within 48 hours.",
    });
    // DB notification (admin)
    await Notification.create({
      complaintId: complaint._id,
      receiverId: Mcadmin._id,
      receiverRole: "mc",
      title: "New Complaint Received",
      type: "complaint",
      message:
        "A new complaint has been received. Please review and take action.",
    });

    // Push notification (admin)
    await sendPushNotification(
      Mcadmin.fcmtoken,
      "New Complaint Received",
      "A new complaint has been received. Please review and take action.",
      {
        complaintId: complaint._id.toString(),
        role: "mc",
      }
    );
    // mc admin push notification
    io.to(Mcadmin._id.toString()).emit("notification", {
      title: "New Complaint Received",
      message:
        "A new complaint has been received. Please review and take action",
    });

    return Response(res, 201, "Complaint Created Successfully", complaint);
  } catch (error) {
    console.error("failed to create complaint", error);
    return Response(res, 500, "Internal server error");
  }
};
// Get each Citizen complaint's
const EachCitizenComplaints = async (req, res) => {
  try {
    const citizenId = req.user;
    const { status } = req.query;

    const citizen = await Citizen.findById(citizenId);
    if (!citizen) {
      return Response(res, 404, "User not found");
    }
    let filters = { citizenId: citizenId };
    if (status && status !== "all") {
      filters.status = status;
    }
    const complaints = await Complaint.find(filters);
    if (!complaints) {
      return Response(res, 200, "No Complaints found", []);
    }
    return Response(res, 200, "Complaints found", { complaints: complaints });
  } catch (error) {
    console.error("failed to get complaints", error);
    return Response(res, 500, "Internal server error");
  }
};
const CitizenComplaintsStatus = async (req, res) => {
  try {
    const citizenId = req.user;
    const citizen = await Citizen.findById(citizenId);
    if (!citizen) {
      return Response(res, 404, "User not found");
    }
    const total = await Complaint.countDocuments({ citizenId });
    const pending = await Complaint.countDocuments({
      citizenId,
      status: "pending",
    });
    const resolved = await Complaint.countDocuments({
      citizenId,
      status: "completed",
    });
    const inprogress = await Complaint.countDocuments({
      citizenId,
      status: "progress",
    });

    return Response(res, 200, "Complaints status", {
      total,
      pending,
      resolved,
      inprogress,
    });
  } catch (error) {
    console.error("failed to get complaints status", error);
    return Response(res, 500, "Internal server error");
  }
};
// Mc Admin complaint api's
const FetchAllComplaints = async (req, res) => {
  try {
    const mcId = req.user;
    const { category, status, page, limit } = req.query;
    const pageNumber = parseInt(page || 1);
    const limitNumber = parseInt(limit || 10);
    const skip = (pageNumber - 1) * limitNumber;

    const Mcadmin = await McModel.findById(mcId);
    if (!Mcadmin) {
      return Response(res, 404, "Mc Admin not found");
    }
    let filters = { mcId: mcId };
    // only apply filters when not all
    if (category && category !== "all") {
      filters.category = category;
    }
    if (status && status !== "all") {
      filters.status = status;
    }
    // if (category) {
    //   filters.category = category;
    // }
    // if (status) {
    //   filters.status = status;
    // }
    const complaints = await Complaint.find(filters)
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 })
      .populate("citizenId", "name email phonesuffix phonenumber ");
    const totalcomplaints = await Complaint.countDocuments(filters);
    const totalPages = Math.ceil(totalcomplaints / limitNumber);

    if (complaints.length === 0) {
      return Response(res, 200, "No Complaints found", complaints);
    }
    return Response(res, 200, "Complaints found", {
      complaints,
      pagination: {
        totalPages,
        totalcomplaints,
        currentPage: pageNumber,
        limit: limitNumber,
      },
    });
  } catch (error) {
    console.error("failed to get complaints", error);
    return Response(res, 500, "Internal server error");
  }
};

const UpdateStatusofComplaint = async (req, res) => {
  try {
    const io = getIO();
    const mcId = req.user;
    const complaintId = req.params.id;
    const { status } = req.body;
    const allowedStatus = [
      "pending",
      "review",
      "progress",
      "completed",
      "cancelled",
    ];
    if (!allowedStatus.includes(status)) {
      return Response(res, 400, "Invalid status value");
    }
    const Mcadmin = await McModel.findById(mcId);
    if (!Mcadmin) {
      return Response(res, 404, "Mc Admin not found");
    }
    const complaint = await Complaint.findOneAndUpdate(
      { _id: complaintId, mcId: mcId },
      { status: status, type: "status-update" },
      { new: true }
    );
    if (!complaint) {
      return Response(res, 404, "Complaint not found");
    }
    // DB notification (citizen)
    await Notification.create({
      complaintId: complaint._id,
      receiverId: complaint.citizenId,
      receiverRole: "citizen",
      title: "Complaint Status Updated",
      type: "complaint",
      message: `Your complaint Id:${complaint?._id
        .toString()
        .slice(0, 7)} status has been updated to ${status} `,
    });
    //socket emit on status change
    io.to(complaint?.citizenId?.toString()).emit("notification", {
      title: "Complaint Status Updated",
      message: `Your complaint status has been updated to "${status}".`,
    });
    return Response(
      res,
      200,
      "Complaint Status Update successfully",
      complaint
    );
  } catch (error) {
    console.error("failed to update complaints", error);
    return Response(res, 500, "Internal server error");
  }
};
const McadminComplaintsStatus = async (req, res) => {
  try {
    const mcId = req.user;
    const mcadmin = await McModel.findById(mcId);
    if (!mcadmin) {
      return Response(res, 404, "User not found");
    }
    const total = await Complaint.countDocuments({ mcId });
    const pending = await Complaint.countDocuments({ mcId, status: "pending" });
    const resolved = await Complaint.countDocuments({
      mcId,
      status: "completed",
    });
    const inprogress = await Complaint.countDocuments({
      mcId,
      status: "progress",
    });

    return Response(res, 200, "Complaints status", {
      total,
      pending,
      resolved,
      inprogress,
    });
  } catch (error) {
    console.error("failed to get mc complaints status", error);
    return Response(res, 500, "Internal server error");
  }
};

const AssignedComplaintTo = async (req, res) => {
  try {
    const mcId = req.user;
    const complaintId = req.params.id;
    const { assignedTo } = req.body;
    const io = getIO();

    const Mcadmin = await McModel.findById(mcId);
    if (!Mcadmin) {
      return Response(res, 404, "Mc Admin not found");
    }
    const complaint = await Complaint.findOneAndUpdate(
      { _id: complaintId, mcId: mcId },
      { assignedTo: assignedTo, type: "status-update" },
      { new: true }
    ).populate("citizenId", "_id");
    if (!complaint) {
      return Response(res, 404, "Complaint not found");
    }
    // console.log("ASSIGN emit to:", complaint.citizenId);
    // create notification
    await Notification.create({
      complaintId: complaint._id,
      receiverId: complaint.citizenId,
      receiverRole: "citizen",
      title: "Complaint Assigned To",
      type: "complaint",
      message: `Your complaint Id:${complaint?._id
        .toString()
        .slice(0, 7)} has been assigned to "${assignedTo}  `,
    });

    // socket emit on Assigned to change
    io.to(getCitizenRoomId(complaint?.citizenId)).emit("notification", {
      title: "Complaint Assigned To",
      message: `Your complaint has been assigned to "${assignedTo}".`,
    });
    return Response(res, 200, "Complaint assigned successfully", complaint);
  } catch (error) {
    console.error("failed to assign complaint", error);
    return Response(res, 500, "Internal server error");
  }
};

module.exports = {
  CreateComplaint,
  EachCitizenComplaints,
  FetchAllComplaints,
  UpdateStatusofComplaint,
  CitizenComplaintsStatus,
  McadminComplaintsStatus,
  AssignedComplaintTo,
};
