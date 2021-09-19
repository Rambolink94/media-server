import MovieCard from "../MovieCard/MovieCard";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MovieStack.css";

function MovieStack(props) {
  const stackRef = useRef(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => checkArrows());
    //This might be causing an error
    checkArrows();

    return () => {
      window.removeEventListener("resize", () => checkArrows());
    };
  }, []);

  const checkArrows = () => {
    const stack = stackRef.current;
    if (!stack) return;
    const stackSize = stack.offsetWidth;

    if (stack.scrollLeft <= 0) setIsAtStart(true);
    else setIsAtStart(false);

    // Check if right should render
    if (stack.scrollLeft + stackSize >= stack.scrollWidth) setIsAtEnd(true);
    else setIsAtEnd(false);
  };

  const scrollStack = (isLeft = true) => {
    const stack = stackRef.current;
    const stackSize = stack.offsetWidth;

    console.log("Stack Size:", stackSize);

    // Set scroll position
    if (isLeft) {
      console.log("Scroll: ", stack.scrollLeft - stackSize, " - ", 0);
      stack.scrollBy({ top: 0, left: -stackSize, behavior: "smooth" });
      if (stack.scrollLeft - stackSize <= 0) setIsAtStart(true);
      setIsAtEnd(false);
    } else {
      console.log(
        "Scroll: ",
        stack.scrollLeft + stackSize,
        " - ",
        stack.scrollWidth
      );
      stack.scrollBy({ top: 0, left: stackSize, behavior: "smooth" });
      if (stack.scrollWidth - (stack.scrollLeft + stackSize) < stackSize)
        setIsAtEnd(true);
      setIsAtStart(false);
    }

    console.log(stack.scrollWidth - stack.scrollLeft, " < ", stackSize);
  };

  return (
    <div className="stack-wrapper">
      <div className="stack-title">
        <h4 className="genre-name">{props.genre.name}</h4>
        <Link
          to={{
            pathname: `genre/${props.genre.name}`,
            state: { genre: props.genre },
          }}
        >
          <p className="view-all-text">View All</p>
        </Link>
      </div>
      <div className="stack">
        <div className="grid" ref={stackRef}>
          {props.movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} user={props.user} />
          ))}
        </div>
        <div className="arrow-wrapper">
          {/* Consider making arrows components. Refactor regardless. */}
          <div
            className="right-arrow"
            style={!isAtEnd ? { display: "" } : { display: "none" }}
            onClick={() => scrollStack(false)}
          >
            <FontAwesomeIcon
              className="arrow"
              icon="chevron-right"
              size="4x"
              inverse
            />
          </div>
          <div
            className="left-arrow"
            style={!isAtStart ? { display: "" } : { display: "none" }}
            onClick={() => scrollStack(true)}
          >
            <FontAwesomeIcon
              className="arrow"
              icon="chevron-left"
              size="4x"
              inverse
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieStack;
