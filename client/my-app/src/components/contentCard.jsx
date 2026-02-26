import { useState } from "react";
import { Heart, User } from "lucide-react";
import { Pencil } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { AuthContext } from "../pages/authContext";
import { useContext } from "react";

const ContentCard = ({ poster, title, rating, contentId }) => {
    const { user } = useContext(AuthContext);
    
  const [isFav, setIsFav] = useState(false);
  useEffect(() => {
  const getUserFav = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(
        "http://localhost:3000/users/me/favourite",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const favIds = res.data.data.map((i) => i._id);
      setIsFav(favIds.includes(contentId));
    } catch (err) {
      console.error(err.response?.data?.message || "Can't get fav list");
    }
  };

  getUserFav();
}, [contentId]);

  const toggleFav = async () => {
  const token = localStorage.getItem("token");
  if (!token) return alert("no token");

  // optimistic update
  setIsFav((prev) => !prev);

  try {
    if (isFav) {
      // remove favourite
      await axios.patch(`http://localhost:3000/users/me/favourite/${contentId}`,{}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      // add favourite
      await axios.post(`http://localhost:3000/users/me/favourite/${contentId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (err) {
    // rollback if failed
    setIsFav((prev) => !prev);
    console.error(err.response?.data?.message || "Failed to update favourite");
  }
};


  return (
    <div className="relative group w-48">
      <Link to={`/content/${contentId}`}>
        <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:z-20">

          {/* Image */}
          <img
            src={poster}
            alt={title}
            className="w-full h-72 object-cover"
          /> 

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition duration-500" />

          {/* Rating Top Left */}
          <div className="absolute top-2 left-2 bg-black/70 text-yellow-400 text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm">
            ⭐ {rating}
          </div>

          {/* Favourite Icon Top Right */}
         <button onClick={(e) => { e.preventDefault(); toggleFav(); }}
          className="absolute top-2 right-2 bg-black/60 p-2 rounded-full backdrop-blur-sm hover:scale-110 transition" > 
            <Heart size={18} className={`transition ${ isFav ? "fill-red-500 text-red-500" : "text-white" }`} /> </button>
       {user?.role === "ADMIN" && (
  <button
    onClick={(e) => { e.preventDefault(); }}
    className="absolute top-2 right-12 bg-black/60 p-2 rounded-full backdrop-blur-sm hover:scale-110 transition"
  >
    <Pencil size={18} className="text-white" />
  </button>
)}

          {/* Title Bottom */}
          <div className="absolute bottom-3 left-3 right-3">
            <h2 className="text-white text-sm font-semibold line-clamp-2">
              {title}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ContentCard;