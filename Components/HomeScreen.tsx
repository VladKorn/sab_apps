import React from "react";
import {
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
    Dimensions,
} from "react-native";

import Colors from "../constants/Colors.js";
import Images from "../constants/Images";
import appStyles from "./appStyles";
import ImageSlider from "react-native-image-slider";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const totalProductsCount = (basket): number => {
	let totalProductsCount = 0;
	Object.keys(basket).map(key => {
		totalProductsCount = parseInt(basket[key].count) + totalProductsCount;
	});
	return totalProductsCount;
};
export default class HomeScreen extends React.Component<any> {
	static navigationOptions = {
		header: null,
		headerBackTitle: null
	};
	render() {
		// console.log('screenWidth' , screenWidth);
		// console.log('screenHeight' , screenHeight);

		const sliderImages = [];
		Object.keys(this.props.screenProps.stocks).map(item => {
			sliderImages.push(this.props.screenProps.stocks[item].img);
		});
		const products = this.props.screenProps.products
			? Object.keys(this.props.screenProps.products)
					.slice(0, 20)
					.map(key => {
						const item = this.props.screenProps.products[key];
						if (item.price)
							return (
								<TouchableOpacity
									key={item.name}
									onPress={() => {
										this.props.navigation.navigate(
											"CategorySlider",
											{ id: item.id }
										);
									}}
								>
									<View
										style={{
											width:
												screenHeight > 600 ? 130 : 70,
											marginRight: 5
										}}
									>
										<View
											style={{
												backgroundColor:
													Colors.lightgray,
												borderRadius: 10
											}}
										>
											<Image
												style={{
													width:
														screenHeight > 600
															? 130
															: 70,
													height:
														screenHeight > 600
															? 130
															: 70,
													borderRadius: 10,
													marginBottom: 5
												}}
												source={{
													uri:
														"https://subexpress.ru" +
														item.img
												}}
											/>
										</View>
										<Text
											numberOfLines={1}
											style={{
												fontFamily: "Neuron-Bold",
												fontSize: 14,
												color: Colors.text
											}}
										>
											{item.name}
										</Text>
										<Text
											style={{
												fontFamily: "Neuron-Heavy",
												fontSize: 18,
												color: Colors.assent
											}}
										>
											{item.price} руб.
										</Text>
									</View>
								</TouchableOpacity>
							);
					})
			: null;
		// console.log('');
		const catalog = this.props.screenProps.catalog
			? Object.keys(this.props.screenProps.catalog).map(id => {
					const item = this.props.screenProps.catalog[id];
					// console.log('item' ,item)
					return (
						<TouchableOpacity
							key={item.id}
							onPress={() => {
								this.props.navigation.navigate("Catalog", {
                                    catId: item.id
                                });
							}}
						>
							<View
								style={{
									...appStyles.borderRadius,
									width: 71,
									height: 73,
									marginRight: 5,
									marginBottom: 10,
									backgroundColor: "#F2F2F2",
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								{Images[item.id]}
							</View>
							<Text style={{ width: 70, textAlign: "center" }}>
								{item.name}
							</Text>
						</TouchableOpacity>
					);
			  })
			: null;
		return (
			<SafeAreaView style={appStyles.page}>
				<View
					style={{
						// flex: 1,
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						paddingTop: 30,
						paddingLeft: 40,
						paddingRight: 40,
						height: 70
					}}
				>
					<TouchableOpacity
						style={{ width: 40, height: 40 }}
						onPress={this.props.navigation.openDrawer}
					>
						<Image
							style={{ width: 22, height: 19 }}
							source={require("../img/ico-menu.png")}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={{ width: 40, height: 40 }}
						onPress={() => this.props.navigation.navigate("Stocks")}
					>
						<Image
							style={{ width: 24, height: 24 }}
							source={require("../img/ico-stock.png")}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={{ width: 40, height: 40 }}
						onPress={() => {
							this.props.navigation.navigate("Order");
						}}
					>
						<Image
							style={{ width: 30, height: 24 }}
							source={require("../img/ico-orders.png")}
						/>
						<View style={appStyles.bottonToOrderCount}>
							<Text style={appStyles.bottonToOrderCountText}>
								{/* {this.props.screenProps.basket
									? Object.entries(
											this.props.screenProps.basket
									  ).length
									: null} */}
									{totalProductsCount(this.props.screenProps.basket)}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View style={{ height: screenHeight > 600 ? 270 : 200 }}>
					<ImageSlider
						loopBothSides
						images={sliderImages}
						customSlide={({ index, item, style, width }) => (
							// It's important to put style here because it's got offset inside
							<View
								key={index}
								style={[style, styles.customSlide]}
							>
								<Image
									source={{ uri: item }}
									style={styles.customImage}
								/>
							</View>
						)}
						customButtons={(position, move) => <View></View>}
					/>
				</View>
				<View>
					<Text
						style={{
							...appStyles.sectTitle,
							paddingLeft: 15,
							marginTop: -20
						}}
					>
						Новинки
					</Text>
					<ScrollView style={{ paddingLeft: 15 }} horizontal={true}>
						{products}
					</ScrollView>
					<Text style={{ ...appStyles.sectTitle, paddingLeft: 15 }}>
						Меню
					</Text>
					<ScrollView style={{ paddingLeft: 15 }} horizontal={true}>
						{catalog}
					</ScrollView>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	customSlide: {
		backgroundColor: "white",
		alignItems: "flex-start",
		justifyContent: "center"
	},
	customImage: {
		width: "100%",
		height: 270
	}
});
