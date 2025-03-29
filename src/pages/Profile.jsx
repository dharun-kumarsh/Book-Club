import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiEdit3, FiCalendar, FiUser, FiBriefcase, FiSave, FiX } from "react-icons/fi";
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...storedUser });

  const departmentCode = editedUser.registerNumber?.slice(6, 9);
  const departmentName = departmentMap[departmentCode] || "Unknown Department";

  const formatDOB = (dob) => {
    if (!dob || dob.length < 8) return "DD/MM/YYYY";
    let cleanedDOB = dob.replace(/\D/g, "");
    return `${cleanedDOB.slice(0, 2)}/${cleanedDOB.slice(2, 4)}/${cleanedDOB.slice(4)}`;
  };

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("registeredUser", JSON.stringify(editedUser));
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditedUser({ ...storedUser });
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("registeredUser");
    toast.success("Logged out successfully!✅");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 overflow-hidden select-none bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen">
      <div className="p-12 rounded-3xl shadow-3xl shadow-purple-500 border border-purple-300 hover:scale-102 w-full max-w-4xl bg-white transition-all">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col items-start">
            <h2 className="text-4xl font-bold text-purple-800">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedUser.name || ""}
                  onChange={handleInputChange}
                  className="border rounded p-2 text-xl"
                />
              ) : (
                editedUser.name || "User Name"
              )}
            </h2>
            <p className="text-xl pt-3 text-gray-600">
              <FiBriefcase className="inline mr-1" /> {departmentName}
            </p>
          </div>
          {isEditing ? (
            <div className="flex">
              <button className="text-purple-600 hover:text-purple-800 transition mr-3" onClick={handleSave}>
                <FiSave className="text-3xl" />
              </button>
              <button className="text-red-600 hover:text-red-800 transition" onClick={handleCancel}>
                <FiX className="text-3xl" />
              </button>
            </div>
          ) : (
            <button className="text-purple-600 hover:text-purple-800 transition" onClick={() => setIsEditing(true)}>
              <FiEdit3 className="text-3xl" />
            </button>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-3xl text-purple-700 font-semibold mb-6 border-b pb-3">Profile Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileField
              label="Full Name"
              value={editedUser.name || "User Name"}
              icon={FiUser}
              isEditing={isEditing}
              name="name"
              onChange={handleInputChange}
              size="text-lg"
            />
            <ProfileField
              label="Register Number"
              value={editedUser.registerNumber || "311523205045"}
              icon={FiUser}
              isEditing={isEditing}
              name="registerNumber"
              onChange={handleInputChange}
              size="text-lg"
            />
            <ProfileField label="Department" value={departmentName} icon={FiBriefcase} size="text-lg"/>
            <ProfileField
              label="Date of Birth"
              value={formatDOB(editedUser.dob)}
              icon={FiCalendar}
              isEditing={isEditing}
              name="dob"
              onChange={handleInputChange}
              size="text-lg"
            />
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 bg-red-600 text-white px-6 py-4 rounded-lg hover:bg-red-700 transition transform hover:scale-105 shadow-md text-xl"
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

const ProfileField = ({ label, value, icon, isEditing, name, onChange, size }) => (
  <div className="flex items-start mb-4">
    {icon && <div className={`mr-4 text-purple-500 text-3xl`}>{React.createElement(icon)}</div>}
    <div className="flex flex-col">
      <label className={`text-gray-600 font-medium ${size}`}>{label}</label>
      {isEditing && name !== "department" ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className={`border rounded p-2 ${size}`}
        />
      ) : (
        <p className={`text-gray-800 ${size}`}>{value}</p>
      )}
    </div>
  </div>
);

export default Profile;