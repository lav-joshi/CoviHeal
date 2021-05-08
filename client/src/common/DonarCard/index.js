import React from 'react';
import SvgIcon from './../SvgIcon/index';
import {NavLink} from 'react-router-dom';
 
import './styles.css';
 
const Card = (props) => {
    return(
        <div className="donar__card">
            <div className="donar__card--1">    
                <p> <span>Name</span>:{props.name}</p>
                <p> <span>Age</span>:{props.age}</p>
                <p><span>Blood Group</span>:{props.bloodGroup}</p>
                <p><span>Recovery Date</span>:{props.recoveryDate}</p>
            </div>
            <p><span>Location</span>:{props.location}</p>
            <div onClick={props.onclick} className="donar__icons">
                <span>
                    <NavLink to='/profile'>
                        <SvgIcon src="hero.png" height="30px" width="30px" />        
                    </NavLink>
                </span>
            </div>
        </div>
    );
}
 
export default Card;    
 

