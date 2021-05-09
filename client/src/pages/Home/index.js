import React  , { lazy , useState , useEffect} from "react";
import IntroContent from "../../content/IntroContent.json";
import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/DonarContent.json";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';

import "./styles.css"
import axios from "axios";


const DonarList = lazy(() => import("../../components/DonarList"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

const Home = () => {


  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [recommendor , setRecommendor] = useState("");
  

  const handleSubmit = (e)=>{
    e.preventDefault();
    
    const x = {
      name , 
      email ,
      recommendor
    }
    axios.post("http://localhost:5000/recommend", x)
    .then((res)=>{
       alert("Thanks for recommending ");
    }).catch((e)=>{
       alert("Something went wrong");
    })
    
    setName("");
    setEmail("");
    setRecommendor("");
  }
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
          <form className="recommend__form" onSubmit = {handleSubmit}>
            <input 
              placeholder="Name"
              value = {name}
              name="Name"
              onChange ={(e)=>setName(e.target.value)}
              type="text"/>
            <input 
              placeholder="Email"
              name="email"
              value={email}
              onChange ={(e)=>setEmail(e.target.value)}
              type="email"/>
            <input 
              placeholder="Your Name"
              value = {recommendor}
              name="RecommendName"
              onChange ={(e)=>setRecommendor(e.target.value)}
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
