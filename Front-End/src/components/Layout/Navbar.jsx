import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  User,
  LogIn,
  ShoppingCart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/Redux/AuthSlice";
import logo from "../../../src/assets/logo/image.png";
import { toast } from "sonner";

const navItems = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    submenu: [
      { title: "About Us", link: "/about" },
      {
        title: "Service",
        link: "/service",
      },
    ],
  },
  { title: "Menu", link: "/manu" },
  {
    title: "Chefs",
    link: "/chefs",
  },
  {
    title: "Blogs",
    link: "/blog",
  },
  { title: "Reservation", link: "/reservation" },
  {
    title: "Pages",
    submenu: [
      { title: "Single Post", link: "/post" },
      { title: "Quote", link: "/quote" },
    ],
  },
  { title: "Contact", link: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [openNestedMenu, setOpenNestedMenu] = useState({});
  const { isAuthenticate, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser())
      .then((data) => {
        console.log(data);
        if (data.payload.success) {
          toast.success(data.payload.message);
        } else {
          toast.error(data.payload.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleNestedMenu = (i, j) => {
    setOpenNestedMenu((prev) => ({
      ...prev,
      [`${i}-${j}`]: !prev[`${i}-${j}`],
    }));
  };

  return (
    <nav className="bg-transparent  w-full z-50 ">
      <div className="flex justify-between items-center px-4 lg:px-16 py-3 gap-8">
        <div className="flex items-center gap-2 justify-center">
          <img className="h-8" src={logo} alt="logo" />
          <h3 className="text-xl font-bold">Restro</h3>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:flex-1  lg:justify-end  space-x-6 ">
          {navItems.map((item, i) => (
            <div key={i} className="relative group">
              {item.link ? (
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `flex items-center gap-1 transition-all duration-300 ${
                      isActive ? "text-orange" : "text-hover-orange"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              ) : (
                <button className="flex items-center gap-1 text-hover-orange transition-all duration-300">
                  {item.title}
                  {item.submenu && <ChevronDown size={16} />}
                </button>
              )}

              {/* Submenu */}
              {item.submenu && (
                <div className="absolute left-0 top-full mt-2 bg-white border rounded shadow-lg opacity-0 origin-top scale-y-0 group-hover:scale-y-100 group-hover:opacity-100 invisible group-hover:visible transition-all duration-500 z-20">
                  {item.submenu.map((sub, j) => (
                    <div
                      key={j}
                      className="relative group/sub px-8 py-4 hover:bg-blue-100 cursor-pointer whitespace-nowrap"
                    >
                      {sub.link ? (
                        <Link to={sub.link}>{sub.title}</Link>
                      ) : (
                        <div className="flex justify-between items-center">
                          {sub.title}
                          {sub.nested && <ChevronRight size={14} />}
                        </div>
                      )}

                      {sub.nested && (
                        <div className="absolute top-0 left-full mt-0 ml-2 bg-white border rounded shadow-lg opacity-0 group-hover/sub:opacity-100 invisible group-hover/sub:visible transition-all z-30">
                          {sub.nested.map((nested, k) => (
                            <Link
                              key={k}
                              to={nested.link}
                              className="block px-8 py-4 hover:bg-blue-100 whitespace-nowrap"
                            >
                              {nested.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* action-button */}
        <div className="flex gap-4 border-red-700  rounded-lg  px-2 py-0.5 ">
          <button className="border-orange-700 text-orange-500   font-normal  hover:border-transparent p-1 rounded-md transition-all duration-300">
            {isAuthenticate && user ? (
              user.role === "Admin" ? (
                <div className="flex gap-1 justify-center items-center">
                  <Link to="/admin">
                    {" "}
                    <LayoutDashboard size={22} />{" "}
                  </Link>
                  <Link
                    className="hover:bg-orange-200 p-1 rounded-full"
                    to="/profile"
                  >
                    {" "}
                    <User size={22} />{" "}
                  </Link>
                  <Link
                    className="hover:bg-orange-200 p-1.5 rounded-full"
                    to="/cart"
                  >
                    {" "}
                    <ShoppingCart size={22} />{" "}
                  </Link>
                </div>
              ) : (
                <div className="flex gap-1 justify-center items-center">
                  <Link
                    className="hover:bg-orange-200 p-1 rounded-full"
                    to="/profile"
                  >
                    {" "}
                    <User size={22} />{" "}
                  </Link>
                  <Link
                    className="hover:bg-orange-200 p-1.5 rounded-full"
                    to="/cart"
                  >
                    {" "}
                    <ShoppingCart size={22} />{" "}
                  </Link>
                </div>
              )
            ) : (
              <Link to="/auth/login">
                {" "}
                <LogIn size={22} />{" "}
              </Link>
            )}
          </button>
          {isAuthenticate && user && (
            <button
              onClick={logout}
              className="border-orange-500 text-orange-500 border font-normal button-hover-orange hover:border-transparent p-1 rounded-md transition-all duration-300"
            >
              <LogOut size={22} />
            </button>
          )}
          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} className="lg:hidden text-orange-500">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={toggleMenu}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-3/4 md:w-2/5 bg-green-50 shadow-lg z-50 p-5 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold text-orange-600">Menu</span>
                <button
                  className="hover:text-orange-500 transition-all ease-in-out duration-300"
                  onClick={toggleMenu}
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col space-y-4">
                {navItems.map((item, i) => (
                  <div key={i}>
                    {item.link ? (
                      <NavLink
                        to={item.link}
                        onClick={toggleMenu}
                        className={({ isActive }) =>
                          `flex w-full text-left font-medium hover:bg-blue-100 px-2 py-1 rounded ${
                            isActive ? "text-orange" : "text-gray-700"
                          }`
                        }
                      >
                        {item.title}
                      </NavLink>
                    ) : (
                      <button
                        onClick={() =>
                          setOpenSubMenu(openSubMenu === i ? null : i)
                        }
                        className="flex justify-between items-center w-full text-left text-gray-700 font-medium hover:bg-blue-100 px-2 py-1 rounded"
                      >
                        {item.title}
                        {item.submenu && <ChevronDown size={16} />}
                      </button>
                    )}

                    {item.submenu && openSubMenu === i && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.submenu.map((sub, j) => (
                          <div key={j}>
                            {sub.link ? (
                              <Link
                                to={sub.link}
                                onClick={toggleMenu}
                                className="block hover:bg-blue-100 px-2 py-1 rounded"
                              >
                                {sub.title}
                              </Link>
                            ) : (
                              <button
                                className="flex justify-between items-center w-full hover:bg-blue-100 px-2 py-1 rounded"
                                onClick={() => toggleNestedMenu(i, j)}
                              >
                                {sub.title}
                                {sub.nested && <ChevronRight size={16} />}
                              </button>
                            )}

                            {sub.nested && openNestedMenu[`${i}-${j}`] && (
                              <div className="ml-4 mt-1 space-y-1">
                                {sub.nested.map((nested, k) => (
                                  <Link
                                    key={k}
                                    to={nested.link}
                                    onClick={toggleMenu}
                                    className="block hover:bg-blue-100 px-2 py-1 rounded"
                                  >
                                    {nested.title}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
