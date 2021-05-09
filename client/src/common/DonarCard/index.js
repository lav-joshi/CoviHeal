import React from 'react';
import SvgIcon from './../SvgIcon/index';
import {NavLink} from 'react-router-dom';
 
import './styles.css';
 
const Card = (props) => {
    let color;
    console.log(props.isVerified);
    if(props.isVerified){
        color = <span className="donar__card--verified">Verified</span>
    }else{
        color = <span className="donar__card--notverified">Not Verified</span>
    }
    return(
        
        <div className="donar__card">
            <div className="donar__card--1">    
                <p> <span>Name</span>:{props.name}
                  {
                     color
                  }
                </p>  
                <p> <span>Age</span>:{props.age}</p>
                <p><span>Blood Group</span>:{props.bloodGroup}</p>
                <p><span>Recovery Date</span>:{props.recoveryDate}</p>
                
            <p style={{"width":"80%"}}><span>Location</span>:{props.location}</p>
            </div>
            <div onClick={props.onclick} className="donar__icons">    
                <div>
                    <NavLink to='/profile'>
                        <SvgIcon src="chat.png" height="30px" width="30px" />        
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Card;    


