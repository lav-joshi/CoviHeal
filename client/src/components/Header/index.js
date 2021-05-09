import { useState, Fragment, lazy } from "react";
import { Row, Col, Drawer } from "antd";
import { CSSTransition } from "react-transition-group";
import { withTranslation } from "react-i18next";

import { UserConsumer } from './../../context/userContext';
import LogIn from './LogInOut/LoginButton';
import LogOut from './LogInOut/LogoutButton';

import * as S from "./styles";
import { Link,NavLink,Redirect } from "react-router-dom";


const SvgIcon = lazy(() => import("../../common/SvgIcon"));
// const Button = lazy(() => import("../../common/Button"));

const Header = ({ t }) => {
  const [isNavVisible] = useState(false);
  const [isSmallScreen] = useState(false);
  const [visible, setVisibility] = useState(false);

  const showDrawer = () => {
    setVisibility(!visible);
  };


  const onClose = () => {
    setVisibility(!visible);
  };

  console.log(window.location.pathname)
  const MenuItem = () => {

    const scrollTo = (id) => {
      if(window.location.pathname=="/"){
        const element = document.getElementById(id);
        element.scrollIntoView({
          behavior: "smooth",
        });
        setVisibility(false);
      }else{
        <Redirect to="/"></Redirect>
        // e.preventdefault();
      }
    };

    return (
      <Fragment>
        <S.CustomNavLinkSmall >
          <S.Span><NavLink to="/">{t("Our Mission")}</NavLink></S.Span>
        </S.CustomNavLinkSmall>

        <S.CustomNavLinkSmall >
          <S.Span><NavLink to="/">{t("Why Plasma is needed?")}</NavLink></S.Span>
        </S.CustomNavLinkSmall>

        <S.CustomNavLinkSmall>
          <S.Span><NavLink to="/find-donar">{t("Find Donor")}</NavLink></S.Span>
        </S.CustomNavLinkSmall>
        
        <S.CustomNavLinkSmall
          style={{ width: "150px" }}
          onClick={() => {console.log("lo")}}
        >
          <S.Span>
            <UserConsumer>
                        {
                            ({isAuthenticated, toggleAuth}) => (
                                
                                isAuthenticated ?  <Link to="/profile"><SvgIcon src="profile-user.png" height="30px"/></Link> : null
                            )
                        }
            </UserConsumer>
          </S.Span>
        </S.CustomNavLinkSmall>
        
        <S.CustomNavLinkSmall
          style={{ width: "150px" }}
          onClick={() => {console.log("lo")}}
        >
          <S.Span>
            <UserConsumer>
                        {
                            ({isAuthenticated, toggleAuth}) => (
                                
                                isAuthenticated ?  <LogOut toggleAuth={toggleAuth}/> : <LogIn toggleAuth={toggleAuth}/>
                            )
                        }
            </UserConsumer>
          </S.Span>
        </S.CustomNavLinkSmall>

      </Fragment>
    );
  };

  return (
    <S.Header>
      <S.Container>
        <Row type="flex" justify="space-between" gutter={20}>
          <S.LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="logo2.png" width="200px" />
          </S.LogoContainer>
          <S.NotHidden>
            <MenuItem />
          </S.NotHidden>
          <S.Burger onClick={showDrawer}>
            <S.Outline />
          </S.Burger>
        </Row>
        <CSSTransition
          in={!isSmallScreen || isNavVisible}
          timeout={350}
          classNames="NavAnimation"
          unmountOnExit
        >
          <Drawer closable={false} visible={visible} onClose={onClose}>
            <Col style={{ marginBottom: "2.5rem" }}>
              <S.Label onClick={onClose}>
                <Col span={12}>
                  <S.Menu>Menu</S.Menu>
                </Col>
                <Col span={12}>
                  <S.Outline padding="true" />
                </Col>
              </S.Label>
            </Col>
            <MenuItem />
          </Drawer>
        </CSSTransition>
      </S.Container>
    </S.Header>
  );
};

export default withTranslation()(Header);
