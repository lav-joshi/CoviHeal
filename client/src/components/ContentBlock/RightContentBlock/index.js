import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import Slide from "react-reveal/Slide";

import { BrowserRouter,Route , NavLink, Link , Switch ,Redirect } from 'react-router-dom';

import SvgIcon from "../../../common/SvgIcon";
import Button from "../../../common/Button";

import Compo from './../../../pages/formDonar/index';

import * as S from "./styles";
import { Component } from "react";


// = ({ title, content, button, icon, t, id }) =>

class RightBlock extends Component  {
  state = {
    ...this.props
  }

  scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
    });
  }




  redirectHandle= () =>{
    console.log("In handler")
    return(
      <Redirect push to={{
        pathname: "/form-donar",
        component:{Compo}
        // component:"./../../../pages/formDonar/index"
      }}
    />
    );
  }

  render() {
    
  // console.log(this.props)
      // eslint-disable-next-line no-lone-blocks
    const heroButton = this.props.button && this.props.button.map((item, id) => {
      return (
        <Button
          key={id}
          color={item.color}
          width="true"
          // onClick={this.redirectHandle}
          >
          <NavLink to={item.onclick}>
            {item.title}
          </NavLink>
        </Button>
      );
    });
    
  return (
    <S.RightBlockContainer>
      <Row type="flex" justify="space-between" align="middle" id={this.props.id}>
        <Col lg={11} md={11} sm={11} xs={24}>
          <Slide left>
            <S.ContentWrapper>
              <h6>{this.props.t(this.props.title)}</h6>
              <S.Content>{this.props.t(this.props.content)}</S.Content>
              <S.ButtonWrapper>
                {heroButton}
              </S.ButtonWrapper>
            </S.ContentWrapper>
          </Slide>
        </Col>
        <Col lg={11} md={11} sm={12} xs={24}>
          <Slide right>
            <SvgIcon
              src={this.props.icon}
              className="about-block-image"
              width="100%"
              height="100%"
            />
          </Slide>
        </Col>
      </Row>
    </S.RightBlockContainer>
  );
  }
};

export default withTranslation()(RightBlock);