import React from "react";
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Image
} from "react-native";
import Colors from "../constants/Colors.js";
import appStyles from "./appStyles";


interface State {
    data: object;
    isLoading: boolean;
}
export default class Sidebar extends React.Component<any, State> {
    render() {

        // console.log(JSON.stringify(this.props.navigation ) );

        const routes = Object.keys( this.props.navigation.router.childRouters.Home.childRouters ).slice(2 , 10);
        const menu = routes.map(route => {
            return (
                <View key={route} style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                }}>
                    <TouchableOpacity
                    onPress={()=>{this.props.navigation.navigate(route)}}>
                        <Text style={{ fontFamily: "Neuron-Bold" , fontSize: 18 , color: Colors.gray }}>{route}</Text>
                    </TouchableOpacity>
                </View>
            );
        });

        return (
            <SafeAreaView >
                <View style={{
                    paddingLeft: 30,
                    paddingRight: 30,

                }}>
                <Image
                    style={{width: 176.77 , height: 69.27}}
                    source={require('../img/logo.png')}
                />

                {menu}
                </View>
            </SafeAreaView>
        );
    }
}
