import { lazy } from "react";
import IntroContent from "../../content/IntroContent.json";
import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/DonarContent.json";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';

import "./styles.css"


const DonarList = lazy(() => import("../../components/DonarList"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

const Home = () => {
  return (
    <Container>
      <ScrollToTop />
      <ContentBlock
        type="right"
        first="true"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="hero.png"
        id="intro"
      />
      {
        <div className="recommend__donar">
          <h6>Recommend A Donor</h6>
          {/* <div>
          <Carousel>
                <div>
                    <p className="legend">Lav recommended Vinamr for donor</p>
                </div>
                <div>
                    <p className="legend">Lasav recommended Vinabcmr for donor</p>
                </div>
                <div>
                    <p className="legend">Laharv recommended Vinamdasdr for donor</p>
                </div>
            </Carousel>
          </div> */}
          <form className="recommend__form">
            <input 
              placeholder="Name"
              name="Name"
              type="text"/>
            <input 
              placeholder="Email"
              name="email"
              type="email"/>
            <input 
              placeholder="Your Name"
              name="RecommendName"
              type="text"/>
            <input
              className="recommend__formSubmit"
              type="submit"
              name="submit"/>
          </form>
        </div>
      }
      <ContentBlock
        type="right"
        title={MissionContent.title}
        content={MissionContent.text}
        icon="product-launch.svg"
        id="mission"
      />

      <ContentBlock
        type="left"
        title={ProductContent.title}
        content={ProductContent.text}
        icon="plasma.jpg"
        id="product"
      />
      <DonarList
        title={ContactContent.title}
        content={ContactContent.text}
        id="contact"
      />
    </Container>
  );
};

export default Home;
