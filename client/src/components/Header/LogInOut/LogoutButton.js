import React from 'react'
import Cookies from 'universal-cookie';
import SvgIcon from './../../../common/SvgIcon';
import { GoogleLogout } from 'react-google-login';
import {Link} from 'react-router-dom';

import  './styles.css'

const cookies = new Cookies();
 
const LogOut = (props) => {
 
    const logout = ()=>{
       props.toggleAuth(false);
       cookies.set('token','');
    }
 
    return (
      <div>
        <GoogleLogout
        clientId="428185779294-4bue4hiho7mqp2866jqs9vnugv7uskan.apps.googleusercontent.com"
        buttonText="SignOut"

        onLogoutSuccess={logout}
        >
        </GoogleLogout>
      </div>
    )
}

export default LogOut
