import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../service/ApiService";
import jwtDecode from "jwt-decode";
import ApiRoutes from "../../utils/ApiRoutes";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [userId, setUserId] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // New state to handle the image

  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 5MB limit

  // Extract user ID from token
  const getUserIdFromToken = () => {
    const token = sessionStorage.getItem("token"); // Or localStorage
    if (!token) {
      console.error("No token found.");
      return null;
    }

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.id; // Adjust to match your token's structure
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  // Fetch user data on mount
  useEffect(() => {
    const userId = getUserIdFromToken();
    setUserId(userId);

    if (!userId) {
      toast.error("Invalid or missing user ID.");
      return;
    }

    const fetchUserData = async () => {
      try {
        console.log(ApiRoutes.GET_USER_INFO_BY_ID.path);
        const response = await api.get(`${ApiRoutes.GET_USER_INFO_BY_ID.path}`);
       
        if (response.status === 200) {
          setUserData(response.data);
        } else {
          toast.error("User not found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
    setHasChanges(true);
  };

  // Handle image upload with size validation
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("Image size exceeds 5MB. Please choose a smaller file.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Store the base64 string
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile update
  const handleSave = async () => {
    if (!userId) {
      toast.error("User ID is missing.");
      return;
    }

    try {
      // Prepare data for the update request
      const profileData = {
        username: userData.username,
        email: userData.email,
        role: userData.role,
        profilePhoto: profileImage, // Base64 image
      };

      // Send update request
      const response = await api.put(`${ApiRoutes.UPDATE_USER.path}/${userId}`, profileData);

      if (response.status === 200) {
        toast.success("Profile updated successfully.");
        setEditMode(false);
        setHasChanges(false);
        setProfileImage(null); // Reset the uploaded image state
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error in updating profile.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-5 mb-5">
      {userData ? (
        <form className="space-y-4">
          {/* Username */}
          <div className="flex flex-col">
            <label className="font-semibold text-pink-600">Username</label>
            <input
              type="text"
              name="username"
              value={userData.username || ""}
              onChange={handleInputChange}
              disabled={!editMode}
              className={`border ${
                editMode ? "border-gray-500" : "border-gray-300"
              } rounded p-2 focus:outline-none focus:ring ${
                editMode ? "focus:ring-pink-600" : ""
              }`}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="font-semibold text-pink-600">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email || ""}
              onChange={handleInputChange}
              disabled={!editMode}
              className={`border ${
                editMode ? "border-gray-500" : "border-gray-300"
              } rounded p-2 focus:outline-none focus:ring ${
                editMode ? "focus:ring-pink-600" : ""
              }`}
            />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label className="font-semibold text-pink-600">Role</label>
            <input
              type="text"
              name="role"
              value={userData.role || ""}
              onChange={handleInputChange}
              disabled={!editMode}
              className={`border ${
                editMode ? "border-gray-500" : "border-gray-300"
              } rounded p-2 focus:outline-none focus:ring ${
                editMode ? "focus:ring-pink-600" : ""
              }`}
            />
          </div>

          {/* Profile Photo */}
          <div className="flex flex-col">
            <label className="font-semibold text-pink-600">Profile Photo</label>
            <input
              type="file"
              name="profilePhoto"
              onChange={handleImageUpload}
              disabled={!editMode}
              className="border rounded p-2 focus:outline-none"
            />
            {profileImage && (
              <div className="mt-2">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
              onClick={() => setEditMode(true)}
              disabled={editMode}
            >
              Edit
            </button>
            <button
              type="button"
              className={`py-2 px-4 rounded ${
                hasChanges
                  ? "bg-pink-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleSave}
              disabled={!hasChanges}
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
