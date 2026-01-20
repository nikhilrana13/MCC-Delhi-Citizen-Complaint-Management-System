import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../providers/ReduxProvider.jsx";
import PersistProvider from "../providers/PersistProvider";
import ToastProvider from "../providers/ToastProvider";
import NetworkProvider from "./NetworkProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], }); 
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], });



export const metadata = {
  title: {
    default: "MCC Delhi – Civic Complaint Portal",
    template: "%s | MCC Delhi",
  },
  description:
    "Official Municipal Corporation of Delhi portal to register civic complaints, track grievance status, and ensure faster resolutions.",
  keywords: [
    "MCC Delhi",
    "Municipal Corporation of Delhi",
    "Civic Complaint",
    "Public Grievance Portal",
    "Delhi Complaints",
    "Garbage Complaint Delhi",
    "Water Supply Complaint Delhi",
  ],
  authors: [{ name: "Municipal Corporation of Delhi" }],
  creator: "MCC Delhi",
  metadataBase: new URL("https://mccdelhi.gov.in"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
      <NetworkProvider>
        <ReduxProvider>
      <PersistProvider>
        <ToastProvider />
         {children}
      </PersistProvider>
      </ReduxProvider>
      </NetworkProvider>  
      </body>
    </html>
  );
}
