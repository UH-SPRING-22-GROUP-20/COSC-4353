import React, {useContext, useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";
import Nav from './nav';


const ProfileRequest = ({setAuth}) => {
    const {userID} = useParams();
    let history = useHistory();
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [street2, setStreet2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    
    const checkAuth = async e => {
        var x = localStorage.token;
 
        if(!x)
         setAuth = false;
        else
         setAuth = true; 
         
     } 
    async function getUsername(){
        try {
            const response = await fetch("http://localhost:5050/dashboard/", {
                method: "GET",
                headers: {token: localStorage.token}
            });
            
            const parseResponse = await response.json()
    
            setUsername(parseResponse);
            
        } catch (error) {
            console.error(error.message)
            
        }
    }
    
    async function getInfo(){
        try {
            const body = {username}
            const response = await fetch(`http://localhost:5050/clientInformation/api/profileget/${username}`, {
                method: "GET",
                headers:{"Content-type" : "application/json"},
                // body: JSON.stringify(body),
                dataType: 'jsonp'
            });
            
            const parseResponse = await response.json()
            
            setName(parseResponse.results[0].name);
            setStreet(parseResponse.results[0].street);
            setStreet2(parseResponse.results[0].street2);
            setCity(parseResponse.results[0].city);
            setState(parseResponse.results[0].state);
            setZipcode(parseResponse.results[0].zipcode);
            
        } catch (error) {
            console.error(error.message)
            
        }
    }
    
    useEffect(()=>{
        getUsername()
        getInfo()
    })
//     const handleSubmit = async (e) =>
//   {

//     e.preventDefault()
//     try {
//       const body = {username}
//       const response = await fetch(`http://localhost:5050/clientInformation/api/profileget/${username}`, {
//         method: "GET",
//         headers:{"Content-type" : "application/json"},
//         // body: JSON.stringify(body),
//         dataType: 'jsonp'
//     });

//     const parseRes = await response.json();
//     console.log(parseRes.results[0].username)
//     // setName({parseRes.results.name})
//     setName(parseRes.results[0].name)

//     } catch (err) {
//       console.error(err)
//     }
//   }

  const handleSubmit = async (e) =>
  {

    e.preventDefault()
    try {
      const body = {username}
      const response = await fetch(`http://localhost:5050/clientInformation/api/profileget/${username}`, {
        method: "GET",
        headers:{"Content-type" : "application/json"},
        // body: JSON.stringify(body),
        dataType: 'jsonp'
    });

    const parseRes = await response.json();
    console.log(parseRes.results[0].username)
    // setName({parseRes.results.name})
    setName(parseRes.results[0].name)

    } catch (err) {
      console.error(err)
    }
  }


    return (
        <div>
            <div>
                <Nav/>
            </div>
        <div className="mb-4">
            <form action="">
                    <div className="col">
                        <div className="text">ENTER THESE FIELDS IF YOU want to change</div>
                    </div>
                    <div className="col"><label htmlFor="book_ref">your username <small></small></label>
                        <input disabled value={username} name="username" id="username" type="text" className="form-control" />
                    
                    </div>
                    <div className="col"><label htmlFor="book_ref">Your full name<small></small></label>
                        <input value={name} onChange = {(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Please Enter your full name"/>
                    
                    </div>
                    <div className="col"><label htmlFor="book_ref">Your street<small></small></label>
                        <input value={street} onChange = {(e) => setStreet(e.target.value)} type="text" className="form-control" placeholder="Please Enter your street"/>
                    
                    </div>
                    <div className="col"><label htmlFor="book_ref">street 2<small></small></label>
                        <input value={street2}  className ="form-control" type="text" onChange = {(e) => setStreet2(e.target.value)}/>
                    </div>
                    <div className="col"><label htmlFor="book_ref">city</label>
                        <input value={city}  className ="form-control" type="text" onChange = {(e) => setCity(e.target.value)}/>
                    </div>
                    <div className="col"><label htmlFor="book_ref">state</label>
                        <input value={state}  className ="form-control" type="text" onChange = {(e) => setState(e.target.value)}/>
                    </div>                    <div className="col"><label htmlFor="book_ref">zipcode</label>
                        <input value={zipcode}  className ="form-control" type="number" onChange = {(e) => setZipcode(e.target.value)}/>
                    </div>
                    <div className="col">
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Complete</button>
                    </div>

                    
            </form>
        </div>
        </div>
    )
}

export default ProfileRequest
