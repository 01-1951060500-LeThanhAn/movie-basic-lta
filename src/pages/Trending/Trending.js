import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./Trending.css";
import { Link } from "react-router-dom";
import CardInfo from "../../components/CardInfo/CardInfo";
import SliderPreview from "../../components/SliderPreview/SliderPreview";
import Paginations from "../../components/Paginations/Paginations";
import apiConfig from "../../config/config";
import { BarWave } from "react-cssfx-loading";
import { getHistoryMovie } from "../../actions/historyMovie";
import MovieHistory from "../../components/MovieHistory/MovieHistory";
const Trending = () => {
  const [slideMovie, setSlideMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [countPages, setCountPages] = useState();
  const [loading, setLoading] = useState(false);
  const historyWatch = useMemo(getHistoryMovie, []);
  const fetchPopularMovie = async () => {
    const res = await axios.get(
      `${apiConfig.baseUrl}trending/all/week?api_key=${apiConfig.apikey}&page=${page}`
    );

    console.log(res.data.results);
    setSlideMovie(res.data.results);
    setCountPages(res.data.total_pages);
  };

  useEffect(() => {
    fetchPopularMovie();
    setLoading(true);
    const timing = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timing);
  }, [page]);

  return (
    <>
      <SliderPreview />

      {historyWatch.length > 0 ? <MovieHistory data={historyWatch} /> : null}

      <h4 style={{ padding: "40px 80px" }}>Trending Movie or TV</h4>
      <div className="media">
        <div className="trending">
          {loading && (
            <div className="loading">
              <BarWave color="#FFF" width="50px" height="50px" />
            </div>
          )}
          {!loading &&
            slideMovie.map((slide) => (
              <Link to={`/details/movie/${slide.id}`}>
                <CardInfo
                  key={slide.id}
                  id={slide.id}
                  poster={slide.poster_path}
                  title={slide.title || slide.name}
                  date={slide.first_air_date || slide.release_date}
                  media_type={slide.media_type}
                />
              </Link>
            ))}
        </div>
      </div>

      <Paginations setPage={setPage} page={page} countPages={countPages} />
    </>
  );
};

export default Trending;
