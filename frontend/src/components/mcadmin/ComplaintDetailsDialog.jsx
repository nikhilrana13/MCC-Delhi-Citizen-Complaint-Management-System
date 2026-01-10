"use client"
import { TableCell } from "../../../components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from"../../../components/ui/select";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "../../../components/ui/input";


const ComplaintDetailsDialog = ({complaint,setComplaints})=> {
//    console.log("complaint",complaint)
     const handleComplaintStatusUpdate = async(id,updatestatus)=>{
       try {
           const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/complaint/update-status/${id}`,{status:updatestatus},{
            headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },withCredentials:true
           })
           if(response.data){
             toast.success(response?.data?.message)
             setComplaints((prevcomplaint)=> prevcomplaint.map((complaint)=> complaint?._id === id ? {...complaint, status:updatestatus}:complaint))
           }
       } catch (error) {
          console.log("failed to update status",error)
          return toast.error(error?.response?.data?.message || "Internal server error")
       }
 }
  const updateStatuses = ["pending","review","progress","completed","cancelled",];
  const updated = new Date(complaint?.updatedAt)
//   const getValidImage = (img) => {
//   if (!img || img.trim() === "" || img === "undefined" || img === "null") {
//     return "/Noimage.svg";  // public folder fallback
//   }
//   // If img already a cloudinary full URL
//   if (img.startsWith("http")){
//     return img;
//   }
// };
const getValidImage = (img) => {
  if (!img || typeof img !== "string") {
    return "/unknownuser.webp";
  }
  // remove quotes if backend sent "undefined" / "null"
  const clean = img.trim().toLowerCase();
  if (clean === "" || clean === "undefined" || clean === "null") {
    return "/unknownuser.webp";
  }
  //  If cloudinary or any absolute URL
  if (img.startsWith("http://") || img.startsWith("https://")) {
    return img;
  }
   // If backend file but may not exist → fallback
  const fullUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${img}`;
  // Return BACKEND URL only if file extension exists
  if (img.includes(".")) {
    return fullUrl;
  }
  return "/unknownuser.webp";
};
  return (
    <Dialog>
        <DialogTrigger className="cursor-pointer" asChild>
            <span className="text-[#0A3D62]  font-semibold cursor-pointer text-sm border border-gray-300 rounded-md px-3 py-2">
               View
            </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-200 overflow-y-auto h-[80vh]">
          <div className="flex mt-5 sm:p-3 gap-3 flex-col ">
            <h3 className="text-[#0A3D62]   text-[1.2rem] font-semibold ">Complaint details</h3>
            <div className="bg-white  flex flex-col gap-4 border-gray-300">
                <div className="flex justify-between">
                    {/* left */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[#0A3D62]   text-[1rem] font-semibold ">Complaint #CMP-{complaint?._id.slice(0,7)}</h3>
                        <span className="flex gap-1 text-[0.8rem] text-gray-500">
                            {/* Water Karol Bagh, Zone 3 Received on Oct 24, 2024 */}
                            Category: {complaint?.category || "NA"} Address: {complaint?.address?.map((add)=> add.location) || "NA"} Zone: {complaint?.address.map((add)=> add.zone) || "NA"}
                        </span>
                        <div className="flex gap-1">
                        <span className={`px-2 py-1  ${complaint?.status === "completed" ? "bg-green-100 text-green-600" :complaint?.status === "pending"? "bg-yellow-100 text-yellow-600": complaint?.status === "review"? "bg-blue-100 text-blue-600": complaint?.status === "cancelled"? "bg-red-500 text-white": "bg-gray-300 text-black"}    rounded-full text-[0.7rem] font-semibold`}>
                          Status:{complaint?.status || "NA"}
                        </span>
                        </div>
                    </div>
                    {/* right */}
                    <div className="flex flex-col ">
                        <span className="text-[0.8rem] text-gray-500">Last updated: {new Date(updated).toLocaleDateString("en-US",{
                            month:"short",
                            day:"2-digit",
                            year:"numeric"
                        })}{""} at {updated.toLocaleTimeString("en-US",{
                            hour:"2-digit",
                            minute:"2-digit",
                            hour12:true,                        })}</span>
                        <span className="flex text-[0.8rem] gap-1 text-gray-500 ">Assigned officer:<span className="text-[0.8rem] text-[#0A3D62]">{complaint?.assignedTo || "NA"}</span>  </span>
                    </div>
                </div>
                <div className="flex rounded-md p-2 bg-[#EDF0F3] flex-col gap-2">
                    <span className="text-[#0A3D62]   text-[0.8rem] font-semibold ">Complaint Description</span>
                    <p className="bg-white text-[#0A3D62] font-normal p-2 text-[0.8rem] rounded-md">
                        {complaint?.description || "NA"}
                    </p>
                </div>
                <div className="flex  rounded-md p-2 bg-[#EDF0F3] flex-col gap-2">
                    <span className="text-[#0A3D62]   text-[0.8rem] font-semibold ">Citizen & Location Details</span>
                   <div className="flex flex-col gap-5 sm:gap-50  sm:flex-row">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                        <span className="text-gray-500 font-medium text-[0.8rem]">Citizen name</span>
                        <span className="text-[#0A3D62] font-medium text-[0.8rem]">{complaint?.citizenId?.name || "NA"}</span>
                        </div>
                        <div className="flex flex-col">
                        <span className="text-gray-500 font-medium text-[0.8rem]">Email</span>
                        <span className="text-[#0A3D62] font-medium text-[0.8rem]">{complaint?.citizenId?.email || "NA"}</span>
                        </div>
                     <div className="flex flex-col ">
                        <span className="text-gray-500 font-medium text-[0.8rem]">Ward/Zone</span>
                        <span className="text-[#0A3D62] font-medium text-[0.8rem]">
                            {complaint?.address?.map((add)=> add.ward).join(", ")}, {complaint?.address?.map((add)=> add.zone).join(", ")}
                        </span>
                    </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                        <span className="text-gray-500 font-medium text-[0.8rem]">Mobile</span>
                        <span className="text-[#0A3D62] font-medium text-[0.8rem]">{complaint?.citizenId?.phonesuffix} {complaint?.citizenId?.phonenumber || "NA"}</span>
                        </div>
                        <div className="flex flex-col">
                        <span className="text-gray-500 font-medium text-[0.8rem]">Preffered contact</span>
                        <span className="text-[#0A3D62] font-medium text-[0.8rem]">Mobile</span>
                        </div>
                     <div className="flex flex-col ">
                        <span className="text-gray-500 font-medium text-[0.8rem]">LandMark/Address</span>
                        <span className="text-[#0A3D62] font-medium text-[0.8rem]">Block B Market, Karol Bagh</span>
                    </div>
                    </div>
                   </div>
                </div>
                {/* uploaded photos */}
                <div className="flex  rounded-md p-2 bg-[#EDF0F3] flex-col gap-2">
                    <span className="text-[#0A3D62]   text-[0.8rem] font-semibold ">Uploaded photo (swipe right for view more images)</span>
                    <div className="flex rounded-lg gap-2 overflow-y-auto no-scrollbar">
                       {
                        complaint?.images?.map((img,index)=>{
                            // console.log("img:", img, "final:", getValidImage(img));
                            return (
                                <img src={getValidImage(img)} onError={(e) => {
                                  e.target.src = "/Noimage.svg";
                               }} key={index}  className="object-cover rounded-lg shrink-0"   />
                            )
                        })
                       }
                    </div>
                </div>
                <div className="flex flex-col items-center sm:flex-row gap-2">
                    <TableCell className="text-[#0A3D62]  px-4">
                      <Select onValueChange={(value) => handleComplaintStatusUpdate(complaint?._id,value)} >
                        <SelectTrigger>
                          <SelectValue placeholder="Status update" />
                        </SelectTrigger> 
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Update</SelectLabel>
                            {updateStatuses.map((status, index) => {
                              return (
                                <SelectItem
                                  key={index}
                                  className="cursor-pointer"
                                  value={status}
                                >
                                  {status}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell> 
                    <div className="flex items-center p-2 gap-2 ">
                        <label className="text-[#0A3D62] whitespace-nowrap font-semibold text-[0.9rem]">Assigned To:</label>
                        <Input type="text" placeholder="e.g Amit singh" />
                    </div>
                    <div >
                    <button className="px-4 py-2 cursor-pointer  text-[0.8rem] rounded-md bg-[#0A3D62] text-white">
                      Submit
                     </button>
                    </div>
                   
                </div>
            </div>
          </div>
        </DialogContent>
    </Dialog>
  )
}


export default ComplaintDetailsDialog
