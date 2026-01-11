"use client";
import ProfileDropdown from "../../../components/commen/ProfileDropdown";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import Link from "next/link";
import axios from "axios";
import ComplaintsTableShimmer from "@/src/components/mcadmin/TableShimmerCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import toast from "react-hot-toast";
import ComplaintDetailsDialog from "@/src/components/mcadmin/ComplaintDetailsDialog";

const page = () => {
  const user = useSelector((state) => state.Auth.user);
  const [Complaints, setComplaints] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setloading] = useState(false);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const AllStatuses = [
    "all",
    "pending",
    "review",
    "progress",
    "completed",
    "cancelled",
  ];
  const AllCategories = [
    "all",
    "road",
    "water",
    "electricity",
    "garbage",
    "streetlight",
    "parks",
    "other",
  ];

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setloading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/complaint/all-complaints`,
          {
            params: {
              status: status,
              category: category,
              page: page,
              limit:10,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        // console.log("response", response.data);
        if (response.data) {
          setComplaints(response?.data?.data?.complaints);
          setPagination(response?.data?.data?.pagination);
        }
      } catch (error) {
        console.log("failed to fetch complaints", error);
      } finally {
        setTimeout(() => {
          setloading(false);
        }, 3000);
      }
    };
    fetchComplaints();
  }, [status, category, page]);

  const start = (pagination?.currentPage - 1) * pagination.limit + 1;
  const end = Math.min(
    pagination?.currentPage * pagination?.limit,
    pagination?.totalcomplaints
  );
  return (
    <>
      <div className="flex px-4 items-center py-3 bg-white justify-between">
        <span className="text-[#0A3D62]   text-[1.2rem] font-semibold ">
          Complaints Management
        </span>
        {/* profile dropdown */}
        <ProfileDropdown user={user} />
      </div>
      <div className="flex px-4 py-3  flex-col gap-3 md:gap-5">
        <div className="flex flex-col gap-3 py-4 md:flex-row md:justify-between">
          <div className="flex gap-3">
            {/* status */}
            <Select onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="w-[180px">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>All Statuses</SelectLabel>
                  {AllStatuses.map((status, index) => {
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
            {/* category */}
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>All Categories</SelectLabel>
                  {AllCategories.map((category, index) => {
                    return (
                      <SelectItem
                        key={index}
                        className="cursor-pointer"
                        value={category}
                      >
                        {category}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
            <button className="bg-white cursor-pointer border text-[0.8rem] font-semibold rounded-md border-gray-300 px-4 py-2 text-[#0A3D62]">
              Export CSV
            </button>
          
        </div>
        {/* Complaints */}
        <div className="border border-gray-300 rounded-md w-full no-scrollbar overflow-y-auto h-[60vh]">
          {loading ? (
            <ComplaintsTableShimmer />
          ) : Complaints?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-none bg-[#E9EEF4] text-gray-400">
                  <TableHead className="py-5 px-4">COMPLAINT ID</TableHead>
                  <TableHead className="py-5 px-4">CATEGORY</TableHead>
                  <TableHead className="py-5 px-4">AREA</TableHead>
                  <TableHead className="py-5 px-4">CITIZEN NAME</TableHead>
                  <TableHead className="py-5  px-4">CREATED DATE</TableHead>
                  <TableHead className="py-5 px-4">STATUS</TableHead>
                  <TableHead className="py-5 px-4 ">VIEW</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Complaints?.map((complaint) => (
                  <TableRow
                    key={complaint?._id}
                    className="border-b bg-white! border-gray-300"
                  >
                    <TableCell className="font-semibold text-[#0A3D62] px-4 py-6">
                      #CMP-{complaint?._id?.slice(1,6) || "NA"}
                    </TableCell>
                    <TableCell className="text-[#0A3D62] px-4">
                      {complaint?.category || "NA"}
                    </TableCell>
                    <TableCell className="text-[#0A3D62]  px-4">
                      {complaint?.address
                        ?.map((add) => `${add.location} (${add.zone})`)
                        .join(", ") || "NA"}
                    </TableCell>
                    <TableCell className="text-[#0A3D62]  px-4">
                      {complaint?.citizenId?.name || "NA"}
                    </TableCell>
                    <TableCell className="text-[#0A3D62] px-4">
                      {new Date(complaint?.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        }
                      ) || "NA"}
                    </TableCell>
                    <TableCell className="px-4">
                      <span
                        className={`px-3 py-2  rounded-full text-xs font-semibold
                  ${
                    complaint?.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : complaint.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : complaint.status === "review"
                      ? "bg-blue-100 text-blue-600"
                      : complaint.status === "cancelled"
                      ? "bg-red-500 text-white"
                      : "bg-gray-300 text-black"
                  }
                    `}
                      >
                        {complaint?.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-[#0A3D62]  px-4">
                      <ComplaintDetailsDialog complaint={complaint} setComplaints={setComplaints} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-10 text-center text-gray-400">
              No complaints found
            </div>
          )}
        </div>
        {/* pagination */}
        {!loading &&
          (pagination.totalcomplaints > 0 ? (
            <div className="bg-white py-3 px-4 items-center rounded-md border-t flex justify-between">
              <span className="text-[#747474] text-[0.9rem] sm:text-[0.8rem] font-[600]">
                Showing {start || "NA"}-{end || "NA"} of{" "}
                {pagination?.totalcomplaints || 0} results
              </span>
              <div>
                <Pagination className="flex gap-2">
                  <PaginationContent>
                    <PaginationItem
                      className={`${
                        page === 1
                          ? "Opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }  `}
                    >
                      <PaginationPrevious
                        onClick={() => {
                          if (page > 1) {
                            setPage((prev) => prev - 1);
                          }
                        }}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink className="p-3">
                        {pagination?.currentPage} of {pagination?.totalPages}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem
                      className={`${
                        page === 1
                          ? "Opacity-50 cursor-not-allowed"
                          : " cursor-pointer"
                      }  `}
                    >
                      <PaginationNext
                        onClick={() => {
                          if (page < pagination?.totalPages) {
                            return setPage((prev) => prev + 1);
                          }
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          ) : (
            <p className="text-[0.9rem] text-center mt-5  sm:text-[0.8rem]  text-[#747474]">
              No complaints found
            </p>
          ))}
      </div>
    </>
  );
};

export default page;
