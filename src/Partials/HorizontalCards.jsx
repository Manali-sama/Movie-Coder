import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

function HorizontalCards({ cards }) {
  return (
    <div className="w-[100%] h-[35vh] flex overflow-y-hidden px-3 mb-5">
      {cards.map((c, i) => (
        <Link
          to={`/${c.media_type}/details/${c.id}`}
          key={i}
          className="min-w-[15%] h-full mr-3 mb-5 bg-black"
        >
          <img
            className="w-full h-[55%] object-cover"
            src={c.backdrop_path || c.profile_path ?`https://image.tmdb.org/t/p/original/${
              c.backdrop_path || c.profile_path
            }`: `https://st2.depositphotos.com/2102215/46681/v/450/depositphotos_466819550-stock-illustration-image-available-icon-missing-image.jpg`}
            alt=""
          />
          <div className="p-2 overflow-y-auto">
            <h1 className="leading-tight text-lg text-white">
              {c.title || c.name || c.original_name || c.original_title}
            </h1>
            <p className=" text-white mt-1 text-xs">
              {c.overview.slice(0, 50)}...
              <Link className="text-[#838286]">more</Link>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default HorizontalCards;
