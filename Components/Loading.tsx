import React from "react";

import * as Progress from 'react-native-progress';
import Colors from "../constants/Colors.js";

import {
	View,
	StyleSheet
} from "react-native";

export default class Loading extends React.Component<any, any> {
    constructor(props) {
        super(props);
    
      
      }
    
    render(){
        return(
            <View style={styles.container}>
              <Progress.CircleSnail
                style={styles.progress}
                size={50}
                color={[Colors.assent, Colors.assent3, Colors.assent4]}
              />
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   backgroundColor: '#fff',
      paddingVertical: 20,
    },
  
    circles: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    progress: {
      margin: 10,
    },
  });