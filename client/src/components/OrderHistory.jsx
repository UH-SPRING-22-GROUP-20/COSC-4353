

import React, {useContext, useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";
import { OrderContext } from '../context/OrderContext'
import '../style.css';
import Nav from './nav';
class OrderHistory  extends React.Component {
    
    constructor(props){
        super(props);
        //does whatever stuff        
        
    }
    
    // let history = useHistory();
    // const [username, setUsername] = useState("");
    // const [name, setName] = useState("");
    // const [gallons_req, setGallons] = useState("");
    // const [reqID, setReqID] = useState("");
    // const [price, setPrice] = useState("");
    // const [total, setTotal] = useState("");
    // const [street, setStreet] = useState("");
    // const [street2, setStreet2] = useState("");
    // const [city, setCity] = useState("");
    // const [state, setState] = useState("");
    // const [zipcode, setZipcode] = useState("");
    // const [data, setData] = useState([]);

    state = {
        data : [],
        username :""
    }

    // const handleClick = ()=>{
    //     getUsername()
    //     getInfo()
    //     getOrder()
    // }

    getData= async ()=>{
        try {
            const response = await fetch("http://localhost:5050/dashboard/", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseResponse = await response.json()
            
            this.setState({username:parseResponse});
            console.log("usernameL :",this.state.username)

            /////////////////////////
            const username  = this.state.username
            const response2 = await fetch(`http://localhost:5050/order/getorder/${username}`, {
                method: "GET",
                headers:{"Content-type" : "application/json"},
                // body: JSON.stringify(body),
                dataType: 'jsonp'
            });
            const parseResponse2 = await response2.json()
            this.setState({data: parseResponse2.results})

        } catch (error) {
            console.error(error.message)

        }
    }
    //  getInfo= async ()=>{
    //     try {
    //         const body = {username}
    //         const response = await fetch(`http://localhost:5050/clientInformation/api/profileget/${username}`, {
    //             method: "GET",
    //             headers:{"Content-type" : "application/json"},
    //             // body: JSON.stringify(body),
    //             dataType: 'jsonp'
    //         });

    //         const parseResponse = await response.json()

    //         this.setState(parseResponse.results)


    //     } catch (error) {
    //         console.error(error.message)

    //     }
    // }
    checkAuth = async e => {
        var x = localStorage.token;
 
        if(!x)
         this.props = false;
        else
         this.props = true; 
         
     } 
     getOrder = async ()=>{
        try {
            const username  = this.state.username
            // console.log("this is viet ", username)
            const response = await fetch(`http://localhost:5050/order/getorder/${username}`, {
                method: "GET",
                headers:{"Content-type" : "application/json"},
                // body: JSON.stringify(body),
                dataType: 'jsonp'
            });

            const parseResponse = await response.json()
            console.log(parseResponse); 
            // setReqID(parseResponse.results[0].reqID);
            // setGallons(parseResponse.results[0].gallons_req);
            // setPrice(parseResponse.results[0].price);
            // setTotal(parseResponse.results[0].total);
            this.setState({data: parseResponse.results})

            // setState(parseResponse.results[0].state);
            // setZipcode(parseResponse.results[0].zipcode);

        } catch (error) {
            console.error(error.message)
        }
    }
    // handleClick  = ()=>{
    //     this.getUsername()
    //     this.getOrder()
    // }

//  console.log(username)
componentDidMount(){
    this.getData()
    // this.getOrder()
}

render () {
    return (
        <div>
        <Nav/>
            <div className="header">   Order History of {this.state.username} </div>
            {/* <div className="text">Are you sure to get all order</div>
    <button onClick={e=>this.handleClick()}>Yes</button> */}

<table class="styled-table">
    <thead>
        <tr>
        	<th>Order ID</th>
            <th>Username</th>
            <th>Gallons Purchased</th>
            <th>Price</th>
            <th>Total Amount</th>
        </tr>
    </thead>
    <tbody>
        {this.state.data.map(row =>{
            return (
                <tr>
                <td>{row.reqID}</td>
                <td>{row.username}</td>
                <td>{row.gallons_req}</td>
                <td>{row.price}</td>
                <td>{row.total}</td>
                </tr>
            )


        })}
                  


    </tbody>
</table>



        </div>
    )
}
}
export default OrderHistory
