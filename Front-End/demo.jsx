import React, { useState } from "react";



const intialData={
  firstName:"",
  lastName:"",
  email:"",
  password:"",
  confirmPassword:""
}
const [fromData,setFormData]=useState()


const resetForm=()=>{
  setFormData(intialData)

}