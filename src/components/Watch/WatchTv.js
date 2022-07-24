import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimilarMovie from "../Similar/SimilarMovie"
import "./Watch.css"

import axios from "axios";
import apiConfig from "../../config/config";
import Comment from "../Comment/Comment";
const WatchTv = () => {
  const { id } = useParams();
  const [info, setInfo] = useState([]);

  const fetchInfo = async () => {
    const res = await axios.get(
      `${apiConfig.baseUrl}tv/${id}?api_key=${apiConfig.apikey}&language=en-US`
    );

    console.log(res.data);
    setInfo(res.data);
  };
  
  useEffect(() => {
    fetchInfo(); 
  }, [id]); 

  return (
    <div className="container">
      <div className="row">
        <div className="watch-container">
          <div className="watch-movie-flex">
            <div className="watch-movie-video">
              <iframe
                width="100%"
                height={"100%"}
                src={`https://2embed.org/embed/${id}`}
                title="Movie player"
                frameBorder="0"
                allowFullScreen
              />
            </div>

            <div className="watch_info">
              <h1 className="watch_name">{info.title}</h1>
              <p className="watch_overview">{info.overview}</p>
              <p className="watch_release_date">
                Release date: {info.release_date}
              </p>
            </div>

            <Comment id={id} />
          </div>

          <div className="similarMovie">
             <SimilarMovie />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchTv;
