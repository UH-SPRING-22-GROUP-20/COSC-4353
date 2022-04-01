import React, {useState, createContext} from 'react';

export const OrderContext = createContext();

export const OrderContextProvider = (props) =>{
    const [lists, setLists] = useState([]);
    const addLists = (list) => {
        setLists([...lists, list]);
    }



    return (
<OrderContext.Provider 
        value = {{
            lists, setLists
        }}>
            {props.children}
</OrderContext.Provider>
    );
};


