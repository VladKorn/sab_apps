import React from "react";
import {
	View,
	Text,
	Button,
	Image,
	AppRegistry,
	TouchableOpacity,
	TouchableHighlight,
	StyleSheet
} from "react-native";
// import Counter from "./Counter";
import ProductCounter from "./ProductCounter";
import Colors from "../constants/Colors.js";
import Highlighter from "react-native-highlight-words";


interface State {
	count: number;
	isFavorite: boolean;
}

export default class ProductItem extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			count: this.getCount(),
			isFavorite: this.props.isFavorite
		};
		this.onChange = this.onChange.bind(this);
		this.addToFavorite = this.addToFavorite.bind(this);
		this.getCount = this.getCount.bind(this);
	}
	getCount() {
		const item = this.props.basket[this.props.id];
		if (item) {
			return parseInt(item.count);
		}
		return 0;
	}
	addToFavorite = () => {
		this.setState({ isFavorite: !this.state.isFavorite });
		this.props.addToFavorite(parseInt(this.props.id));
	};
	onChange(number, type) {
		// console.log('number, type' ,number, type)
		this.props.basketApi({
			action: "setProduct",
			params: {
				productId: this.props.id,
				count: number
			}
		});
	}

	render() {
		return (
			<View style={styles.box}>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate("CategorySlider", {
							id: this.props.id,
							searchWords: this.props.searchWords
						});
					}}
				>
					<View style={styles.imgWrap}>
						<Image
							style={styles.img}
							source={{
								uri: "https://subexpress.ru/" + this.props.img,
								cache: "force-cache"
							}}
						/>
					</View>
				</TouchableOpacity>
				<View
					style={{
						flex: 1,
						alignItems: "flex-start",
						justifyContent: "flex-start"
						// flexDirection: "row"
					}}
				>
					<View
						style={{
							flex: 1,
							width: "100%",
							alignItems: "flex-start",
							justifyContent: "flex-start",
							flexDirection: "row"
							// backgroundColor: "blue"
						}}
					>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate(
									"CategorySlider",
									{
										id: this.props.id,
										searchWords: this.props.searchWords
									}
								);
							}}
						>
							<Text
								style={{
									fontSize: 16,
									fontFamily: "Neuron-Bold",
									color: "#666774",
									maxWidth: 150
								}}
							>
								<Highlighter
									highlightStyle={{
										backgroundColor: "#DDDDDD",
										color: "black"
									}}
									searchWords={this.props.searchWords || []}
									textToHighlight={this.props.name
										.replace("&quot;", '"')
										.replace("&quot;", '"')}
								/>
							</Text>
						</TouchableOpacity>
						<TouchableHighlight
							onPress={this.addToFavorite}
							underlayColor="white"
							style={{
								alignSelf: "flex-start",
								alignItems: "center",
								justifyContent: "center",
								width: 30,
								height: 30,
								marginLeft: "auto"
							}}
						>
							<Image
								style={{ width: 20, height: 17.67 }}
								source={
									this.state.isFavorite
										? require("../img/favorite-active.png")
										: require("../img/favorite.png")
								}
							/>
						</TouchableHighlight>
					</View>
					<View
						style={{
							flex: 1,
							flexGrow: 1,
							// backgroundColor: "red",
							alignItems: "flex-end",
							justifyContent: "flex-end",
							flexDirection: "row"
						}}
					>
						<Text
							style={{
								color: Colors.assent,
								fontFamily: "Neuron-Bold",
								fontSize: 18,
								flexGrow: 1
							}}
						>
							{this.props.price} руб.
						</Text>
						<View style={{ marginTop: -10 }}>
							<ProductCounter id={this.props.id} />
							{/* <Counter
								onChange={this.onChange}
								InitialValue={this.state.count}
							/> */}
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	box: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "flex-start",
		flexDirection: "row",
		backgroundColor: "#ffffff",
		// marginLeft: 55,
		paddingBottom: 15,
		paddingTop: 15,
		marginRight: 15,
		paddingRight: 10,
		marginLeft: 15,

		// width: '100%',

		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
		marginTop: 5
	},
	img: {
		width: 100,
		borderRadius: 10,
		height: 100
	},
	imgWrap: {
		backgroundColor: Colors.lightgray,
		width: 100,
		borderRadius: 10,
		height: 100,
		// marginLeft: -40,
		marginLeft: 5,
		marginTop: -10,
		marginBottom: -10,
		marginRight: 15
	},
	countContainer: {
		alignItems: "center",
		padding: 10
		// marginRight: 10
	},
	countText: {
		color: "#FF00FF"
	}
});

AppRegistry.registerComponent("subexpress", () => ProductItem);
