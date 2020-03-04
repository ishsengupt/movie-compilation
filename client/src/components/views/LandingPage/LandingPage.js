import React, { useEffect, useState } from "react";
import { API_URL, API_KEY } from "../../Config";
import MainImage from "./Sections/MainImage";
import GridCard from "./Sections/GridCard";
import SearchFeature from "./Sections/SearchFeature";

import { Typography, Row } from "antd";

const { Title } = Typography;

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [SearchTerms, setSearchTerms] = useState("");

  useEffect(() => {
    const endpoint = `${API_URL}search/fairy`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = path => {
    fetch(path)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setMovies([...Movies, ...response]);
      });
  };

  const handleClick = () => {
    const endpoint = `${API_URL}search/${SearchTerms}`;
    fetchMovies(endpoint);
  };

  const updateSearchTerms = newSearchTerm => {
    setSearchTerms(newSearchTerm);
    const endpoint = `${API_URL}search/${newSearchTerm}`;
    fetchMovies(endpoint);
    console.log(fetchMovies(endpoint));
  };
  return (
    <div style={{ width: "100%", margin: 0 }}>
      {Movies[0] && (
        <MainImage
          image={Movies[0].images[0]}
          title={Movies[0].name}
          text={Movies[0].desc}
        />
      )}
      
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto"
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerms} />
      </div>
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <Title level={2}>Movies by Latest </Title>
        <hr />

        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCard
                  image={movie.images[0] && movie.images[0]}
                  href={movie.href}
                />
              </React.Fragment>
            ))}
        </Row>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={handleClick}>Load More</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
