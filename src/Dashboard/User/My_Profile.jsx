import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../AuthProver/AuthProver";
import api from "../../Hook/AxiosUrl";
import Loading from "../../Components/ShareCompo/Loading";

export default function My_Profile() {
  const { user } = useContext(MyContext);
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (!user?.email) return;

    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${user?.email}`);
        setUserInfo(res.data);
        setFormData({
          phone: res.data.phone || "", // keep empty string if no phone
          address: res.data.address || "", // keep empty string if no address
        });
      } catch (error) {
        console.log("this is error from user profile", error);
      }
    };

    fetchUser();
  }, [user?.email]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${user?.email}`, formData);
      setUserInfo({ ...userInfo, ...formData }); // update UI instantly
      alert("Profile updated successfully!");
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };



  if (!userInfo)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading></Loading>
      </div>
    );

    const userImage = "https://thumb.ac-illust.com/51/51e1c1fc6f50743937e62fca9b942694_t.jpeg"


  return (
    <div className="flex py-10 justify-center items-center">
      <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 w-full max-w-md">
        {/* Profile Image + Name */}
        <div className="flex flex-col items-center text-center">
          
          <img
           src={userInfo.photoURL ? userInfo.photoURL : userImage} 
            className="w-28 h-28  rounded-full border-1 border-indigo-100  object-cover"
            alt="User Profile"
          />

          

          <h1 className="text-2xl font-bold mt-4">
            {userInfo.name || "No name provided"} {/* ✅ Show message if name missing */}
          </h1>

          <p className="text-gray-500">
            {userInfo.email || "No email available"} {/* ✅ Show message if email missing */}
          </p>

        </div>

        {/* Profile Info Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Role */}
          <div className="flex justify-between border-green-500 items-center border-b pb-2">
            <span className="font-semibold text-gray-700">Role</span>
            <span className="text-indigo-600 capitalize font-medium">
              {userInfo.role || "Not provided"} {/* ✅ Show message if role missing */}
            </span>
          </div>

          {/* Created Time */}
          <div className="flex justify-between border-green-500 text-sm items-center border-b pb-2">
            <span className="font-semibold text-gray-700">Created Time:</span>
            <span className="text-gray-600">
              {userInfo.createAt || "Not available"} {/* ✅ Show message if createAt missing */}
            </span>
          </div>

          {/* Editable Phone */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Phone</label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 p-2 border border-green-500 rounded-lg outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter phone number"
            />
            {!formData.phone && ( // ✅ Show small message if phone is empty
              <span className="text-xs text-gray-400 mt-1">
                No phone number provided
              </span>
            )}
          </div>

          {/* Editable Address */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 border border-green-500 rounded-lg outline-none"
              placeholder="Enter address"
            />
            {!formData.address && ( // ✅ Show small message if address is empty
              <span className="text-xs text-gray-400 mt-1">
                No address provided
              </span>
            )}
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="mt-4 cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
}
