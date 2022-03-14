import React, {useContext, useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from "axios"
import '../App.css'
import Nav from './nav'
const FuelQuote = () => 
{
    let history = useHistory();
    const [username, setUsername] =  useState("");
    const [gallons_req, setGallons] = useState("");
    const [date, setDate] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [street2, setStreet2] = useState("");
    const [state, setState] = useState("");
    const [price, setPrice] = useState("");
    const [total, setTotal] = useState("");

    async function getName()
    {
        try 
        {
            const response = await fetch("http://localhost:5050/dashboard/", 
            {
                method: "GET",
                headers: {token: localStorage.token}
            });
            
            const parseResponse = await response.json()

            setUsername(parseResponse);
            
        } 
        catch (error) 
        {
            console.error(error.message)
            
        }
    }

    async function getInfo()
    {
        try 
        {
            const body = {username}
            const response = await fetch(`http://localhost:5050/clientInformation/api/profileget/${username}`, {
                method: "GET",
                headers:{"Content-type" : "application/json"},
                dataType: 'jsonp'
            });
            
            const parseResponse = await response.json()
            
            setName(parseResponse.results[0].name);
            setStreet(parseResponse.results[0].street);
            setStreet2(parseResponse.results[0].street2);
            setCity(parseResponse.results[0].city);
            setState(parseResponse.results[0].state);
            setZipcode(parseResponse.results[0].zipcode);
            
        } 
        catch (error) 
        {
            console.error(error.message)
            
        }
    }
    
    useEffect(()=>
    {
        getName()
    })
    useEffect(()=>
    {
        getInfo()
    })

    const handleSubmit = async (e) => 
    {
        e.preventDefault()
        try 
        {
            const body = {username, gallons_req}
            const response = await fetch(`http://localhost:5050/price/quote/${username}/${gallons_req}`, {
                method: "GET",
                headers: {"Content-type" : "application/json"},
                dataType: 'jsonp'
            });

            const parseRes = await response.json();
                console.log(parseRes)
                if (parseRes === "Complete your profile")
                {alert("Complete your profile")
            
            ;}
                setPrice(parseRes.data.price);
                setTotal(parseRes.data.total);
                setGallons(parseRes.data.gallons_req);
                setCity(parseRes.data.city);
                setState(parseRes.data.state);
                setStreet(parseRes.data.street);
                setZipcode(parseRes.data.zipcode);

        } 
        catch (error) 
        {
            console.error(error.message)
        }   
}

const handleSubmit1 = async (e) => 
{
    e.preventDefault()
    try 
    {
        const body = 
        {
            username, 
            gallons_req, 
            state,
            zipcode, 
            street, 
            price, 
            total, 
            city, 
            date
        }
        const response = await fetch(`http://localhost:5050/price/submit`, 
        {
            method: "POST",
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify(body),
            dataType: 'jsonp'
        });
        const parseRes = await response.json();
            console.log(parseRes)
            history.push(`/dashboard`)

    } 
    catch (error) 
    {
        console.error(error.message)
    }
    
}
    return (
        <div>
        <Nav/>
        <h1> Fuel Quote Form </h1><br />
<form action="">

<div>User: {username}</div>
<div>Logged in</div>
<div></div>
<div></div>
<div></div>
<div></div>

<div className="fuelquote">
<table >

    <tr>

        <td>

            <div>

            <label class="required" for="gallons">Gallons Requested:</label>
            <input type="number" name="gallons" id="gallons" min="1"value={gallons_req} onChange = {(e) => setGallons(e.target.value)} required />
            
            </div>

        </td>

    </tr>

    <tr>

        <td>

            <div>

                <label class="required" for="address">Delivery Address:</label>
            <div><input disabled type="text" value={street} name="street" id="street" required /></div>
            <div><input disabled type="text" value={city} name="city" id="city"  required /></div>
            <div><input disabled type="text" value={state} onChange = {(e) => setState(e.target.value)} name="state" id="state"  required /></div>
            <input disabled type="number" value={zipcode} name="zipcode" id="zipcode" placeholder="77077"required />
        </div>

        </td>

    </tr>


    <tr>

        <td>

            <div>

                <label class="required" for="ex_delivery_date">Delivery Date:</label>
            <input type="date" value={date} name="ex_delivery_date" onChange = {(e) => setDate(e.target.value)} id="ex_delivery_date"  required />
        </div>

        </td>

    </tr>


    <tr>

        <td>

            <div>

                <label class="required" for="sug_quote">Suggestion Quote:</label>
            <input type="number" value={price} name="sug_quote" id="sug_quote" placeholder="ex:2345"  required /><span>Per Gallon</span>
        </div>

        </td>

    </tr>

    <tr>

        <td>

            <div>

                <label for="sug_quote">Total Amount Due:</label>
            <input disabled type="number" value={total} name="amount_due" id="amount_due" placeholder="Your expected Amount Due Will Display here"  required /><span>Dollars</span>
        </div>

        </td>

    </tr>


    <tr>

        <td>

            <div>

                
    <button onClick={handleSubmit} type="submit" className="button">Click here to get quote</button>
            </div>

        </td>

    </tr>
    <tr>

<td>

    <div>

    <button onClick={handleSubmit1}class="button" type="submit" >Submit</button>

    </div>

</td>

</tr>

</table>
</div>
            </form>



        </div>
    )
}

export default FuelQuote
