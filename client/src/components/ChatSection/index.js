import React , {useState, useEffect} from 'react';
import { Component } from 'react';
import Cookies from 'universal-cookie';
import firebase from '../../firebase'
import axios from 'axios';
import './styles.css';

const cookies = new Cookies();

const ChatSection = ()=> {

    const [chats , setChats] = useState([]);
    const ref = firebase.firestore().collection("chats");
    const [msg , setMsg] = useState("");
    const [sender_id , setSenderID] = useState("");
    const [favs , setFavs] = useState([]);
    
    const changeHandle = (e) => {
       setMsg(e.target.value);
    }
    
    const onSubmitHandle = async (e)=>{

        e.preventDefault();
        const refid_1 = sender_id + "_" + cookies.get("email"); 
        const refid_2 =  cookies.get("email") + "_" +  sender_id ; 

        const res = await ref.doc("Lav").get();
        let x  = [];
        if(res.data()){
            x = res.data()["msgs"]
        }
        x.push(msg);
        console.log(x);
        await ref.doc("Lav").set({
          msgs: x
        });
        setMsg("");
    }
    
     const getChats = async () => {
        const res = await ref.doc("Lav").get();

        if(res.data()){
            console.log(res.data()["msgs"]);
            setChats(x=>res.data()["msgs"]);
        }
        // res.onSnapshot((querySnapshot)=>{
        //    const items = [];
        //    querySnapshot.forEach((doc)=>{
        //        console.log(doc.data());
        //        items.push(doc.data());
        //    });
        //    setChats(items);
        // })

    }

    useEffect(()=>{
        getChats();
    },[])



    useEffect(() => {
       axios.post("http://localhost:5000/patient/getfavs",{email : cookies.get("email")})
       .then(res=>{
           setFavs(res.data);
       })
       .catch((e)=>{
           alert("Something went wrong");
       })
    }, [])

    
    const chatHistory = chats.length === 0 ? null : chats.map(el => {
        return(
            <div key={`${el}anc`} className="chat__card">{el}</div>
        );
    });

    return(
        <div className="ChatSection">
           
            <div className="chat__profiles">
                {
                  favs.map((x)=>{
                      return <div onClick={()=>setSenderID(x.donor_email)}> {x.donor_name} </div>
                  })
                }
            </div>

            <div className="chat__textArea">
                <div className="chat__history">
                    {chatHistory}
                </div>

                <form className="chat__form" onSubmit={onSubmitHandle}>    
                    <input className="chat__typearea"
                        name="chat"
                        type="text"
                        required
                        value= {msg}
                        onChange={changeHandle}/>

                    <input className="chat__textsubmit"
                        name="submit_chat"
                        type="submit"/>
                </form>
            </div>
        </div>
    );

}

export default ChatSection;