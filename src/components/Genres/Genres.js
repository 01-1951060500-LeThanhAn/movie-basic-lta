import React, { useEffect } from "react";
import axios from "axios";
import "./Genres.css";
import { Chip } from "@material-ui/core";
import apiConfig from "../../config/config"
const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  page,
  setPage,
  type,
}) => {
  const api_key = "b9a79216b65e3f15674332102ae5616f";

  const fetchGenres = async () => {
    const res = await axios.get(
      `${apiConfig.baseUrl}genre/${type}/list?api_key=${apiConfig.apikey}&language=en-US`
    );
    console.log(res.data.genres);
    setGenres(res.data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({});
    };

  }, []);
  
  const addGenres = (genre) => {
    setSelectedGenres([...selectedGenres, genre])
    setGenres(genres.filter((item) => item.id !== genre.id))
    setPage(1)
   }

   const removeGenres = (genre) => {
    setSelectedGenres(selectedGenres.filter((item) => item.id !== genre.id))
    setGenres(genres.filter((item) => item.id !== genre.id))
    setPage(1)
   }

  return (
   <div className="genres-parent">
      <div className="genres mb-3">
       {selectedGenres &&
          selectedGenres.map((genre) => (
            <Chip
             
              label={genre.name}
              size="small"
              color="primary"
              key={genres.id}
              clickable
              onDelete={() => removeGenres(genre)}
              onClick={() => addGenres(genre)}
            />
          ))}
  
        {genres &&
          genres.map((genre) => (
            <Chip
              label={genre.name}
              size="small"
              key={genres.id}
              clickable
              onClick={() => addGenres(genre)}
            />
          ))}
      </div>
   </div>
  );
};

export default Genres;
