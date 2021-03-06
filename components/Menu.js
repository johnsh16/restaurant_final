import React from 'react'
import { Card, CardHeader, CardActionArea, CardContent, Typography, Checkbox, Stack, Button } from "@mui/material"
import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import styles from '../styles/Menu.module.css'
import {saveCart, loadCart} from '../lib/cartFunctions'




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
                  id
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
                if (restaurantDishes.length === breakfast.length + lunch.length + brunch.length + dinner.length) {
                    clearInterval(waitForLoad)
                    setArraysLoaded(true)
                }
            }, 10)
            
            setRestaurantDishes(filteredArray)
        }
    }, [data])


    if (arraysLoaded == true) {
        return (
            <>
            {breakfast.length > 0 
                ? <MenuLayout id="breakfastComponent" course={'breakfast'} data={breakfast} cart={props.cart}/> 
                : null
            }
            {brunch.length > 0 
                ? <MenuLayout id="brunchComponent" course={'brunch'} data={brunch} cart={props.cart}/> 
                : null
            }
            {lunch.length > 0 
                ? <MenuLayout id="lunchComponent" course={'lunch'} data={lunch} cart={props.cart}/> 
                : null
            }
            {dinner.length > 0 
                ? <MenuLayout id="dinnerComponent" course={'dinner'} data={dinner} cart={props.cart}/> 
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

function MenuLayout (props) {


    let courses = filterCourse(props.data)
    const [clicked, setClicked] = React.useState(false)

    console.log(props)

    var openClick = () => {
        setClicked(true)
    }

    useEffect(() => {
        console.log('menuLayout', props.cart)
    }, [])

    if (clicked) {
        return (
            <Card id={`courseCard-${props.course}`}>
                <CardActionArea onClick={() => setClicked(false)}>
                <CardHeader
                    title={props.course.charAt(0).toUpperCase() + props.course.slice(1)}
                />
                </CardActionArea>
                <CardContent>
                    {courses.appetizer.length > 0
                    ? <>
                        <Typography>Appetizers</Typography>
                        {
                            courses.appetizer.map((item, i) => (
                                <DishCard itemData={item} key={i} cart={props.cart}/>
                            ))
                        }
                        </>
                    : null    
                    }
                    {courses.soup.length > 0
                    ? <>
                        <Typography>Soups</Typography>
                        {
                            courses.soup.map((item, i) => (
                                <DishCard itemData={item} key={i} cart={props.cart}/>
                            ))
                        }
                        </>
                    : null    
                    }               
                    {courses.salad.length > 0
                    ? <>
                        <Typography>Salads</Typography>
                        {
                            courses.salad.map((item, i) => (
                                <DishCard itemData={item} key={i} cart={props.cart}/>
                            ))
                        }
                        </>
                    : null    
                    }
                    {courses.sandwich.length > 0
                    ? <>
                        <Typography>Sandwiches</Typography>
                        {
                            courses.sandwich.map((item, i) => (
                                <DishCard itemData={item} key={i} cart={props.cart}/>
                            ))
                        }
                        </>
                    : null    
                    }
                    {courses.main.length > 0
                    ? <>
                        <Typography>Main Courses</Typography>
                        {
                            courses.main.map((item, i) => (
                                <DishCard itemData={item} key={i} cart={props.cart}/>
                            ))
                        }
                        </>
                    : null    
                    }
                    {courses.dessert.length > 0
                    ? <>
                        <Typography>Desserts</Typography>
                        {
                            courses.dessert.map((item, i) => (
                                <DishCard itemData={item} key={i} cart={props.cart}/>
                            ))
                        }
                        </>
                    : null    
                    }
                    {courses.side.length > 0
                    ? <>
                        <Typography>Side Orders</Typography>
                        {
                            courses.side.map((item, i) => (
                                <DishCard itemData={item} key={i} cart={props.cart}/>
                            ))
                        }
                        </>
                    : null    
                    }
                    {courses.misc.length > 0
                    ? <>
                        <Typography>Other Items</Typography>
                        {
                            courses.misc.map((item, i) => (
                                <DishCard itemData={item} key={i} cart={props.cart}/>
                            ))
                        }
                        </>
                    : null    
                    }
                </CardContent>
            </Card>
        ) 
    } else {
        return (
            <>
            <Card id={`courseCard-${props.course}`}>
            <CardActionArea onClick={()=>openClick()}>
                <CardHeader
                    title={props.course.charAt(0).toUpperCase() + props.course.slice(1)}
                />
            </CardActionArea>
            </Card>
            </>
        )
    }
    
}

function DishCard (props) {


    let objRef = props.itemData.attributes

    const [itemObj, setItemObj] = React.useState({item: objRef, add: []})
    const [clicked, setClicked] = React.useState(false)
    const [cost, setCost] = React.useState(objRef.cost)
    const [cart, setCart] = React.useState(props.cart)

    useEffect(() => {
        console.log(`DishCard cart ${objRef.name}`, props.cart)
    }, [])

    const addOn = (upcharge, event) => {
        if (event.target.checked) {
            setCost(cost+upcharge.charge)
            setItemObj({item: objRef, add:[...itemObj.add, upcharge]})
        } else {
            setCost(cost-upcharge.charge)
        }
    }

    const addToCart = (event) => {
        console.log('cart at submit', cart)
        loadCart()
            .then((res) => {
                let parsed = JSON.parse(res)
                console.log('recieved at the Dish level', res)
                saveCart({"items": [...parsed.items, itemObj], "total": parsed.total + cost})
                    .then((res) => {
                        console.log('Cart saved as', res)
                        console.log(itemObj)
                        const addToCart = new CustomEvent('addToCart', {detail: itemObj.item.name})
                        window.dispatchEvent(addToCart)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
        
    }
    

    if (clicked) {
        return (
            <>
            <Card className={styles.cardClicked}>
                <CardActionArea onClick={()=>setClicked(false)}>
                <CardHeader
                    title={objRef.name}
                />
                </CardActionArea>
                <CardContent>
                    <Typography>
                        {objRef.description}
                    </Typography>
                    <Typography>
                        {cost}
                    </Typography>
                    {objRef.vegan
                    ? <Typography variant="body2">Vegan</Typography>
                    :null
                    }
                    {objRef.vegetarian
                    ? <Typography variant="body2">Vegetarian</Typography>
                    :null
                    }
                    {objRef.gf
                    ? <Typography variant="body2">GF</Typography>
                    :null
                    }
                    {
                        objRef.add !== null ?
                        <>{objRef.add.add.map((item, i) => (
                            <>
                            <Stack direction="row">
                            <Checkbox
                                onChange={(event) => addOn(item, event)}
                            /> <Typography>{item.description} +{item.charge}</Typography></Stack></>
                        ))}</> :
                        null
                    }
                    <Button color="success" onClick={addToCart} id={`${props.itemData.attributes.name}-submit`}>Add To Basket</Button>
                </CardContent>
            </Card>
            </>
        )
    } else {
        return (
            <>
            <Card className={styles.dishCard}>
                <CardActionArea onClick={()=>setClicked(true)}>
                <CardHeader
                    title={objRef.name}
                />
                </CardActionArea>
            </Card>
            </>
        )
    }
}

function filterCourse (props) {
    var appetizer, soup, salad, sandwich, main, dessert, side, misc;
    appetizer = []
    soup = []
    salad = []
    sandwich = []
    main = []
    dessert = []
    side = []
    misc = []
    for (let i = 0; i<props.length; i++) {
        switch (props[i].attributes.course) {
            case 'appetizer':
                appetizer.push(props[i])
                break;
            case 'soup':
                soup.push(props[i])
                break;
            case 'salad':
                salad.push(props[i])
                break;
            case 'sandwich':
                sandwich.push(props[i])
                break;
            case 'main':
                main.push(props[i])
                break;
            case 'dessert':
                dessert.push(props[i])
                break;
            case 'side':
                side.push(props[i])
                break;
            default:
                console.log('unclassified')
                misc.push(props[i]);
        }
    }
    return (
        {
            appetizer: appetizer,
            soup: soup,
            salad, salad,
            sandwich: sandwich,
            main: main,
            dessert: dessert,
            side: side,
            misc: misc
        }
    )
}

