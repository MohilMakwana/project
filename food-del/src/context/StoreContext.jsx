import { createContext, useEffect, useState } from 'react'
import { food_list } from '../assets/assets'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {       //it will create a new entry if the data is there or not
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {                         //it will increase the value by 1
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }

    const removeFromCart = (itemId) => {     //it will decrease the value by 1
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }


    // checking cartItems 
    // useEffect(() => {
    //     console.log(cartItems);
    // }, [cartItems])

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if(cartItems[item]>0){
            let itemInfo = food_list.find((product) => product._id === item) //we are using for in loop (carItems is an object) which can give items one by one and this item will be the key value of the item
            totalAmount += itemInfo.price * cartItems[item]        //it will give item price and multiply with the cartItems[items and give the total amount]
            }
        }
        return totalAmount;
    }




    const contextvalue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }
    return (
        <StoreContext.Provider value={contextvalue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider