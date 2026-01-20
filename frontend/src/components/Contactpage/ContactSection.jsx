"use client";

import {
  MapPin,
  Phone,
  Mail,
  AlertCircle,
} from "lucide-react";

const ContactSection = () => {
  return (
    <section className="bg-[#F5F7FA] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">

            {/* Head Office */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-[#0A3D62] font-semibold text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Head Office
              </h3>

              <div className="mt-4 space-y-4 text-sm text-gray-600">
                <div className="flex gap-3">
                  <div className="p-2 bg-[#F0F4F8] rounded-md">
                    <MapPin className="w-4 h-4 text-[#0A3D62]" />
                  </div>
                  <span>
                    Civic Center, Minto Road,<br />
                    New Delhi - 110002
                  </span>
                </div>

                <div className="flex gap-3">
                  <div className="p-2 bg-[#F0F4F8] rounded-md">
                    <Phone className="w-4 h-4 text-[#0A3D62]" />
                  </div>
                  <span>155305 (Toll Free)</span>
                </div>

                <div className="flex gap-3">
                  <div className="p-2 bg-[#F0F4F8] rounded-md">
                    <Mail className="w-4 h-4 text-[#0A3D62]" />
                  </div>
                  <span>support@mcd.gov.in</span>
                </div>
              </div>
            </div>

            {/* Emergency Helplines */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-[#0A3D62] font-semibold text-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Emergency Helplines
              </h3>

              <div className="mt-4 divide-y text-sm">
                {[
                  ["Sanitation Control Room", "011-23220000"],
                  ["Water Logging Issues", "155304"],
                  ["Stray Animal Catching", "011-23890011"],
                  ["Property Tax Helpline", "155305"],
                ].map(([label, number], i) => (
                  <div
                    key={i}
                    className="flex justify-between py-3 text-gray-700"
                  >
                    <span>{label}</span>
                    <span className="text-[#0A3D62] font-medium">
                      {number}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN – FORM */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 md:p-8 shadow-sm">
            <h3 className="text-[#0A3D62] font-semibold text-xl mb-6">
              Send us a Message
            </h3>

            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#0A3D62] font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    className="input"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#0A3D62] font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-[#0A3D62] font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input"
                />
              </div>

              <div>
                <label className="text-sm text-[#0A3D62] font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="input"
                />
              </div>

              <div>
                <label className="text-sm text-[#0A3D62] font-medium">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message here..."
                  className="input resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-[#0A3D62] text-white py-3 rounded-md font-semibold hover:bg-[#08304e] transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
