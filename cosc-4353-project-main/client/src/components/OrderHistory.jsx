

import React, {useContext, useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";
import { OrderContext } from '../context/OrderContext'
import '../style.css';
import Nav from './nav';
class OrderHistory  extends React.Component 
{
    constructor(props)
    {
        super(props);
    }

    state = 
    {
        data : [],
        username :""
    }

    getData= async ()=>
    {
        try 
        {
            const response = await fetch("http://localhost:5050/dashboard/", 
            {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseResponse = await response.json()
            
            this.setState({username:parseResponse});
            console.log("usernameL :",this.state.username)

            const username  = this.state.username
            const response2 = await fetch(`http://localhost:5050/order/getorder/${username}`, 
            {
                method: "GET",
                headers:{"Content-type" : "application/json"},
                dataType: 'jsonp'
            });
            const parseResponse2 = await response2.json()
            this.setState({data: parseResponse2.results})
        } 
        catch (error) 
        {
            console.error(error.message)

        }
    }

    checkAuth = async e => 
    {
        var x = localStorage.token;
 
        if(!x)
         this.props = false;
        else
         this.props = true; 
         
     } 

     getOrder = async ()=>
     {
        try 
        {
            const username  = this.state.username
            const response = await fetch(`http://localhost:5050/order/getorder/${username}`, 
            {
                method: "GET",
                headers:{"Content-type" : "application/json"},
                dataType: 'jsonp'
            });

            const parseResponse = await response.json()
            console.log(parseResponse); 
            this.setState({data: parseResponse.results})
        } catch (error) {
            console.error(error.message)
        }
    }

componentDidMount()
{
    this.getData()
}

render () {
    return (
        <div>
        <Nav/>
            <div className="header">   Order History of {this.state.username} </div>

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
