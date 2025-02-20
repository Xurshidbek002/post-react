import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoMdExit } from "react-icons/io";import { MdCategory, MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbBrandSafari } from "react-icons/tb";
import { CgWebsite } from "react-icons/cg";
import { FaLocationArrow } from "react-icons/fa";
import { SiThemodelsresource } from "react-icons/si";


function Layout() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("accessToken");
    navigate("/login", { replace: true });
  };
  return (
    <div>
      <div className="flex justify-between items-center px-5 bg-gray-600 py-5">
        <div className="text-5xl font-medium text-shadow-lg flex gap-2 text-white">
          <MdOutlineAdminPanelSettings />
          Admin panel

        </div>
        <div
          onClick={logOut}
          className="font-bold text-2xl text-white hover:text-red-600 flex items-center gap-1"
        >
          Log out
          <IoMdExit />
        </div>
      </div>
      <div className="grid grid-cols-10 h-[86vh]">
        <div className="col-span-1 bg-gray-600">
          <div className="flex flex-col items-center justify-between h-full pb-10">
            <div className="flex flex-col  text-white gap-5 px-2 pt-5">
              <NavLink
                className="font-medium flex gap-1 items-center hover:text-gray-400"
                activclassname="active"
                to="/"
              >
                <MdCategory />
                Category
              </NavLink>
              <NavLink
                className="font-medium flex gap-1 items-center hover:text-gray-400"
                activclassname="active"
                to="/brands"
              >
                <TbBrandSafari />
                Brands
              </NavLink>
              <NavLink
                className="font-medium flex gap-1 items-center hover:text-gray-400"
                activclassname="active"
                to="/location"
              >
                <FaLocationArrow />
                Location
              </NavLink>
              <NavLink
                className="font-medium flex gap-1 items-center hover:text-gray-400"
                activclassname="active"
                to="/model"
              >
                <SiThemodelsresource />
                Model
              </NavLink>
              <NavLink
                className="font-medium flex gap-1 items-center hover:text-gray-400"
                activclassname="active"
                to="/sites"
              >
                <CgWebsite />
                Sites
              </NavLink>
              
            </div>
            <button className="px-4 py-1 bg-blue-700 rounded-md  text-white hover:bg-blue-600">
              Button
            </button>
          </div>
        </div>
        <div className="col-span-9 px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
