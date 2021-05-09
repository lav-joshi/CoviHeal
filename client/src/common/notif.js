import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (msg,type)=>{

    if(type ==="success"){
        toast.success(msg, {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
        });
    }else if(type==="error"){
        toast.error(msg, {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
        });
    }
}

export default notify;