"use client";
import { Input } from "@/components/ui/input";
import CategoryCard from "../../../components/citizen/CategoryCard";
import React, { useEffect, useRef, useState } from "react";
import { CameraIcon, Loader2, PlusCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const [previewImages, SetPreviewImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [description,setDescription] = useState("")
  const [address, setAddress] = useState({
 location: "",
  landmark: "",
  ward: "",
  zone: "",

  });
  const [Errors,setErrors] = useState({})
  const [title,setTitle] = useState("")
  const [loading,setloading] = useState(false)
  const router = useRouter()
  const handleAddress = (e)=>{
    const {name,value} = e.target
    setAddress((prev)=> ({...prev,[name]:value}))
    setErrors(prev => ({...prev,[name]:""}))
  }
  const ValidateError = ()=>{
     let newErrors={}

     if(!selectedCategory.trim()){
        newErrors.category = "Please Select a Category"
     }
     if(!title.trim()){
        newErrors.title = "Title is Required"
     }
     if(!address.location.trim()){
        newErrors.location = "Location is Required"
     }
      if(!address.landmark.trim()){
        newErrors.landmark = "Landmark is Required"
     }
     if(!address.ward.trim()){
        newErrors.ward = "Ward is Required"
     }
     if(!address.zone.trim()){
        newErrors.zone = "Zone is Required"
     }
     if(!description.trim()){
        newErrors.description = "Description is Required"
     }
     setErrors(newErrors)
     return Object.keys(newErrors).length === 0

  }
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if(previewImages.length + files.length > 4){
     toast.error("Maximum 4 images allowed")
     return;
    }
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    SetPreviewImages((prev) => [...prev, ...previews]);
    setSelectedImages((prev) => [ ...prev, ...files ]);
  };
  // store latest previews in ref to use in cleanup
  const previewRef = useRef(previewImages);
  //  update ref whenever previewImages state changes
  useEffect(() => {
    previewRef.current = previewImages;
  }, [previewImages]);
  const handleDeleteImage = (index) => {
    SetPreviewImages((prev)=>{
        URL.revokeObjectURL(prev[index].url);
        return prev.filter((_, i)=> i !== index)
    })
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };
   // cleanup object URLs on unmount (use ref to access latest previews)
  useEffect(()=>{
    return ()=>{
        previewRef.current.forEach((p)=> URL.revokeObjectURL(p.url))
    }
  },[])

  //send data to backend
  const onSubmit = async()=>{
    if(!ValidateError()) return ;
    let formdata = new FormData()
    formdata.append("category",selectedCategory)
    formdata.append("address",JSON.stringify(address))
    formdata.append("description",description)
    formdata.append("title",title)
    selectedImages.forEach((file)=>{
            formdata.append("images",file)
        })    
    // for(let pair of formdata.entries()){
    //     console.log(pair[0],pair[1])
    // }
    // console.log("data",formdata)
    try {
         setloading(true)
         const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/complaint/create-complaint`,formdata,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
         })
         if(response.data){
            toast.success(response?.data?.message)
            router.replace("/citizen/complaints")
         }
    } catch (error) {
        console.log("failed to submit complaint")
        return toast.error(error?.response?.data?.message || "Internal server error")
    }
  }   
  return (
    <div className="flex flex-col">
      <div className="flex px-4  border-b py-6 bg-white ">
        <span className="text-[#0A3D62]   text-[1.2rem] font-semibold ">
          Register New Complaint
        </span>
      </div>
      {/* create complaint form */}
      <div className="flex py-4  justify-center ">
        <div className="bg-white w-full md:w-[700px] rounded-md flex flex-col gap-2">
          {/* Category*/}
          <div className="flex flex-col p-7 gap-5 border-b ">
            <div className="flex items-center gap-5">
              <span className="rounded-full px-4 py-2 text-white bg-[#0A3D62]">
                1
              </span>
              <span className="text-[#0A3D62]  text-[1rem] font-semibold ">
                Select Category
              </span>
            </div>
            {/* category cards */}
            <div>
              <CategoryCard selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}  />
            </div>
             {Errors.category && (
                <p className='text-red-500 text-[0.8rem]'>{Errors.category}</p>
            )}

          </div>
          {/* location */}
          <div className="flex flex-col border-b p-7 gap-5  ">
            <div className="flex items-center gap-5">
              <span className="rounded-full px-4 py-2 text-white bg-[#0A3D62]">
                2
              </span>
              <span className="text-[#0A3D62]  text-[1rem] font-semibold ">
                Location Details
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col p-3 gap-2">
                <span className="text-[#0A3D62]  text-[0.8rem] font-semibold ">
                  Complaint location
                </span>
                <Input
                  name="location"
                  value={address.location}
                  onChange={handleAddress}
                  type="text"
                  className="w-full px-3 py-2"
                  placeholder="Enter address "
                />
                {Errors.location && (
                <p className='text-red-500 text-[0.8rem]'>{Errors.location}</p>
               )}
              </div>
              <div className="flex flex-col p-3 gap-2">
                <span className="text-[#0A3D62]  text-[0.8rem] font-semibold ">
                  Complaint landmark
                </span>
                <Input
                  type="text"
                  name="landmark"
                  value={address.landmark}
                   onChange={handleAddress}
                  className="w-full px-3 py-2"
                  placeholder="Enter Landmark "
                />
                 {Errors.landmark && (
                <p className='text-red-500 text-[0.8rem]'>{Errors.landmark}</p>
               )}
              </div>
              <div className="flex flex-col p-3 gap-2">
                <span className="text-[#0A3D62]  text-[0.8rem] font-semibold ">
                  Complaint ward
                </span>
                <Input
                  type="text"
                  name="ward"
                  value={address.ward}
                   onChange={handleAddress}
                  className="w-full px-3 py-2"
                  placeholder="Enter Ward "
                />
                 {Errors.ward && (
                <p className='text-red-500 text-[0.8rem]'>{Errors.ward}</p>
               )}
              </div>
              <div className="flex flex-col p-3 gap-2">
                <span className="text-[#0A3D62]  text-[0.8rem] font-semibold ">
                  Complaint Zone
                </span>
                <Input
                  type="text"
                  name="zone"
                  value={address.zone}
                   onChange={handleAddress}
                  className="w-full px-3 py-2"
                  placeholder="Enter Zone"
                />
                 {Errors.zone && (
                <p className='text-red-500 text-[0.8rem]'>{Errors.zone}</p>
               )}
              </div>
            </div>
          </div>
          {/* complaint details */}
          <div className="flex flex-col p-7 gap-5  ">
            <div className="flex items-center gap-5">
              <span className="rounded-full px-4 py-2 text-white bg-[#0A3D62]">
                3
              </span>
              <span className="text-[#0A3D62]  text-[1rem] font-semibold ">
                Complaint Details
              </span>
            </div>
             <div className="flex  flex-col gap-2">
              <span className="text-[#0A3D62]  text-[0.8rem] font-semibold ">
                title
              </span>
              <Input
                name="title"
                className="w-full px-3 py-2"
                placeholder="Enter title"
                onChange={(e)=>setTitle(e.target.value)}
              />
               {Errors.title && (
                <p className='text-red-500 text-[0.8rem]'>{Errors.title}</p>
               )}
            </div>
            <div className="flex  flex-col gap-2">
              <span className="text-[#0A3D62]  text-[0.8rem] font-semibold ">
                Description
              </span>
              <textarea
                onChange={(e)=>setDescription(e.target.value)}
                className="border rounded-md px-3 py-2"
                placeholder="Please describe the issues(e.g; specific location, duration of the problem,severity..."
              />
               {Errors.description && (
                <p className='text-red-500 text-[0.8rem]'>{Errors.description}</p>
               )}
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#0A3D62]  text-[0.8rem] font-semibold ">
                Evidence (optional)
              </span>
              <div className="w-full items-center flex p-2 flex-col  justify-center bg-[#E9EDF2] border rounded-md">
                <div className="flex p-5  flex-col gap-1">
                  <label
                    htmlFor="images"
                    className="flex items-center flex-col gap-2 cursor-pointer text-black "
                  >
                    {previewImages?.length === 0 && (
                      <>
                        <CameraIcon />
                        <span className="text-[#0A3D62]  text-[1rem] font-semibold ">
                          Click to upload Image
                        </span>
                        <span className="text-gray-400 text-center text-[0.7rem]">
                          Jpg,Png up to 5MB, Max Images: 4
                        </span>
                      </>
                    )}
                    {previewImages?.length > 0 && (
                      <span className="flex  gap-3 text-[#767676]">
                        <PlusCircleIcon /> Add More
                      </span>
                    )}
                  </label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                    id="images"
                    name="images"
                  />
                </div>
                {/* preview */}
                <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
                  {previewImages?.map((img, index) => {
                    return (
                      <div key={index} className="relative group">
                        <img
                          src={img.url}
                          alt="preview"
                          className="w-full h-50 object-cover rounded-lg shadow-md"
                        />
                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(index)}
                          className="absolute top-2 cursor-pointer right-2 bg-[#0A3D62] text-white px-2 py-1 text-sm rounded-md opacity-0 group-hover:opacity-100 transition"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="justify-end flex p-7">
            <button onClick={()=> onSubmit()} className="px-6 border bg-[#0A3D62] cursor-pointer text-white font-semibold rounded-md py-2">
                {loading ? <Loader2 className="mx-auto w-4 h-4 animate-spin"/> : " Submit Complaint"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
