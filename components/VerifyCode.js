import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Button } from "react-native-paper";
  
const PostRequestExample = () => {
    const request = new Request('https://kp-merge.herokuapp.com/sessions', { method: 'POST', body: `{"email":"${email}"}` });
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(`{email:${email}}`)
    };
  
    const postExample = async () => {
        try {
            await fetch(
                'https://kp-merge.herokuapp.com/sessions', requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            Alert.alert("Post created at : ", 
                            data.createdAt);
                        });
                })
        }
        catch (error) {
            console.error(error);
        }
    }
  
    return (
        <View style={styles.btn}>
            <Button mode="contained" onPress={postExample} >
                Click to make a Post request</Button>
        </View>
    )
  
}
  
export default PostRequestExample;
  