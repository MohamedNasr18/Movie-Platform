import axios from "axios";
import { Link } from "react-router-dom"; // corrected import
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';


const NavBar = ({ search, setSearch, token ,setToken}) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

 const handleSignOut = () => {
     localStorage.removeItem("token"); 
    setToken(null); 
    setUser(null)
     navigate("/");  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.data);

      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [token]);
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
useEffect(()=>{
    const token=localStorage.getItem("token")
    if(!token){
        navigate('/login')
    }
},[token])
 
 

  return (
  <nav className="bg-black px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between shadow-lg gap-4 md:gap-0">
  {/* Logo */}
  <div className="flex items-center gap-2 text-white cursor-pointer hover:text-red-600 transition">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="text-red-600 size-8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25..." />
    </svg>
    <Link to={'/'} className="font-bold text-lg tracking-wide">CineVerse</Link>
  </div>

  {/* Site Name */}
  <div className="text-white text-xl md:text-2xl font-extrabold tracking-wider text-center md:text-left">
    Movies Platform
  </div>

  {/* Search Bar */}
  <div className="flex items-center border pl-4 gap-2 bg-gray-900 border-gray-700 h-[42px] rounded-full overflow-hidden w-full md:max-w-md mx-0 md:mx-6">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#9CA3AF" viewBox="0 0 24 24">
      <path d="M10 2a8 8 0 105.293 14.293..." />
    </svg>
    <input
      type="text"
      placeholder="Search movies..."
      className="w-full h-full outline-none text-sm text-gray-300 bg-transparent placeholder-gray-500"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <button
      type="submit"
      onClick={()=>{}}
      className="cursor-pointer bg-red-600 hover:bg-red-700 w-20 md:w-28 h-8 rounded-full text-sm text-white mr-2 transition-all duration-300"
    >
      Search
    </button>
  </div>

  {/* Profile Section */}
  <div className="relative" ref={dropdownRef}>
    <img
      onClick={() => setOpen(!open)}
      src={user?.poster ? `http://localhost:3000/${user.poster}` : "https://i.pravatar.cc/100"}
      alt="Profile"
      className="w-10 h-10 rounded-full cursor-pointer border-2 border-red-600 object-cover hover:scale-105 transition-transform duration-300"
    />
    {open && (
      <div className="absolute right-0 mt-3 w-44 bg-gray-900 rounded-md shadow-lg py-2 border border-gray-700 z-50">
        <Link
          onClick={() => setOpen(false)}
          to={"/favourites"}
          className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-red-600 hover:text-white transition"
        >
          Favourite
        </Link>
        {user?.role === "ADMIN" && (
          <button
            onClick={() => { navigate("/users"); setOpen(false); }}
            className="block w-full px-4 py-2 text-sm cursor-pointer text-gray-300 hover:bg-red-600 hover:text-white transition"
          >
            Settings
          </button>
        )}
        {user ? (
          <button
            onClick={() => { handleSignOut(); setOpen(false); }}
            className="block w-full px-4 py-2 text-sm cursor-pointer text-gray-300 hover:bg-red-600 hover:text-white transition"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => { navigate("/login"); setOpen(false); }}
            className="block w-full px-4 py-2 text-sm cursor-pointer text-gray-300 hover:bg-red-600 hover:text-white transition"
          >
            Login
          </button>
        )}
      </div>
    )}
  </div>
</nav>

  );
};

export default NavBar;
