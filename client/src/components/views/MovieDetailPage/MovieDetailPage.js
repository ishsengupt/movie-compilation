import React, { useEffect, useState } from "react";
import { API_URL, API_KEY } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import { Descriptions, Button, Row } from "antd";
import GridCard from "../LandingPage/Sections/GridCard";
import Favorite from "./Sections/Favorite";

const NEW_URLS = 'https://node-server-expresses-example.tailgateishan.now.sh/'

function MovieDetailPage(props) {
  let href = ""
  if (props.match.params.href.match(/[-][0-9]{2,6}/)) {
   
    console.log(localStorage.getItem("userId"))
   href = `${props.match.params.href}/`;
   console.log(href)
   
  } else {

    console.log(localStorage.getItem("userId"))
    href = `${props.match.params.href}`;
    console.log(href)
  }

  const searchTerm = props.location.search.replace("?", "")
  //console.log(props.location.search.replace("?", ""))

  const [Movie, setMovie] = useState([]);
  const [Crews, setCrews] = useState([]);
  const [Link, setLink] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    fetch(`${NEW_URLS}movie/${href}`)
      .then(response => response.json())
      .then(response => {
        if (response.name) {
          //console.log(response);

          //if response name exists else response 0
          setMovie(response);
        } else {
          setMovie(response[0]);
        }

        fetch(`${NEW_URLS}search/${searchTerm}`)
          .then(response => response.json())
          .then(response => {
            console.log(response);
            var arrayLength = response.length;
            for (var i = 0; i < arrayLength; i++) {
              //console.log(response[i])
              for (var j = 0; j < response[i].href.length; j++) {
                //console.log(response[i].href[j])

                response[i].href[j] =
                  typeof response[i].href[j] === "string"
                    ? response[i].href[j] === href.trim()
                      ? setCrews(response[i].href) && console.log(response[i].image)
                      : console.log("next")
                    : response[i].href[j][0] === href.trim()
                    ? setCrews(response[i].href[0]) & console.log(response[i].image)
                    : console.log("not");
              }
            }
            // }
          });
      });
  }, []);

  const handleClick = () => {
    setActorToggle(ActorToggle);
  };

  return (
    <div>
      {Movie && (
        <MainImage image={Movie.image} title={Movie.name} text={Movie.desc} />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite
            userFrom={localStorage.getItem("userId")}
            movieId={href}
            movieInfo={Movie}
          />
        </div>

        <Descriptions title="Movie Info" bordered>
          <Descriptions.Item label="Title">{Movie.name}</Descriptions.Item>
          <Descriptions.Item label="Rating">{Movie.rating}</Descriptions.Item>
          <Descriptions.Item label="Description">
            {Movie.desc}
          </Descriptions.Item>
          <Descriptions.Item label="Rating">
            {Movie.rating}
          </Descriptions.Item>
          <Descriptions.Item label="Search">
            {props.location.search}
          </Descriptions.Item>

          <Descriptions.Item>
            {Crews.map((item, index) => (
              <a key={index}> {item} </a>
            ))}
          </Descriptions.Item>
        </Descriptions>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClick}> Toggle Actor View </Button>
        </div>

        {ActorToggle &&
          {
            /* } <Row gutter={[16,16]}>
                        {Crews && Crews.map((crew,index) => (
                            <React.Fragment key={index}>
                                <GridCard image = { crew.image &&  crew.image} href = {crew.href} />
                            </React.Fragment>
                        ))}
                    </Row> */
          }}
      </div>
    </div>
  );
}

export default MovieDetailPage;
