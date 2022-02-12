import React from "react";

const AppContext = React.createContext({
        authenticated: false,
        cart: {
            items:[],
            total: 0
        },
        addItem: () => {},
        removeItem: () => {},
        user: false,
        setUser:() => {}
    })
export default AppContext
