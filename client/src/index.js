import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import Cookies from 'universal-cookie';
import Router from "./router";
import * as serviceWorker from "./serviceWorker";
import {UserProvider} from './context/userContext';
import { Component } from "react";


const cookies = new Cookies();
class App extends Component {

  constructor(props) {
    super(props);

    this.toggleAuth = (para) => {
      this.setState({
        isAuthenticated : para
      });
    };

    this.state = {
      isAuthenticated: false,
      toggleAuth: this.toggleAuth,
    };
  }


  componentDidMount =()=>{
    if(cookies.get('token')){
      this.toggleAuth(true);
    }
  }


  render(){
    return(        
    <BrowserRouter>
      <UserProvider value={this.state}>
        <Router />
      </UserProvider>
    </BrowserRouter>
    );
  }
  
}

ReactDOM.render(<App />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
