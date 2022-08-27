import React, { useState, useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from "native-base";



const GetSession = () => {

  const [data, setData] = useState([]);

  const start = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {                
        const jsonObj = JSON.parse(value);
        setData(jsonObj);
        console.log(data.first_name)
      } else {

      }
    } catch (e) {
      console.log(e);
      // error reading value
    }


  }
  useEffect(() => {
    start();
  }, [])
  

  return <Text>{data.first_name}</Text>;

}

// const SessionStatus = async (value) => {
//   try {
//     const jsonValue = JSON.stringify(value)
//     await AsyncStorage.setItem('@Session_Key', jsonValue)

//   } catch (e) {
//     console.log(e)
//     // saving error
//   }
// }

export {
  GetSession
}