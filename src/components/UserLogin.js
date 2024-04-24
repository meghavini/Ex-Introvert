//UserLogin.js
import React, {useState} from "react";
import{CommentOutlined} from "@ant-design/icons"
import _ from 'lodash';


const button={
    width:'10%',
    height:50,
    fontWeight:'bold',
    borderRadius:10,
    fontSize:18,
    backgroundColor:'gold',
    borderWidth:0,
    color:'#fff',
    margin:10
}
export default function UserLogin({setUser}){

    const[user, setAUser]=useState("")

    function handleSetUser(){
        if(!user) return
        localStorage.setItem("user",user)
        setUser(user)
        localStorage.setItem("avatar", 'https://picsum.photos/id/${_.random(1,1000)}/200/300' )
    }
    return(
        <div>
            <h1 style={{margin:100, textAlign:'center',fontSize:100}}><CommentOutlined color={'green'}/> Ex Introvert</h1>
            <div style={{display:'flex',justifyContent:'center'}}>
            <input
            style={{margin:10, height:30, width:'25%',borderRadius:10, borderWidth:10}}
            value={user}
            onChange={e=> setAUser(e.target.value)}
            placeholder="Enter your Name"
            ></input>

            <button
            onClick={()=>handleSetUser()}
            style={button}
            >
            Login
            </button>
            </div>
            
            

        </div>
    )
}