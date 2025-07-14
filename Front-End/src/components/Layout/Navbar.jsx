import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/Redux/AuthSlice";

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
      { title: "Support", link: "/support" },
    ],
  },
  { title: "Contact", link: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [openNestedMenu, setOpenNestedMenu] = useState({});
  const { isAuthenticate, user } = useSelector((state) => state.auth);

  const location = useLocation();
  const path = location.pathname;
  const dispatch=useDispatch()

  const logout=()=>{
   
    dispatch(logoutUser()
    )}

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleNestedMenu = (i, j) => {
    setOpenNestedMenu((prev) => ({
      ...prev,
      [`${i}-${j}`]: !prev[`${i}-${j}`],
    }));
  };

  return (
    <nav className="bg-transparent  w-full z-50 ">
      <div className="flex justify-between items-center px-4 lg:px-16 py-3">
        <div className="flex justify-center">
          <h3 className="text-xl font-bold">Rasoi Reverie</h3>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((item, i) => (
            <div key={i} className="relative group">
              {item.link ? (
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `flex items-center gap-1 transition-all duration-300 ${
                      isActive ? "text-orange" : "text-hover-orange"
                    }`
                  }>
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
                <div className="absolute left-0 top-full mt-2 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-20">
                  {item.submenu.map((sub, j) => (
                    <div
                      key={j}
                      className="relative group/sub px-8 py-4 hover:bg-blue-100 cursor-pointer whitespace-nowrap">
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
                              className="block px-8 py-4 hover:bg-blue-100 whitespace-nowrap">
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

          <button className="border-green-700 border font-normal button-hover-orange hover:border-transparent py-2 px-5 rounded-md transition-all duration-300">
            {isAuthenticate && user ? (
              user.role === "Admin" ? (
                <Link to="/admin">Dashbord</Link>
              ) : (
                <Link to="/profile">Profile</Link>
              )
            ) : (
              <Link to="/auth/login">Log In</Link>
            )}
          </button>
          {isAuthenticate && user &&
              (<button onClick={logout} className="border-green-700 border font-normal button-hover-orange hover:border-transparent py-2 px-5 rounded-md transition-all duration-300">
                Logout
          
                </button>)}
          
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="lg:hidden text-gray-700">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
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
              className="fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg z-50 p-5 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold text-blue-900">Menu</span>
                <button onClick={toggleMenu}>
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
                        }>
                        {item.title}
                      </NavLink>
                    ) : (
                      <button
                        onClick={() =>
                          setOpenSubMenu(openSubMenu === i ? null : i)
                        }
                        className="flex justify-between items-center w-full text-left text-gray-700 font-medium hover:bg-blue-100 px-2 py-1 rounded">
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
                                className="block hover:bg-blue-100 px-2 py-1 rounded">
                                {sub.title}
                              </Link>
                            ) : (
                              <button
                                className="flex justify-between items-center w-full hover:bg-blue-100 px-2 py-1 rounded"
                                onClick={() => toggleNestedMenu(i, j)}>
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
                                    className="block hover:bg-blue-100 px-2 py-1 rounded">
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
                <button className="py-2 px-4 rounded-lg border-green-300 hover:border-transparent transition-all border-2 button-hover-orange">
                  {isAuthenticate && user ? (
                    user.role === "user" ? (
                      <Link to="/profile">Profile</Link>
                    ) : (
                      <Link to="/admin/dashboard">Dashbord</Link>
                    )
                  ) : (
                    <Link to="/auth/login">Log In</Link>
                  )}
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
