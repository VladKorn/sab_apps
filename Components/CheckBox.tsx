import React from "react";
import Colors from "../constants/Colors";
import appStyles from "./appStyles";
import { TouchableOpacity, Text, View, Image } from "react-native";
interface State {
    // text: string;
    ischecked: boolean;
}
export default class Input extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            ischecked: true
        };
    }
    render() {
        return (
            <TouchableOpacity 
                onPress={()=>{this.setState({ischecked: !this.state.ischecked})}}
                style={[{flexDirection: 'row' , alignItems: 'center'} , {...this.props.style}]}
                >
                <Image 
                style={{width: 27.67, height: 27.67}}
                source={ this.state.ischecked ? require("../img/ico-checkbox-active.png") : require("../img/ico-checkbox.png")} 
                />
                <View>{this.props.children}</View>
               
            </TouchableOpacity>
        )
    }
}