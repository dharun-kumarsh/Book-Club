import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiSave, FiLogOut } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Department mapping based on code
const departmentMap = {
  "103": "Civil Engineering",
  "104": "Computer Science & Engineering",
  "105": "Electrical & Electronics Engineering",
  "106": "Electronics & Communication Engineering",
  "114": "Mechanical Engineering",
  "205": "Information Technology",
};

function Profile() {
  const navigate = useNavigate();

  // Retrieve logged-in user details from local storage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {
    name: "User Name",
    registerNumber: "311523205045",
    phone: "9876543210",
    email: "user@example.com",
    profilePic: "",
  };

  // Extract department code from register number
  const departmentCode = loggedInUser.registerNumber?.slice(5, 8);
  const departmentName = departmentMap[departmentCode] || "Unknown Department";

  // Profile state
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    return (
      storedProfile || {
        name: loggedInUser.name,
        registerNumber: loggedInUser.registerNumber,
        phone: loggedInUser.phone,
        department: departmentName,
        email: loggedInUser.email,
        profilePic: loggedInUser.profilePic || "/default-avatar.png",
      }
    );
  });

  const [newProfile, setNewProfile] = useState(profile);

  // Save profile changes to local storage
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  const handleChange = (e) => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        setNewProfile({ ...newProfile, profilePic: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfile(newProfile);
    setIsEditing(false);
    localStorage.setItem("profile", JSON.stringify(newProfile));
    toast.success("Profile updated successfully! 🎉");
  };

  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("loggedInUser");
    toast.success("Logged out successfully! ✅");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center p-10 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl transition-all duration-300 transform hover:scale-105">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <img
              src={profile.profilePic || "/default-avatar.png"}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-gray-300 shadow-md transition-transform duration-500 hover:scale-110 cursor-pointer"
              onClick={() => document.getElementById("file-upload").click()} // Clicking image opens file input
            />
          </div>

          <h2 className="text-3xl font-semibold mt-4 text-gray-800">{profile.name}</h2>
          <p className="text-gray-500 text-lg">🎓 {profile.department}</p>
        </div>

        {/* Profile Details */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Profile Details</h3>
            {isEditing ? (
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition transform hover:scale-105"
              >
                <FiSave /> <span>Save</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition transform hover:scale-105"
              >
                <FiEdit /> <span>Edit</span>
              </button>
            )}
          </div>

          {/* Profile Info */}
          <div className="grid grid-cols-2 gap-4">
            <ProfileField
              label="Full Name"
              value={newProfile.name}
              isEditing={isEditing}
              name="name"
              handleChange={handleChange}
            />
            <ProfileField
              label="Register Number"
              value={profile.registerNumber}
              isEditing={false} // Register Number should not be editable
              name="registerNumber"
              handleChange={handleChange}
            />
            <ProfileField
              label="Department"
              value={profile.department}
              isEditing={false} // Department should not be editable
              name="department"
              handleChange={handleChange}
            />
            <ProfileField
              label="Email"
              value={newProfile.email}
              isEditing={isEditing}
              name="email"
              handleChange={handleChange}
            />
            <ProfileField
              label="Phone Number"
              value={profile.phone}
              isEditing={false} // Phone number should not be editable
              name="phone"
              handleChange={handleChange}
            />
          </div>

          {/* Logout Button */}
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

// Profile Field Component
const ProfileField = ({ label, value, isEditing, name, handleChange }) => (
  <div className="flex flex-col">
    <label className="text-gray-600 font-medium">{label}</label>
    {isEditing ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-105"
      />
    ) : (
      <p className="text-gray-800 transition-opacity duration-300">{value}</p>
    )}
  </div>
);

export default Profile;
