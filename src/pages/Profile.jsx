import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const departmentMap = {
  "103": "Civil Engineering",
  "104": "Computer Science & Engineering",
  "105": "Electrical & Electronics Engineering",
  "106": "Electronics & Communication Engineering",
  "114": "Mechanical Engineering",
  "205": "Information Technology",
  "243": "Artificial Intelligence and Data Science",
};

function Profile() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("registeredUser")) || {};
  const { name, registerNumber, dob } = storedUser;

  const departmentCode = registerNumber?.slice(6, 9);
  const departmentName = departmentMap[departmentCode] || "Unknown Department";

  const formatDOB = (dob) => {
    if (!dob || dob.length < 8) return "DD/MM/YYYY"; 

    let cleanedDOB = dob.replace(/\D/g, ""); 
    return `${cleanedDOB.slice(0, 2)}/${cleanedDOB.slice(2, 4)}/${cleanedDOB.slice(4)}`;
  };

  const profile = {
    name: name || "User Name",
    registerNumber: registerNumber || "311523205045",
    dob: formatDOB(dob),
    department: departmentName,
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("registeredUser");
    toast.success("Logged out successfully! ✅");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center p-10 min-h-screen">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-2xl bg-white dark:bg-gray-800 dark:text-white transition-all">
       
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold mt-4">{profile.name}</h2>
          <p className="text-lg">{profile.department}</p>
        </div>

       
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Profile Details</h3>

          <div className="grid grid-cols-2 gap-4 font-semibold">
            <ProfileField label="Full Name" value={profile.name} />
            <ProfileField label="Register Number" value={profile.registerNumber} />
            <ProfileField label="Department" value={profile.department} />
            <ProfileField label="Date of Birth" value={profile.dob} />
          </div>

          
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition transform hover:scale-105"
            >
              <FiLogOut /> <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

const ProfileField = ({ label, value }) => (
  <div className="flex flex-col">
    <label className="text-gray-500 dark:text-gray-300 font-medium">{label}</label>
    <p>{value}</p>
  </div>
);

export default Profile;
