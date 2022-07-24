import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { RiCloseCircleLine } from "react-icons/ri";
import CardInfo from "../CardInfo/CardInfo";
const MovieHistory = ({ data }) => {
  const [listMovie, setListMovie] = useState(data);

  const deleteMovie = (data) => {
    const filterMovie = listMovie.filter((movie) => {
      return movie.id !== data;
    });
    setListMovie(filterMovie);
  };

  useEffect(() => {
    localStorage.setItem("movie-watched", JSON.stringify(listMovie));
  }, [listMovie]);

  return (
    <>
      <div className="media">
        <h4
          style={{
            marginBottom: "30px",
            width: "max-content",
          }}
        >
          Movies Watched
        </h4>
        <div className="trending">
          {listMovie.map((item) => (
            <div style={{ position: "relative" }} key={item.id}>
              <Link to={`/details/${item.media_type}/${item.id}`}>
                <CardInfo
                  id={item.id}
                  poster={item.poster_path}
                  title={item.title}
                />
              </Link>
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                onClick={() => deleteMovie(item.id)}
                className="remove_movie"
              >
                <RiCloseCircleLine />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieHistory;
