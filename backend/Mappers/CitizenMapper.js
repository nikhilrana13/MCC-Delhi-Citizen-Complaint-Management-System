
const CitizenMapper = (citizen)=>({
    name:citizen.name,
    email:citizen.email,
    phonesuffix:citizen.phonesuffix,
    phonenumber:citizen.phonenumber,
    profileimage:citizen.profilepic,
    complaints:citizen.mycomplaints,
    role:citizen.role,
    verified:citizen.isVerified,
    createdAt:citizen.createdAt
})

module.exports = CitizenMapper
