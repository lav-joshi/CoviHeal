import React , {useState , useEffect} from 'react';
import moment from 'moment'
import DonarCard from './../../common/DonarCard';
import Cookies from 'universal-cookie';
import axios from 'axios';
import './index.css';

const cookies = new Cookies();

const FindDonar = (props) => {
 
    const sendRequest = (em) =>{

        axios.post("http://localhost:5000/patient/addfav",{patientemail : cookies.get("email") , donoremail : em})
        .then((res)=>{
            alert(res.data.message);
        })
        .catch((e)=>{
            alert("Something went wrong");
        })
    }

    const [DonorsContent , setDonorsContent] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/donor/findalldonors")
        .then((res)=>{ 
             setDonorsContent(res.data);
        })
        .catch(e=>{
            alert(e.message);
        })
    }, [])

    const DList = DonorsContent.map(el => {
        let rdate = el.recoveryDate;
        rdate = moment(rdate).format('MMMM Do YYYY');
    
        return (
            <DonarCard 
                key={el._id}
                name={el.name}
                age={el.age}
                recoveryDate={rdate}
                bloodGroup={el.bloodGroup}
                location= {el.areaName + "  " + el.district + " "+ el.state + "  "+ el.pincode}
                email={el.email}
                isVerified = {el.isVerified}
                onclick={()=> sendRequest(el.email)}
            />
        )
    });

    return(
        <div className="findDonar__section">
            <h3>Donars</h3>
            <div className="findDonar__form">
                <form >
                    <input 
                    type="text"
                    />
                    <select required
                            id="filter" 
                            name="filter"
                            placeholder="Filter Name" >
                        <option value="BloodGroup">BloodGroup</option>
                        <option value="location">location</option>
                        <option value="name">name</option>
                        <option value="recoveryDate">recoveryDate</option>
                    </select>
                </form>
            </div>
            <div className="findDonar__cards">{DList}</div>
        </div>
 
    );
}
 
export default FindDonar;
 
