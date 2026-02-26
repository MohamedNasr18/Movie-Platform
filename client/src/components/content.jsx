import axios from "axios";
import { useEffect, useState } from "react";
import ContentCard from "./contentCard";

const Content = ({search}) => {
  const [contentData, setContentData] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/content/`);
        setContentData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchContent();
  }, [Content]);

 const filteredData = contentData.filter((item)=>
  item.title.toLowerCase().includes(search.toLowerCase())
 )

  return (
    <>
    <div className="mt-5">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 justify-items-center main-card">
    {filteredData.map((e) => (
      <ContentCard
        key={e._id}
        contentId={e._id}
        poster={e.poster ? `${import.meta.env.VITE_API_URL}/${e.poster}` : "fallback.jpg"}
        title={e.title}
        rating={e.rating}
      />
    ))}
  </div>
</div>

    </>
  );
};

export default Content;