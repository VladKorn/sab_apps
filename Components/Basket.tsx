import React from "react";
import { View, Image, Text, TouchableOpacity, Animated } from "react-native";
import Colors from "../constants/Colors";
interface Props {
	basket: object;
	products: object;
	navigation: any;
}
interface State {
	isVisible: boolean;
	totalProductsCount: number;
	translateY: any;
}
// const Dimensions = require("Dimensions");
// const { width, height } = Dimensions.get("window");
export default class Basket extends React.Component<Props, State> {
	timer: any;
	constructor(props) {
		super(props);
		this.state = {
			isVisible: false,
			totalProductsCount: 0,
			translateY: new Animated.Value(100)
		};
		this.timer = null;
	}
	componentDidMount() {
		let totalProductsCount = 0;
		Object.keys(this.props.basket).map(key => {
			totalProductsCount =
				parseInt(this.props.basket[key].count) + totalProductsCount;
		});
		this.setState({ totalProductsCount: totalProductsCount });
    }
	componentWillUpdate(nextProps, nextState) {
		// if (nextState.open == true && this.state.open == false) {
		//   this.props.onWillOpen();
		// }
	}
	componentDidUpdate(prevProps, prevState) {
		let totalProductsCount = 0;
		Object.keys(this.props.basket).map(key => {
			totalProductsCount =
				parseInt(this.props.basket[key].count) + totalProductsCount;
		});
		if (this.state.totalProductsCount !== totalProductsCount) {
			this.setState({
				totalProductsCount: totalProductsCount,
				isVisible: true
			});
			if (this.timer) {
				clearTimeout(this.timer);
			}
			this.timer = setTimeout(() => {
				this.setState({ isVisible: false });
			}, 3000);
		}

		if (prevState.isVisible !== this.state.isVisible) {
			this.state.isVisible ? this._show() : this._hide();
		}
	}
	_hide() {
		let { translateY } = this.state;
		Animated.timing(translateY, { duration: 300, toValue: 100 }).start();
	}
	_show() {
		let { translateY } = this.state;
		Animated.timing(translateY, { duration: 300, toValue: 0 }).start();
	}
	render() {
		if (Object.keys(this.props.products).length === 0) {
			return null;
		}

		let price = 0;
		Object.keys(this.props.basket).map(key => {
			price =
				parseInt(this.props.products[key].price) *
					this.props.basket[key].count +
				price;
		});

		return (
			<Animated.View
				style={[
					{
						position: "absolute",
						zIndex: 3,
						// top: height,
						left: 0,
						right: 0,
						bottom: 0,
						top: "auto"
					},
					{ transform: [{ translateY: this.state.translateY }] }
				]}
			>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate("Order");
					}}
					style={{
						backgroundColor: Colors.assent,
						height: 55,
						alignItems: "center",
						justifyContent: "flex-start",
						paddingLeft: 50,
						paddingRight: 50,
						flexDirection: "row"
					}}
				>
					<Image
						style={{
							width: 27,
							height: 21,
							// backgroundColor: 'red'

							marginBottom: 5
							// marginTop: 10
						}}
						source={require("../img/ico-basket2.png")}
					/>
					<Text
						style={{
							fontFamily: "Neuron-Heavy",
							fontSize: 26,
							color: "white",
							marginRight: "auto",
							marginLeft: 15,
							// backgroundColor: 'red',
							lineHeight: 26
						}}
					>
						{this.state.totalProductsCount} шт.
					</Text>
					<Text
						style={{
							color: "white",
							fontFamily: "Neuron",
							fontSize: 20
						}}
					>
						{" "}
						{price} руб.
					</Text>
				</TouchableOpacity>
			</Animated.View>
		);
	}
}
