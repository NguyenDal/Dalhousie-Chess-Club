import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { Navigation, Pagination, HashNavigation, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import '../styles/homestyle.css';
import ChessPuzzle from "./chessPuzzle";
import { BASE_URL } from '../config.js';

function Home() {
  const [slides, setSlides] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/home/getHomePageSlides`)
      .then(res => res.json())
      .then(data => {       
        setSlides(data);
      })
      .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/api/home/homePageCards`)
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(err => console.log(err))
  }, []);

  return (
    <>
      <div className="homeTitle">
        <h1>Dalhousie Chess Club</h1>
      </div>

      {/* swiper-slider container */}
      <div className="sliderMain">
        <Swiper
          spaceBetween={0}
          hashNavigation={{
            watchState: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation, HashNavigation, Autoplay]}
          autoplay={{
            delay: 4000,  
            disableOnInteraction: false,
          }}
          loop={true}
          className="mySwiper"
        >
          {slides.map((data, index) => (
            <SwiperSlide key={index} data-hash={`data${index + 1}`}>
              <div className="innerContent">
                <Link to={`/news#${data.newsID}`}>
                  <img src={data.image} alt={data.title} />
                </Link>
                {/* <div className="slider-text">
                  <h1>{data.title}</h1>
                  <p>
                    {data.content}
                  </p>
                </div> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* cards-material ui */}
      <Container className="my-5">
        <Grid container spacing={3} className="cardCenter">
          {cards.map((card, index) => (
            <Grid item md={4} className="mt-3" key={index}>
              <Card>
                <CardActionArea
                  id="cardHover"
                  component={NavLink}
                  to={`/news#${card.newsID}`}
                  onClick={() => { window.scroll({ top: 0, left: 0, behavior: "smooth" }); }}
                >
                  <CardMedia
                    id="cardimg"
                    component="img"
                    alt={card.title}
                    height="235"
                    image={card.image}
                    title={card.title}
                  />
                </CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" className="cardContent">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className="cardDescription">
                    {card.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

     {/* Sponsor Section */}
<Container className="sponsor-section">
  <div className="sponsor-section-header">
    <h2>Our Sponsors</h2>
  </div>
  <Grid container spacing={3} className="sponsor-logos">
    <Grid item xs={6} sm={4} md={3}>
      <div className="sponsor">
        <img src="https://via.placeholder.com/100" alt="Sponsor 1" />
        <p>Sponsor 1</p>
      </div>
    </Grid>
    <Grid item xs={6} sm={4} md={3}>
      <div className="sponsor">
        <img src="https://via.placeholder.com/100" alt="Sponsor 2" />
        <p>Sponsor 2</p>
      </div>
    </Grid>
    <Grid item xs={6} sm={4} md={3}>
      <div className="sponsor">
        <img src="https://via.placeholder.com/100" alt="Sponsor 3" />
        <p>Sponsor 3</p>
      </div>
    </Grid>
    <Grid item xs={6} sm={4} md={3}>
      <div className="sponsor">
        <img src="https://via.placeholder.com/100" alt="Sponsor 4" />
        <p>Sponsor 4</p>
      </div>
    </Grid>
    {/** Add more sponsors here if needed */}
  </Grid>
</Container>
      <h1>Daily Puzzle</h1>
      <ChessPuzzle />
    </>
  );
}

export default Home;
