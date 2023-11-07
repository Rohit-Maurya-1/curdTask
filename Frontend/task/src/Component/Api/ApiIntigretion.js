import axios from "axios";

 export const BASE_URI ="http://localhost:8000/"


  //===================================Manage clientr==================
  export const ADDCLIENT= async(value)=>{
    try {
     let URL= BASE_URI+"createClient"
     const res= await axios.post(URL,value)
     return res
    } catch (error) {
      return error
    }
  } 
  export const GETCLIENT= async()=>{
    try {
     let URL= BASE_URI+"getClient"
     const res= await axios.get(URL)
     return res
    } catch (error){
      return error
    }
  } 
  export const UPDATECLIENT= async(value,id)=>{
    try {
     let URL= BASE_URI+`updateClient/${id}`
     const res= await axios.put(URL,value)
     return res
    } catch (error){
      return error
    }
  } 
  export const DELETECLIENT= async(id)=>{
    try {
     let URL= BASE_URI+`deleteClient/${id}`
     const res= await axios.delete(URL)
     return res
    } catch (error){
      return error
    }
  } 
 


