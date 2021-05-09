import React from 'react';
import SvgIcon from './../../common/SvgIcon/index';
import './styles.css';

class ProfileSection extends React.Component {

    state = {
        name:"name",
        age:"26",
        bloodGroup:"B",
        recoveryDate:"3/01/2020",
        address:{
            areaName:"abc nagar",
            pincode:"12345",
            state:"abcState"
        }
    }

    onTodoChange = (e) => {
        console.log(e.target.name);
        if(e.target.name==="name"){    
            this.setState({name:e.target.value})
        }else if(e.target.name=="age"){    
            console.log(e.target)
            this.setState({age:e.target.value})
        }else if(e.target.name==="bloodGroup"){    
            this.setState({bloodGroup:e.target.value})
        }else if(e.target.name==="recoveryDate"){    
            this.setState({recoveryDate:e.target.value})
        }
    }

    render() {
        return(
            <div className="ProfileSection__section">
                <h6 style={{"fontSize":"40px"}}>User</h6>
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
                        onChange={e => this.onTodoChange(e)} />
                    
                    Address :
                    <input 
                        type="text" 
                        name="address" 
                        value={this.state.address.areaName +',' + this.state.address.state +',' +  this.state.address.pincode   }
                        onChange={e => this.onTodoChange(e)} />
                    
                    <input className="profile__submit" type="submit" value="submit" onClick={(e) => {
                        alert("submitted")
                    }} />
                </form>
            </div>
        );
    }
}

export default ProfileSection;