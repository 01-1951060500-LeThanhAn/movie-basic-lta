import React, { useEffect, useState } from "react";
import axios from "axios";

import useGenres from "../../components/Genres/useGenres";
import CardInfo from "../../components/CardInfo/CardInfo";
import Genres from "../../components/Genres/Genres";
import Paginations from "../../components/Paginations/Paginations";
import { Link } from "react-router-dom";
import apiConfig from "../../config/config";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard"
const Series = () => {
  const [contact, setContact] = useState([]);
  const [page, setPage] = useState(1);
  const [countPages, setCountPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreURL = useGenres(selectedGenres);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    fetchPopularMovie();
  }, [page, genreURL]);
  
  const fetchPopularMovie = async () => {
    const res = await axios.get(
      `${apiConfig.baseUrl}discover/tv?api_key=${apiConfig.apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`
    );

    console.log(res.data.results);
    setContact(res.data.results);
    setCountPages(res.data.total_pages)
  };

  useEffect(() => {
    setLoading(true);
    const timing = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timing);
  }, []);

  return (
    <>
      <div className="media">
        <Genres
          type="tv"
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
          page={page}
        />

        <div className="trending">
          {!loading ? (
            contact.map((slide) => (
              <Link key={slide.id} to={`/details/tv/${slide.id}`}>
              <CardInfo
             
                id={slide.id}
                poster={slide.poster_path}
                title={slide.title || slide.name}
                date={slide.first_air_date || slide.release_date}
                media_type={slide.media_type}
              />
              </Link>
            ))
          ) : (
         <>
              <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
         </>
          )
            }
        </div>
      </div>

      {
        countPages > 1 && <Paginations setPage={setPage} page={page} countPages={countPages} />
      }
      
    </>
  );
};

export default Series;
