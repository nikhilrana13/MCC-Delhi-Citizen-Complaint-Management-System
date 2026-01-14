"use client";
import ProfileDropdown from "../../../components/commen/ProfileDropdown";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaClipboardList } from "react-icons/fa";
import { CgLock } from "react-icons/cg";
import { BsArrowRight, BsEye } from "react-icons/bs";
import { BiCheckCircle } from "react-icons/bi";
import StatsCards from "../../../components/mcadmin/StatsCards.jsx";
import axios from "axios";
import StatsCardShimmer from "../../../components/mcadmin/StatsCardsShimmer";
import ComplaintsByCategory from "../../../components/mcadmin/charts/ComplaintsByCategory";
import StatusDonet from "../../../components/mcadmin/charts/StatusDonet";
import ChartsShimmer from "../../../components/mcadmin/charts/ChartsShimmer";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import ComplaintsTableShimmer from "../../../components/mcadmin/TableShimmerCard";

const page = () => {
  const user = useSelector((state) => state.Auth.user);
  const [loading, setloading] = useState(false);
  const [tableLoading, setTableloading] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [statsState, setstatsState] = useState({
    totalcomplaints: 0,
    pending: 0,
    review: 0,
    resolved: 0,
  });
  //  fetch complaints status
  useEffect(() => {
    const fetchComplaintsStats = async () => {
      try {
        setloading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/complaint/mcadmin/status`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        if (response.data) {
          const total = response?.data?.data?.total;
          const pending = response?.data?.data?.pending;
          const resolved = response?.data?.data?.resolved;
          const inprogress = response?.data?.data?.inprogress;
          setstatsState((prev) => ({
            ...prev,
            totalcomplaints: total,
            pending: pending,
            resolved: resolved,
            review: inprogress,
          }));
        }
      } catch (error) {
        console.log("failed to fetch complaint status", error);
      } finally {
        setloading(false);
      }
    };
    fetchComplaintsStats();
  }, []);
  // fetch complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setTableloading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/complaint/all-complaints`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        // console.log("response",response.data)
        if (response.data) {
          setComplaints(response?.data?.data?.complaints);
        }
      } catch (error) {
        console.log("failed to fetch complaints", error);
      } finally {
        setTableloading(false)
      }
    };
    fetchComplaints();
  }, []);
  // console.log("complaints", complaints);
  const stats = [
    {
      title: "Total Complaints",
      value: statsState.totalcomplaints || 0,
      subtitle: "+12.5% from last month",
      icon: FaClipboardList,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      subColor: "text-green-600",
    },
    {
      title: "Pending",
      value: statsState.pending || 0,
      subtitle: "Needs attention",
      icon: CgLock,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      subColor: "text-yellow-600",
    },
    {
      title: "In Review",
      value: statsState.review || 0,
      subtitle: "Currently processing",
      icon: BsEye,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      subColor: "text-gray-400",
    },
    {
      title: "Resolved",
      value: statsState.resolved || 0,
      subtitle: "+8.2% completion rate",
      icon: BiCheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      subColor: "text-green-600",
    },
  ];

  const statusDonutdata = [
    { name: "Resolved", value: statsState.resolved || 0, color: "#22c55e" },
    { name: "Pending", value: statsState.pending || 0, color: "#facc15" },
    { name: "In Review", value: statsState.review || 0, color: "#0f172a" },
  ];
  const total = statsState.totalcomplaints || 0;

  return (
    <div className="flex flex-col">
      <div className="flex px-4 items-center py-3 bg-white justify-between">
        <span className="text-[#0A3D62]   text-[1.2rem] font-semibold ">
          Overview
        </span>
        {/* profile dropdown */}
        <ProfileDropdown user={user} />
      </div>
      <div className="flex flex-col px-4 py-3 ">
        {/* status cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <>
              {[1, 2, 3, 4].map((_, index) => {
                return <StatsCardShimmer key={index} />;
              })}
            </>
          ) : (
            stats?.map((item, index) => {
              const Icon = item.icon;
              return (
                <StatsCards
                  key={index}
                  title={item.title}
                  iconBg={item.iconBg}
                  iconColor={item.iconColor}
                  value={item.value}
                  subtitle={item.subtitle}
                  Icon={Icon}
                  subColor={item.subColor}
                />
              );
            })
          )}
        </div>
        {/* complaints graphs */}
        {loading ? (
          <ChartsShimmer />
        ) : (
          <div className="flex  w-full mt-10 flex-col md:flex-row gap-3">
            <ComplaintsByCategory />
            <StatusDonet statusDonetdata={statusDonutdata} total={total} />
          </div>
        )}
        {/* recent complaints */}
        <div className="flex mt-10 rounded-md border border-gray-300 flex-col">
          <div className="flex  items-center rounded-md bg-white px-3 py-4 justify-between">
            <span className="text-[#0A3D62] font-semibold">
              Recent Complaints
            </span>
            <Link
              href="/mcadmin/complaints"
              className="flex px-3 border rounded-md  font-semibold text-[0.8rem] items-center border-gray-300 text-[#0A3D62] py-2 gap-2"
            >
              View All <BsArrowRight />
            </Link>
          </div>
          {/* Table */}
          {tableLoading ? (
            <div>
               <ComplaintsTableShimmer />
            </div>
          ) : complaints?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-none bg-[#E9EEF4] text-gray-400">
                  <TableHead className="py-5 px-4">ID</TableHead>
                  <TableHead className="py-5 px-4">CATEGORY</TableHead>
                  <TableHead className="py-5 px-4">AREA</TableHead>
                  <TableHead className="py-5 px-4">DATE</TableHead>
                  <TableHead className="py-5 px-4 text-right">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints?.slice(0,5).map((complaint) => (
                  <TableRow key={complaint?._id} className="border-b bg-white! border-gray-300">
                    <TableCell className="font-semibold text-[#0A3D62] px-4 py-6">
                     #CMP-{complaint?._id.slice(-6) || "NA"}
                    </TableCell>
                    <TableCell className="text-[#0A3D62] px-4">
                      {complaint?.category || "NA"}
                    </TableCell>
                    <TableCell className="text-[#0A3D62]  px-4">
                       {complaint?.address?.map(add => `${add.location} (${add.zone})`).join(", ") || "NA"}
                    </TableCell>
                    <TableCell className="text-[#0A3D62] px-4">
                      {new Date(complaint?.createdAt).toLocaleDateString("en-US",{
                        month:"short",day:"2-digit",year:"numeric"
                      }) || "NA"}
                    </TableCell>
                    <TableCell className="text-right px-4">
                      <span
                        className={`px-3 py-2  rounded-full text-xs font-semibold
                  ${
                    complaint?.status === "resolved"
                      ? "bg-green-100 text-green-600"
                      : complaint.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }
                    `}
                      >
                        {complaint?.status}
                      </span>
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
      </div>
    </div>
  );
};

export default page;



