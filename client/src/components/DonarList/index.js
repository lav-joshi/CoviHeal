// import { lazy } from "react";
// import { Row, Col } from "antd";
// import Zoom from "react-reveal/Zoom";
import { withTranslation } from "react-i18next";

import Card from '../../common/card/index';

// import useForm from "./useForm";
// import validate from "./validationRules";

import  "./styles.css";

// const Block = lazy(() => import("../Block"));
// const Input = lazy(() => import("../../common/Input"));
// const Button = lazy(() => import("../../common/Button"));
// const TextArea = lazy(() => import("../../common/TextArea"));

const Contact = (props) => {
  // const { values, errors, handleChange, handleSubmit } = useForm(validate);

  // const ValidationType = ({ type }) => {
  //   const ErrorMessage = errors[type];
  //   return errors[type] ? (
  //     <Zoom cascade>
  //       <S.Span>{ErrorMessage}</S.Span>
  //     </Zoom>
  //   ) : (
  //     <S.Span />
  //   );
  // };

  // console.log(props)

  const dList = 
    props.content.map(el =>{
      return (
        <Card key={el.src} src={el.src} />
      );
    });

  return (
    <div className="donarHome__section">
      <h1 className="donarHome__heading">Previous Donars</h1>
        <div className="donarHome__container">
          {dList}
        </div>
      </div>

  );
};

export default withTranslation()(Contact);
