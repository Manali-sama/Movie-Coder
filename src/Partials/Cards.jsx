import React from "react";
import { Link } from "react-router-dom";

function Cards({ data, title }) {
  return (
    <div className="w-full mt-5 flex flex-wrap justify-center">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="relative w-[27vh] mr-14 mb-8"
          key={i}
        >
          <img
            className="w-[27vh] rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] object-cover h-[40vh]"
            src={c.poster_path || c.backdrop_path || c.profile_path ?`https://image.tmdb.org/t/p/original/${
              c.poster_path || c.backdrop_path || c.profile_path
            }`: `https://st2.depositphotos.com/2102215/46681/v/450/depositphotos_466819550-stock-illustration-image-available-icon-missing-image.jpg`}
            alt=""
          />
          <h1 className="text-xl font-semibold text-zinc-300 mt-3">
            {c.title || c.name || c.original_name || c.original_title}
          </h1>
          {c.vote_average && (
            <div className="w-[7vh] h-[7vh] rounded-full bg-yellow-400 flex justify-center items-center absolute left-[82%] bottom-[32%] text-lg font-semibold text-white">
              {(c.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default Cards;
