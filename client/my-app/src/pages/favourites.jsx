import axios from "axios";
import { useState, useEffect } from "react";
import ContentCard from "../components/contentCard";

const Favourites = () => {
  const [userFav, setUserFav] = useState([]); 

  useEffect(() => {
    const getUserFavs = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:3000/users/me/favourite", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserFav(res.data.favourite || res.data.data || []);
        console.log("Fetched favourites:", res.data);
      } catch (err) { console.error("Failed to get favourites:", err.response?.data || err.message); }
    };

    getUserFavs();
  }, [userFav]);

  return (
    <>
     <div className=" mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 justify-items-center main-card">

      {userFav.map((i) => (
        <ContentCard
          key={i._id}
          contentId={i._id}
          poster={i.poster ? `http://localhost:3000/${i.poster}` : "fallback.jpg"}
          title={i.title}
          rating={i.rating}
        />
      ))}
        </div>
        </div>

      
    </>
  );
};

export default Favourites;
