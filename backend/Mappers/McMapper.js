const McMapper = (mc)=>({
    id:mc._id,
    Mcname: mc.Mcname,
    email: mc.email,
    role: mc.role,
    isVerified: mc.isVerified,
    profilepic: mc.profilepic,
    allcomplaints: mc.allcomplaints,
    createdAt: mc.createdAt
})

module.exports = McMapper