
import React , {useState, useEffect} from 'react';
import { Component } from 'react';
import Cookies from 'universal-cookie';
import firebase from '../../firebase'
import axios from 'axios';
import './styles.css';
import moment from 'moment'
import SvgIcon from '../../common/SvgIcon';
import notify from '../../common/notif';
import { toast, ToastContainer } from 'react-toastify';
const cookies = new Cookies();

const ChatSection = ()=> {

    const [chats , setChats] = useState([]);
    const ref = firebase.firestore().collection("chats");
    const [msg , setMsg] = useState("");
    const [sender_id , setSenderID] = useState("null");
    const [favs , setFavs] = useState([]);
    
    const changeHandle = (e) => {
       setMsg(e.target.value);
    }
    
    const onSubmitHandle = async (e)=>{

        e.preventDefault();
        let doc_id = "";
        let y= cookies.get("email").localeCompare(sender_id);
        if(y < 0){
            doc_id =  cookies.get("email") + "_" +  sender_id ; 
        }else{
            doc_id =  sender_id + "_" + cookies.get("email");
        }

        const res = await ref.doc(doc_id).get();
        let x  = [];
        if(res.data()){
            x = res.data()["msgs"]
        }
        
        const temp = {
            msg , 
            timeStamp : Date.now(),
            sender : cookies.get("user")
        }

        x.push(temp);
        
        console.log(x);

        ref.doc(doc_id).set({
          msgs: x
        });

        setMsg("");
        getChats();
    }

    
    const getChats = async () => {
        
        let doc_id = "";
        let y= cookies.get("email").localeCompare(sender_id);
        if(y < 0){
            doc_id =  cookies.get("email") + "_" +  sender_id ; 
        }else{
            doc_id =  sender_id + "_" + cookies.get("email");
        }


        ref.onSnapshot((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                if(doc.id == doc_id){
                    setChats(doc.data().msgs);
                }
            });
        })
    }

    useEffect(() => {
        axios.post("http://localhost:5000/patient/getfavs",{email : cookies.get("email")})
        .then(res=>{
            setFavs(res.data);
        })
        .catch((e)=>{
            alert("Something went wrong");
        })
        }, [])


    const handleChats = (donor_email)=>{
        console.log(donor_email);
        setSenderID(donor_email);
        getChats();
    }

    const chatHistory = chats.length === 0 ? null : chats.map(el => {
        return(
            <div key={`${el.timeStamp}anc`} className="chat__msg">
                        <span>{el.sender}</span>
                        <p>{el.msg}</p>
                        <div>{moment(el.timeStamp).format('h:mm:ss a')}</div>
            </div>
        );
    });

    const handleNotify = ()=>{
         
        axios.post("http://localhost:5000/notify",{email : sender_id}).then((res)=>{
            notify("User has been notified" , "success");
        })
        .catch((e)=>{
            notify("Something went wrong" , "error");
        })
    }

    const handleReport = ()=>{
        notify("User has been reported" , "error");
    }
  
    return(
        <div className="ChatSection">

            <div className="chat__profiles">
                <h6>Contacts</h6>
                {   
                    favs.map((x)=>{
                        return <div className="chat__profile" onClick={()=>handleChats(x.donor_email)}> {x.donor_name} </div>
                    })
                }
            </div>

            <div className="chat__textArea">
                <div className="chat__history">
                    {chatHistory}
                </div>

                {sender_id === "null" ? null:
                
                <form className="chat__form" onSubmit={onSubmitHandle}>    
                    <input className="chat__typearea"
                        name="chat"
                        type="text"
                        required
                        value= {msg}
                        onChange={changeHandle}/>

                    <input className="chat__textsubmit"
                        name="submit_chat"
                        type="submit"
                        value="Send"
                        style={{"backgroundColor" : "lightblue"}}
                    />
                        
                    <input className="chat__textsubmit"
                        name="submit_chat"
                        type="button"
                        value="Notify"
                        onClick = {(e)=>{
                           handleNotify()
                        }}
                        style={{"backgroundColor" : "lightgreen"}}
                    />
                        
                    <input className="chat__textsubmit"
                        name="submit_chat"
                        type="button"
                        value="Report"
                        onClick = {(e)=>{
                            handleReport()
                         }}
                        style={{"backgroundColor" : "salmon"}}
                    />
                </form>}

                
            </div>
            <ToastContainer/>
        </div>
    );

}

export default ChatSection;



