import React from 'react';
import {Text , SafeAreaView , TouchableOpacity} from "react-native";
function Header(props) {
    const greeting = 'Hello Function Component!';
    return (
        <SafeAreaView>
    <TouchableOpacity onPress={()=>{
        
    }}>
        <Text>Back</Text>
    </TouchableOpacity>
            <Text>{props.title}</Text>
        </SafeAreaView>
        );
  }
  export default Header;