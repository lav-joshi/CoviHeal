import React from 'react';
import SvgIcon from './../SvgIcon/index';

import './styles.css';

const Card = (props) => {
    return(
        <div>
            <SvgIcon src={props.src} width="250px" height="250px" />
        </div>
    );
}

export default Card;    