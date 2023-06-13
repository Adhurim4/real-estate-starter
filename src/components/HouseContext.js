import React, {useState, useEffect, createContext} from 'react';

import {housesData} from '../data'

export const HouseContext = createContext();

const HouseContextProvider = ({children}) => {
  const [houses, setHouses] = useState(housesData) 
  const [country, setCountry] = useState("Location Any")
  const [countries, setCountries] = useState([])
  const [property, setProperty] = useState("Property type Any")
  const [properties, setProperties] = useState([])
  const [price, setPrice] = useState("Price range Any")
  const [loading, setLoading] = useState(false)

  //Return all countrie

  useEffect(()=>{
    const allCountries = houses.map((house)=>{
      return house.country;
    })
    // Remove Duplicate
    const  uniqueCountries = ['Location Any ', ... new Set(allCountries)]
    setCountries(uniqueCountries);
  },[])

  //Return Properties
  useEffect(()=>{
    const allProperties = houses.map((house)=>{
      return house.type;
    })
    // Remove Duplicate
    const  uniqueProperties = ['Property Any ', ... new Set(allProperties)]
    setProperties(uniqueProperties);
  },[])

  const handleClick = () => {

    // setLoading
    setLoading(true);

    //create a function that checks if the string includes
    // '(any)'

    const isDefault = (str) =>{
      return str.split(' ').includes("Any");
    }
    console.log(price, country, property);

     //get first and second value
     // of price and parse it to number
     const minPrice = parseInt(price.split(' ')[0]);
     const maxPrice = parseInt(price.split(' ')[2]);

     console.log(maxPrice);         

     const newHouses = housesData.filter((house)=>{

      const housePrice = parseInt(house.price);
     
        // kjo poshte ti kthen shpijat qe permbushin vlerat 
        //nga Search

      if(house.country === country && house.type === property 
        && housePrice>= minPrice && housePrice<= maxPrice){
          return house;
        }

        // nese nuk ka kliku useri asnje vlere ateher eshte kjo
        // me poshte 
        if (isDefault(country) && isDefault(property) & isDefault(price)){
          return house;
        }
        
        //nese ka shtyp veq country-n

        if((!isDefault(country)) && isDefault(property) && isDefault(price)){
          return house.country === country;

        }
        //nese e ka shtyp veq property

        if(isDefault(country) && (!isDefault(property)) && isDefault(price)){
          return house.type === property;
        }

        //nese e ka shtyp veq price
        if(isDefault(country) && isDefault(property) && (!isDefault(price))){
          if(housePrice >= minPrice && housePrice <= maxPrice){
            return house;
          }
        }
       
        //nese e ka shtyp veq conuntry edhe property
         if((!isDefault(country)) && (!isDefault(property)) && isDefault(price)){
           return house.country== country &&  house.type===property;
        }

        //nese e ka shtyp country dhe price 
           if((!isDefault(country)) && isDefault(property) && (!isDefault(price))){
           if(house.price >= minPrice && house.price <= maxPrice) {
            return house.country===country; 
           }
         }
         
         //nese e ka shty property edhe price
         if(isDefault(country) && (!isDefault(property)) && (!isDefault(price))){
          if(house.price >= minPrice && house.price <= maxPrice) {
           return house.type===property ; 
          }
        }

     });

    setTimeout(()=>{
      return newHouses.length <1 ? setHouses([]) : 
      setHouses(newHouses),
      setLoading(false);
    }, 1000)
  
  }
 
  return (
        <HouseContext.Provider
        value={{
          country,
          setCountry,
          countries,
          setCountries,
          property,
          setProperty,
          properties,
          setProperties,
          price,
          setPrice,
          houses,
          loading,
          handleClick  
        }}>
          {children}
        </HouseContext.Provider>
    );
};

export default HouseContextProvider;
