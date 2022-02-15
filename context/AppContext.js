import React from "react";
import Cookies from 'js-cookie'

const AppContext = React.createContext({
        authenticated: () => {return !(Cookies.get("token") == undefined)},
        setAuthenticated: (props) => {
            authenticated = props
        },
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
