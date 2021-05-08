import React from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Login = (props) => {
  const responseGoogle = (response) => {

    axios.post('http://localhost:5000/google/signin',{tokenId : response.tokenId}).then(async (res)=>{
      cookies.set('token', res.data.token);
      cookies.set('user',res.data.user.name);
      cookies.set('email',res.data.user.email);
      props.toggleAuth(true);
    })
    .catch((e)=>{
      console.log(e);
    });

  }

  return (
    <div>
        <GoogleLogin
        clientId="428185779294-4bue4hiho7mqp2866jqs9vnugv7uskan.apps.googleusercontent.com"
        buttonText="SignIn"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}/>  
    </div>
  )
}

export default Login