import React, { Component } from 'react';
import { Button, ToastAndroid, Text } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

class SignupScreen extends Component{


  constructor(props){
    super(props);


    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    }
  }


  signup = () => {
    //Validation Here


    return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then((response) => {
      if(response.status === 201){
          console.log("User Created with ID: ", response);
        return response.json()
      }else if(response.status === 400){
        throw 'Failed validation';
      }else{
        throw 'Something went wrong';
      }
    })
    .then(async (responseJson) => {
      console.log("User Created with ID: ", responseJson);
      this.props.navigation.navigate("LoginScreen");
      ToastAndroid.show(error, ToastAndroid.SHORT);
    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show("error",ToastAndroid.SHORT);
    })
  }




  render(){
    return (
      <ScrollView>
      <Text>Welcome! In order to make an account with us, we require you to enter the follwoing information.</Text>
        <TextInput
          placeholder="Please Enter Your First Name.."
          onChangeText={(first_name) => this.setState({first_name})}
          value={this.state.first_name}
          style={{padding:10, borderWidth:8, margin:5}}
        />




        <TextInput
          placeholder="Please Enter Your Last Name.."
          onChangeText={(last_name) => this.setState({last_name})}
          value={this.state.last_name}
          style={{padding:10, borderWidth:8, margin:5}}
        />




        <TextInput
          placeholder="Please Enter Your Email.."
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          style={{padding:10, borderWidth:8, margin:5}}
        />




        <TextInput
          placeholder="Please Enter Your Password.."
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          secureTextEntry
          style={{padding:10, borderWidth:8, margin:5}}
        />




        <Button
          title="Create Account!"
          onPress={() => this.signup()}
        />
      </ScrollView>
    )
  }
}

export default SignupScreen;
