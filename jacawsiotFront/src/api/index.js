import axios from "./axios.js"

const getMsg= async (data)=>{
    try{
        const {data: list}= await axios.get('msg');
        //console.log({list});
        
        return list.slice(-50); 
    }catch(e){
        console.log(e);
        return [];
    }
}

const getAlert= async (data)=>{
    try{
        const {data: list}= await axios.get('alarm');
        console.log({list});
        return list;
    }catch(e){
        console.log(e);
        return [];
    }
}

export  {
    getMsg, 
    getAlert
};