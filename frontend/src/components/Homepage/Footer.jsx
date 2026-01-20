"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-[#06263D] text-gray-300">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* About */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-lg">MCC Delhi</h3>
            <p className="text-sm leading-relaxed text-gray-300">
              The official civic engagement portal for the Municipal Corporation
              of Delhi. Promoting transparency and swift action.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/citizen/createcomplaint" className="hover:text-white transition">File Complaint</Link></li>
              <li><Link href="/track" className="hover:text-white transition">Track Status</Link></li>
              <li><Link href="/auth" className="hover:text-white transition">Department Login</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/help" className="hover:text-white transition">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/emergency" className="hover:text-white transition">Emergency Numbers</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">FAQs</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/citizen-charter" className="hover:text-white transition">Citizen Charter</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Bottom */}
      <div className="text-center py-6 text-xs text-gray-400">
        © 2026 Municipal Corporation of Delhi. All rights reserved.
        <br />
        Content owned by MCCD. Made by Nikhil Rana
      </div>
    </footer>
  );
};

export default Footer;
