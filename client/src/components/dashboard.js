import '../App.css';
import React, {useState,useEffect} from 'react';
import Nav from '../components/nav';

const Dashboard = ({setAuth}) => {
   
    const logout = async e => {
        setAuth(false);
        localStorage.clear();
        
    } 
    const [name, setName] =  useState("")

    async function getName(){
        try {
            const response = await fetch("http://localhost:5050/dashboard/", {
                method: "GET",
                headers: {token: localStorage.token}
            });
            
            const parseResponse = await response.json()

            setName(parseResponse);
            
        } catch (error) {
            console.error(error.message)
            
        }
    }
    useEffect(()=>{
        getName()
    })
    return (
        <div>
            <Nav/>
            <h1>Welcome {name}</h1>
            <button onClick = {e => logout(e)}>Log out</button>
        </div>
    )
}

export default Dashboard