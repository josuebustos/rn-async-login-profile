import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Stack,
  Input,
  Icon,
  Button,
  Spacer
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import NativeBaseIcon from "./components/NativeBaseIcon";
import { Platform } from "react-native";
import { sha256 } from 'react-native-sha256';
import * as Progress from 'react-native-progress';
import GETCODE from "./components/GerVerificationCode";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  const [submitButton, setSubmitButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [profileData, setProfileData] = useState([]);

  const LoadingSpinner = () => {
    return <Progress.CircleSnail color={['#00CED1', '#00BFFF', '#1E90FF']} />
  }


  const GetStorageData = () => {

    const getData = async () => {
      try {

        const value = await AsyncStorage.getItem('@storage_Key')

        if (value !== null) {
          const profile = JSON.parse(value);
          // console.log(profile.first_name)
          setProfileData(profile);
        }
      } catch (e) {
        console.log("no data")
        // error reading value
      }
    }

    return (
      <VStack space={2} alignItems="center">
        <Text fontSize="xs" _light={{
          color: "violet.500"
        }} _dark={{
          color: "violet.400"
        }} fontWeight="500" ml="-0.5" mt="-1">
          {profileData.first_name}
        </Text>
        <Button onPress={() => getData()}> Get Data </Button>
      </VStack>
    );
  }

  const VerifyCode = () => {
    const [data, setData] = useState([]);

    const [value, setValue] = useState('');
    const handleChange = (text) => setValue(text);

    const checkCode = async (code) => {

      try {
        const request = new Request('https://kp-merge.herokuapp.com/email_verifications', { method: 'POST', body: `{"email_verification_code":"${code}"}` });
        const response = await fetch(request);
        const data = await response.json();
        console.log(data)
        await AsyncStorage.setItem('@storage_Key', JSON.stringify(data));

      } catch (error) {
        console.error(error);
      } finally {
        // setLoading(false);
      }

    }

    useEffect(() => {
      // checkCode();
    }, []);

    return (
      <VStack space={2} alignItems="center">
        <Input value={value} w="75%" maxW="300px"
          onChangeText={handleChange}
          placeholder="Verify Email" />
        <Button onPress={() => checkCode(value)}> Verify Code </Button>
      </VStack>
    )
  }


  const GetCode = () => {

    const [value, setValue] = useState('');
    const handleChange = (text) => setValue(text);

    const oneTimeCode = () => {
      // console.log("main: "+ value);
      setSubmitButton(true);
      GETCODE(`${value}`);

    }

    const switchSubmitButton = submitButton ? <Button isLoading isLoadingText="Submitting"> Submitting </Button> : <Button onPress={() => oneTimeCode()}> Submit </Button>

    return (

      <VStack space={5} alignItems="center">
        {/* <NativeBaseIcon /> */}
        <Heading size="lg">Welcome to Kick Post</Heading>
        <VStack space={2} alignItems="center">
          <Input value={value} w="75%" maxW="300px"
            onChangeText={handleChange}
            placeholder="Get Verification Code" />
          {switchSubmitButton}

          <Button onPress={() => setSubmitButton(false)}> Restart </Button>
        </VStack>
      </VStack>
    )
  }

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <VStack space={15}>
          <GetCode />
          <VerifyCode />
          <GetStorageData />
        </VStack>
        {/* {isLoading ? <LoadingSpinner />
          :
          
        } */}

      </Center>
    </NativeBaseProvider>
  );
}

