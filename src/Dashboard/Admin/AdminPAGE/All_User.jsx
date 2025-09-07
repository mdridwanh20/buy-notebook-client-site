import React, { useState } from "react";
import useUser from "../../../Hook/useUser";
import { FaTrashAlt, FaEdit, FaUser } from "react-icons/fa";
import { HeadingH2 } from "../../../Components/ShareCompo/Typography";
import api from "../../../Hook/AxiosUrl";
import toast from "react-hot-toast";
import Loading from "../../../Components/ShareCompo/Loading";
import Swal from "sweetalert2";

export default function All_User() {
  const { userData, setUserData } = useUser();

  console.log(userData);

  // Role change handler
  const handlerRoleChange = async (userId, newRole) => {
    const updateUsers = userData.map((user) =>
      user._id === userId ? { ...user, role: newRole } : user
    );

    setUserData(updateUsers);
    console.log("Role updated", userId, newRole);

    try {
      await api.patch(`/users/${userId}`, { role: newRole });
      toast.success("seccssfully update the role");
      console.log("Role update on server", userId, newRole);
    } catch (error) {
      console.log("this is error from role update");
      toast.error("error update");
    }
  };

  // delete user
  const handlerDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d7",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await api.delete(`/users/${id}`);
          setUserData((presUser) => presUser.filter((user) => user._id !== id));
          console.log(response.data);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.log("Delete user error", response.data);
      toast.error("Delete user error");
    }
  };


  if (!userData || userData.length === 0) {
    return <Loading></Loading>;
  }
  

  return (
    <div className="pb-16">
      <div className="py-5 text-center">
        <HeadingH2 headH2={"All Users"}></HeadingH2>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto shadow-lg rounded-2xl">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="py-3 px-4">S/N</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {userData?.map((user, index) => (
              <tr key={user._id} className="border-t  hover:bg-gray-50">
                <td className="py-3 px-4">{index + 1}</td>

                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-gray-500" />
                    <p className="capitalize">{user.name}</p>
                  </div>
                </td>

                <td className="py-3  px-4">{user.email}</td>

                <td className="borer relative ">
                  <select
                    className="border
                    relative
                 
                    
                    focus:border-green-300 
                    focus:ring-0 
                    focus:ring-green-300 
                    border-green-500  
                    hover:border-green-600 
                    active:border-green-500

                    transition
                    ps-4 pe-8
                    outline-none
                    py-1 rounded  "
                    onChange={(e) =>
                      handlerRoleChange(user._id, e.target.value)
                    }
                    value={user.role || "user"}
                  >
                    <option className=" " value="user">
                      User
                    </option>

                    <option className=" " value="admin">
                      Admin{" "}
                    </option>
                  </select>
                </td>

                <td
                  onClick={() => handlerDelete(user._id)}
                  className="py-3 px-4 flex justify-center gap-3"
                >
                  <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden  space-y-4 w-full  rounded-xl ">
        {userData?.map((user, index) => (
          <div
            key={user._id}
            className="p-3 shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-[var(--primaryColor)] capitalize flex items-center gap-2">
                <FaUser className="text-gray-500" />
                {user.name}
              </p>
              <p className="text-sm text-gray-600">{user.email}</p>

              <span className="text-xs text-gray-500">
                Role: {user.role || "user"}
              </span>
            </div>

            <div className="flex gap-2">
              <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                <FaEdit />
              </button>
              <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
