import React, { useState, useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from "native-base";

const GetSession = () => {

  const [data, setData] = useState([]);

  const getUserSession = async () => {
    try {
      const sessionKey = await AsyncStorage.getItem('@session_Key');
      // console.log(sessionKey);
      if (sessionKey === null) {
        await AsyncStorage.setItem('@session_Key', "false");       
      }
    } catch (e) {
      console.log(e);
      // saving error
    }
  }
  

  const getUserProfile = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
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
    getUserSession();
  // getUserProfile();  

  }, []);

  const showText = () => {
    if (data.length === 0) {
      return <Text>Please Log In</Text>;
    } else {
      return <Text>{data.company.description.blocks[0].text}</Text>;
    }
  }

  return <>{showText()}</>;

}

export {
  GetSession
}