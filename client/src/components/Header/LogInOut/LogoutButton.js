import React from 'react'
import { GoogleLogout } from 'react-google-login';
import Cookies from 'universal-cookie';
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
