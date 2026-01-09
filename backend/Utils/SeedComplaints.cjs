const dotenv = require("dotenv")
const mongoose = require("mongoose")
const path = require("path");

dotenv.config()

const Complaint = require("../Models/ComplaintModel");


// // Path fix
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("Failed to connect DB:", err);
    process.exit(1);
  }
};

// Random data sources
const categories = ["road", "water", "electricity", "garbage", "streetlight", "parks", "other"];
const statuses = ["pending", "review", "progress", "completed", "cancelled"];

const locations = [
  "Main Market Road", "Green Park Colony", "MG Road", "Shastri Nagar",
  "Civil Lines", "Sector 22", "Old Town", "Vasant Vihar",
  "Rose Avenue", "Lake View Road"
];

const landmarks = [
  "Near City Mall", "Near Community Center", "Bus Stop",
  "Govt School", "Petrol Pump", "Hospital Gate"
];

const wards = ["Ward 1", "Ward 2", "Ward 5", "Ward 7", "Ward 9", "Ward 12"];
const zones = ["North Zone", "South Zone", "East Zone", "West Zone"];

// Generate random past date within last 30 days
const randomPastDate = () => {
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

// Generate 30 random complaints
const generateComplaints = () => {

  const citizenId = "695cf126eea2f92231e35e64"
  const mcId = "695613e587caeb971d3321b1"

  const complaints = [];

  for (let i = 0; i < 30; i++) {
    complaints.push({
      citizenId,
      mcId,
      title: `Issue reported regarding ${categories[Math.floor(Math.random() * categories.length)]}`,
      description: "This issue has been affecting the residents. Immediate attention is required to resolve the matter properly.",
      status: statuses[Math.floor(Math.random() * statuses.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      images: [`image_${i + 1}.jpg`],
      address: [
        {
          location: locations[Math.floor(Math.random() * locations.length)],
          landmark: landmarks[Math.floor(Math.random() * landmarks.length)],
          ward: wards[Math.floor(Math.random() * wards.length)],
          zone: zones[Math.floor(Math.random() * zones.length)]
        }
      ],
      assignedTo: "Municipal Dept",
      createdAt: randomPastDate(),
      updatedAt: randomPastDate()
    });
  }

  return complaints;
};

const seedComplaints = async () => {
  try {
    await connectDB();

    const complaints = generateComplaints();

    await Complaint.insertMany(complaints);

    console.log("Successfully inserted 30 random complaints!");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedComplaints();
