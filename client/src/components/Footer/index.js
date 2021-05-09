import { lazy, Fragment } from "react";
import { Row, Col } from "antd";
// import i18n from "i18next";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";

import * as S from "./styles";

const SvgIcon = lazy(() => import("../../common/SvgIcon"));
const Container = lazy(() => import("../../common/Container"));

const Footer = ({ t }) => {
  // const handleChange = (event) => {
  //   i18n.changeLanguage(event.target.value);
  // };

  const SocialLink = ({ href, src }) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };

  return (
    <Fragment>
      <Fade bottom>
        <S.Footer>
          <Container>
            <Row type="flex" justify="space-between">
              <Col lg={10} md={10} sm={12} xs={24}>
                <S.Empty />
                <S.Language>{t("ADDRESS")}</S.Language>
                <S.Para>IIIT Lucknow , 226002</S.Para>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <S.Select>
                   <S.Para>Developers </S.Para>
                    <ul>
                      <li>
                        Lav Joshi
                      </li>
                      <li>
                        Vinamr Bajaj
                      </li>
                      <li>
                        Harshdeep
                      </li>
                    </ul>
                </S.Select>
              </Col>
            </Row>
          </Container>
        </S.Footer>
        <S.Extra>
          <Container border="true">
            <Row
              type="flex"
              justify="space-between"
              align="middle"
              style={{ paddingTop: "3rem" }}
            >
              <S.NavLink to="/">
                <S.LogoContainer>
                  <SvgIcon
                    src="logo2.png"
                    aria-label="homepage"
                    width="200px"
                  />
                   <SvgIcon
                    src="OrganForLife.webp"
                    aria-label="homepage"
                    width="110px"
                    height = "100px"
                  />
                   <SvgIcon
                    src="YOUTH.png"
                    aria-label="homepage"
                    width="110px"
                    height = "100px"
                  />
                  <SvgIcon
                    src="IIITL.png"
                    aria-label="homepage"
                    width="110px"
                    height = "100px"
                  />
                </S.LogoContainer>
              </S.NavLink>
              <S.FooterContainer>
                <SocialLink
                  href="https://twitter.com/CoviHeal"
                  src="twitter.svg"
                />
                <SocialLink
                  href="https://www.instagram.com/coviheal21/"
                  src="instagram.svg"
                />
              </S.FooterContainer>
            </Row>
          </Container>
        </S.Extra>
      </Fade>
    </Fragment>
  );
};

export default withTranslation()(Footer);
