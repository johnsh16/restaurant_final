import React from 'react'
import { Card, CardHeader, CardActionArea, CardContent } from "@mui/material"
import {gql, useQuery, ApolloProvider,ApolloClient,HttpLink, InMemoryCache} from '@apollo/client';
import { CommentsDisabledOutlined, ContactSupportOutlined } from '@mui/icons-material';
import { useEffect } from 'react';



function Menu (props) {

    const GET_DISHES = gql`
    query {
        dishes (pagination: {limit: -1}) {
            data {
            id
            attributes {
              name
              description
              restaurant {
                data {
                  attributes{
                    name
                  }
                }
              }
              cost
              add
              vegetarian
              vegan
              gf
              service 
              course
            }
          }
        }
      }
    `
    
    

    const { loading, error, data } = useQuery(GET_DISHES)
    const [restaurantDishes, setRestaurantDishes] = React.useState([])
    const [arraysLoaded, setArraysLoaded] = React.useState(false)
    const [breakfast, setBreakfast] = React.useState([])
    const [brunch, setBrunch] = React.useState([])
    const [lunch, setLunch] = React.useState([])
    const [dinner, setDinner] = React.useState([])

    useEffect(() => {
        if (!loading && !error) {
            console.log(data)
            let filteredArray = []
            for (let i = 0; i<data.dishes.data.length; i++) {
                let obj = data.dishes.data[i].attributes.restaurant.data
                if (obj.attributes["name"] === props.name) {
                   filteredArray.push(data.dishes.data[i])
                   switch (data.dishes.data[i].attributes.service) {
                       case 'breakfast' :
                        setBreakfast(obj => [...obj, data.dishes.data[i]])
                        break;
                       case 'brunch' :
                        setBrunch(obj => [...obj, data.dishes.data[i]])
                        break;
                       case 'lunch' :
                        setLunch(obj => [...obj, data.dishes.data[i]])
                        break;
                       case 'dinner' : 
                        setDinner(obj => [...obj, data.dishes.data[i]])
                        break;
                       default:
                        console.log('not classified', data.dishes.data[i]);
                   }
                }
            }
            var waitForLoad = setInterval(() => {
                if (restaurantDishes.length === data.dishes.data.length) {
                    console.log(restaurantDishes)
                    clearInterval(waitForLoad)
                    setArraysLoaded(true)
                }
            }, 10)
            setRestaurantDishes(filteredArray)
        }
    }, [data])



    function MenuLayout (props) {

        console.log(props)

        return (
            <Card>
                <CardHeader
                    title={props.course.charAt(0).toUpperCase() + props.course.slice(1)}
                />
                <CardContent>
                {
                    props.data.map((item, i) => (
                        <DishCard props={item} key={i} />
                    ))
                }
                </CardContent>
            </Card>
        )
    }

    if (arraysLoaded == true) {
        console.log(breakfast, brunch, lunch, dinner)
        return (
            <>
            {breakfast.length > 0 
                ? <MenuLayout course={'breakfast'} data={breakfast}/> 
                : null
            }
            {brunch.length > 0 
                ? <MenuLayout course={'brunch'} data={brunch}/> 
                : null
            }
            {lunch.length > 0 
                ? <MenuLayout course={'lunch'} data={lunch}/> 
                : null
            }
            {dinner.length > 0 
                ? <MenuLayout course={'dinner'} data={dinner}/> 
                : null
            }
            </>
        )
    } else {
        return (
            <div>Loading...</div> 
        )
    }
    
}

export default Menu

function DishCard (props) {

    console.log(props)
    let objRef = props.props.attributes

    return (
        <>
        <Card>
            <CardHeader
                title={objRef.name}
            />
        </Card>
        </>
    )
}

