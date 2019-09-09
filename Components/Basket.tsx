import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
const Basket = props => {
    let price = 0
    Object.keys(props.basket).map(key=>{
        price = parseInt( props.products[key].price ) * props.basket[key].count+ price;
    });
	return (
		<TouchableOpacity
        onPress={()=>{
            props.navigation.navigate('Order')
        }}
			style={{
				backgroundColor: Colors.assent,
				height: 55,
                alignItems: "center",
                justifyContent: 'space-between',
                paddingLeft: 50,
                paddingRight: 50,
                flexDirection: 'row'
			}}
		>
			<Text
				style={{
					fontFamily: "Neuron-Heavy",
					fontSize: 26,
					color: "white"
				}}
			>
				{Object.keys(props.basket).length} шт.
			</Text>
            <Text style={{color: 'white' , fontFamily: 'Neuron' , fontSize: 20}}> {price} руб.</Text>
		</TouchableOpacity>
	);
};
export default Basket;
