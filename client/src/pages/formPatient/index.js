import React ,{ Component } from 'react';
import './styles.css';
import SvgIcon from '../../common/SvgIcon/index';
import axios from 'axios';
import notify from "./../../common/notif";
import { toast, ToastContainer } from 'react-toastify';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const createHeader = (token) => {
    const authAxios = axios.create({
        baseURL: "http://localhost:5000",
        headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
            "Content-Type" : 'application/json'
        }
    });
    return authAxios;
}


class formPatient extends Component {

    state = {
        name:"",
        age:"",
        phoneNumber:"",
        bloodGroup:"A+",
        recoveryDate:"",
        areaName:"",
        district:"",
        pincode:"",
        state:"",
        email : cookies.get("email"),
        base64decoded : "",
    }
     
    handleFileInput = (event) => {
        const selectedfile = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(selectedfile);
        reader.onloadend = () => {
            this.setState({
                base64decoded : JSON.stringify({ data: reader.result }),
            });
        }
    }


    onTodoChange = (e) => {
        if(e.target.name==="name"){    
            this.setState({name:e.target.value})
        }else if(e.target.name=="age"){    
            console.log(e.target)
            this.setState({age:e.target.value})
        }else if(e.target.name==="bloodGroup"){  
            console.log(e.target.value)  
            this.setState({bloodGroup:e.target.value})
        }else if(e.target.name==="recoveryDate"){    
            this.setState({recoveryDate:e.target.value})
        }else  if(e.target.name==="phoneNumber"){    
            this.setState({phoneNumber:e.target.value})
        }else if(e.target.name==="address__areaName"){
            this.setState({
                areaName:e.target.value
            })
        }else if(e.target.name==="address__district"){
            this.setState({
                district:e.target.value
            })
        }else if(e.target.name==="address__pincode"){
            this.setState({
                pincode:e.target.value
            })
        }else if(e.target.name==="address__state"){
            this.setState({
                state:e.target.value
            })
        }
    }


    handleSubmit = (e) =>{
        e.preventDefault();
         
        const x = {
            name : this.state.name , 
            age:this.state.age,
            phoneNumber:this.state.phoneNumber,
            bloodGroup:this.state.bloodGroup,
            recoveryDate:this.state.recoveryDate,
            areaName:this.state.areaName,
            district:this.state.district,
            pincode:this.state.pincode,
            state:this.state.state,
            email : this.state.email,
            data : this.state.base64decoded 
        };
        
        if(cookies.get("token")){
            createHeader(cookies.get("token")).post("/patient/register",x)
            .then((res)=>{
               notify("Registered!! as patient. Now visit FindDonar section ." , "success");
            })
            .catch((e)=>{
                notify("Something went wrong","error");
            })
        }else{
            alert("Please SignIn first");
        }
    }


    render(){
        return (
            <div className="formDonate">
                <div>    
                    <SvgIcon src="iv-bag.svg" width="350px" height="350px" />
                </div>
                <form className="formDonate__form" onSubmit={this.handleSubmit}>
                    <div>
                    Patient Name*
                        <input required
                            type="text" 
                            name="name" 
                            value={this.state.name}
                            onChange={e => this.onTodoChange(e)} 
                            />
                    </div>
                    <div>
                        Patient Age*
                        <input required
                            type="number" 
                            name="age" 
                            value={this.state.age}
                            onChange={e => this.onTodoChange(e)} />
                    </div>

                    <div>
                        Phone Number*
                        <input required
                            type="number" 
                            name="phoneNumber" 
                            value={this.state.phoneNumber}
                            onChange={e => this.onTodoChange(e)} />
                    </div>

                    <div className="bloodgroup">
                    Blood Group*
                        <select required
                                id="bloodGroup" 
                                name="bloodGroup" 
                                onChange={e => this.onTodoChange(e)}>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                    </div>
                    <div>Recovery Date*
                    <input required
                        type="date" 
                        name="recoveryDate" 
                        value={this.state.recoveryDate}
                        onChange={e => this.onTodoChange(e)} />
                    </div>
                    <div>
                    Area Name
                    <input 
                        type="text" 
                        name="address__areaName" 
                        value={this.state.areaName }
                        onChange={e => this.onTodoChange(e)} />
                    </div>
                    
                    <div>District
                    <input 
                        type="text" 
                        name="address__district" 
                        value={this.state.district }
                        onChange={e => this.onTodoChange(e)} />
                    </div>
                    <div>State
                    <input 
                        type="text" 
                        name="address__state" 
                        value={this.state.state }
                        onChange={e => this.onTodoChange(e)} />
                    </div>
                    <div>Pincode*
                    <input required
                        type="text" 
                        name="address__pincode" 
                        value={ this.state.pincode   }
                        onChange={e => this.onTodoChange(e)} />
                    </div>
                    <div>Medical Report*   
                        <input 
                            type="file" 
                            accept="image/*"
                            name="medicalReport" 
                            onChange = {(e)=>this.handleFileInput(e)}
                            id="medicalReport"/>
                    </div>

                    <input className="form__submitDO" type="submit" value="submit"  />
                </form>
                <ToastContainer/>
            </div>
        );
    }
}

export default formPatient;