import React from 'react';
import SvgIcon from './../../common/SvgIcon/index';
import './styles.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import moment from 'moment';

const cookies = new Cookies();

class ProfileSection extends React.Component {

    state = {
        name:"",
        age:"",
        bloodGroup:"",
        recoveryDate:"",
        location :"",
        isPatient : false
    }

    onTodoChange = (e) => {
    
        if(e.target.name==="name"){    
            this.setState({name:e.target.value})
        }else if(e.target.name=="age"){    
            this.setState({age:e.target.value})
        }else if(e.target.name==="bloodGroup"){    
            this.setState({bloodGroup:e.target.value})
        }else if(e.target.name==="recoveryDate"){    
            this.setState({recoveryDate:e.target.value})
        }
    }

    async componentDidMount  (){
        axios.post("http://localhost:5000/getprofile",{email : cookies.get("email")})
        .then((res)=>{
            let z = res.data.patient;
            this.setState(({
                name: z.name ,
                age : z.age , 
                bloodGroup : z.bloodGroup,
                recoveryDate : moment(z.recoveryDate).format('MMMM Do YYYY'),
                location : z.areaName + "," +z.district +"," + z.pincode,
                isPatient : res.data.isPatient
            }))
        })
        .catch((e)=>{
           alert(e.message);
        })
    }

    render() {
        return(
            <div className="ProfileSection__section">
                <h6 style={{"fontSize":"35px"}}>
                    {
                        this.state.isPatient ? "Patient" : "Donor"
                    }
                </h6>
                <SvgIcon 
                    src="profile.svg"
                    height="80"
                    width="80"/>
                <form>Name: 
                    <input 
                        type="text" 
                        name="name" 
                        value={this.state.name}
                        onChange={e => this.onTodoChange(e)} />
                    Age:
                    <input 
                        type="number" 
                        name="age" 
                        value={this.state.age}
                        onChange={e => this.onTodoChange(e)} />
                    Blood Group:
                    <input 
                        type="text" 
                        name="bloodGroup" 
                        value={this.state.bloodGroup}
                        onChange={e => this.onTodoChange(e)} />

                    Recovery Date:
                    <input 
                        type="text" 
                        name="recoveryDate" 
                        value={this.state.recoveryDate}
                        disabled
                    />
                    
                    Address :
                    <input 
                        type="text" 
                        name="address" 
                        value={this.state.location }
                        disabled
                        />
                    
                    <input className="profile__submit" type="submit" value="submit" onClick={(e) => {
                        alert("submitted")
                    }} />
                </form>
            </div>
        );
    }
}

export default ProfileSection;