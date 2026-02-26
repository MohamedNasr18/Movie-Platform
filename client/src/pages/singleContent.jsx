import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../pages/authContext";

const SingleContent = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/content/${id}`);
        setContent(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }; 
   
    fetchData();
  }, [id]);

  if (!content) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="mb-5 max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-8 mt-10 bg-gray-900 text-white rounded-lg shadow-lg">
      
      {/* Poster */}
      <div className="md:w-1/3 flex-shrink-0">
        <img
          src={`${import.meta.env.VITE_API_URL}/${content.poster}`}
          alt={content.title}
          className="w-full h-auto rounded-lg shadow-md object-cover"
        />
      </div>

      <div className="md:w-2/3 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#ff4459]">{content.title}</h1>
          <span className="px-3 py-1 bg-red-600 text-sm rounded-full uppercase">
            {content.type}
          </span>
        </div>

        <div className="flex items-center gap-4 text-yellow-400 font-semibold">
          <span>⭐ {content.rating}</span>
          <span>⏱ {content.duration} min</span>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2">
          {content.genres.map((genre, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-700 rounded-full text-sm"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Story */}
        {content.story && (
          <div>
            <h2 className="text-xl font-semibold mt-4">Story</h2>
            <p className="mt-2 text-gray-300">{content.story}</p>
          </div>
        )}

        {/* Cast */}
        <div>
          <h2 className="text-xl font-semibold mt-4">Cast</h2>
          <p className="mt-2 text-gray-300">{content.cast.join(", ")}</p>
        </div>

        {/* Director */}
        {content.director && (
          <div>
            <h2 className="text-xl font-semibold mt-4">Director</h2>
            <p className="mt-2 text-gray-300">{content.director}</p>
          </div>
        )}

        {/* Series info */}
        {content.type === "series" && (
          <div className="flex gap-6 mt-4">
            <div>
              <h2 className="text-xl font-semibold">Seasons</h2>
              <p className="text-gray-300">{content.seasons}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Episodes</h2>
              <p className="text-gray-300">{content.episodes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleContent;