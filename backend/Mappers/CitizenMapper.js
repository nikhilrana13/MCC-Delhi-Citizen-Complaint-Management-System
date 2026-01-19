
const CitizenMapper = (citizen)=>({
    id:citizen._id,
    uid:citizen.uid,
    name:citizen.name,
    email:citizen.email,
    phonesuffix:citizen.phonesuffix,
    phonenumber:citizen.phonenumber,
    profilepic:citizen.profilepic,
    address:citizen.address,
    complaints:citizen.mycomplaints,
    role:citizen.role,
    verified:citizen.isVerified,
    createdAt:citizen.createdAt
})
module.exports = CitizenMapper
