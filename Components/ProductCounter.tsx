import React, { useState, useContext } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput
} from "react-native";
import Colors from "../constants/Colors.js";
import { BasketContext } from "./BasketContext";
import { tsBasketApi, tsBasket } from "../interfaces";

interface Props {
	id: number;
	mode?: string;
}
interface State {}

const ProductCounter: React.FC<Props> = props => {
	const ctx = useContext(BasketContext);
	const item = ctx.basket[props.id];
	const value = item ? item.count : 0;
	const basketApi = ctx.basketApi;
	const setCount = (count: number) => {
		const params: tsBasketApi = {
			action: "setProduct",
			params: {
				count: count,
				productId: props.id
			}
		};
		basketApi(params);
	};
	const onPressPlus = () => {
		setCount(value + 1);
	};
	const onPressMinus = () => {
		setCount(value - 1);
	};
	const renderMinusButton = () => {
		return (
			<TouchableOpacity
				style={[
					props.mode === "v"
						? Styles.touchable_v
						: Styles.touchable_minus
				]}
				onPress={onPressMinus}
			>
				<Text
					style={[
						Styles.iconText,
						{
							color: props.mode === "v" ? Colors.gray : "#DCDCDC"
						}
					]}
				>
					-
				</Text>
			</TouchableOpacity>
		);
	};
	const renderPlusButton = () => {
		return (
			<TouchableOpacity
				style={[
					props.mode === "v"
						? Styles.touchable_v
						: value > 0
						? Styles.touchable_active
						: Styles.touchable
				]}
				onPress={onPressPlus}
			>
				<Text
					style={[
						Styles.iconText,
						{
							color:
								props.mode === "v" || value === 0
									? Colors.gray
									: "#ffffff"
						}
					]}
				>
					+
				</Text>
			</TouchableOpacity>
		);
	};
	return (
		<View
			style={props.mode === "v" ? Styles.container_v : Styles.container}
		>
			<View>{value > 0 ? renderMinusButton() : null}</View>
			{value > 0 ? (
				<View style={Styles.number}>
					<TextInput
						style={props.mode === "v" ? Styles.text_v : Styles.text}
						keyboardType="numeric"
						onChangeText={number => {
							let value = parseInt(number) || 0;
							if (value > 999) {
								value = 999;
							}
							setCount(value)
							if (value !== 0) {
								// this.props.onChange(value, "+");
							}
						}}
						value={`${value}`}
					/>
				</View>
			) : null}
			<View>{renderPlusButton()}</View>
		</View>
	);
};

// export Asd;
export default ProductCounter;

const Styles = StyleSheet.create({
	container: {
		flexDirection: "row"
	},
	container_v: {
		flexDirection: "column",
		borderColor: Colors.gray,
		borderRadius: 50,
		borderWidth: 1,
		height: 78
	},

	text: {
		height: 30,
		width: 30,
		textAlign: "center",
		fontFamily: "Neuron-Heavy",
		fontSize: 18,
		color: "#666774"
	},
	text_v: {
		height: 25,
		width: 30,
		textAlign: "center",
		fontFamily: "Neuron-Heavy",
		fontSize: 18,
		color: "#666774"
	},

	iconText: {
		fontSize: 22,
		marginTop: -3
	},

	number: {
		minWidth: 40,
		alignItems: "center",
		justifyContent: "center"
	},
	touchable_minus: {
		width: 40,
		height: 40,
		borderRadius: 100,
		// borderWidth: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		borderWidth: 0,
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3
	},
	touchable: {
		width: 40,
		height: 40,
		borderRadius: 100,
		borderColor: "#DCDCDC",
		borderWidth: 2,
		alignItems: "center",
		justifyContent: "center"
	},

	touchable_v: {
		width: 40,
		height: 26,
		borderRadius: 100,
		alignItems: "center",
		justifyContent: "center"
	},
	touchable_active: {
		width: 40,
		height: 40,
		borderRadius: 100,
		backgroundColor: Colors.assent,
		alignItems: "center",
		justifyContent: "center"
	}
});
