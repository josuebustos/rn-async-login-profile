import React, { useState, useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from "native-base";

const GetSession = () => {

  const [data, setData] = useState([]);

  const showText = () => {    
    if (data.length === 0) {
      return <Text>No Data</Text>;
    } else{      
      return <Text>{data.company.description.blocks[0].text}</Text>;
    }
  }

  const start = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        const jsonObj = JSON.parse(value);
        setData(jsonObj);
        // console.log(data.first_name)
      } else {
        console.log("no data found");
      }
    } catch (e) {
      setData(null);
      console.log("error");
      // error reading value
    }
  }

  useEffect(() => {
    start();
  }, [])


  return <>{showText()}</>;

}

export {
  GetSession
}