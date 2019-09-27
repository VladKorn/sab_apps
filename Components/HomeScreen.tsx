import React from "react";
import {
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
	StyleSheet,
	ScrollView
} from "react-native";

import Colors from "../constants/Colors.js";
import Images from "../constants/Images";
import appStyles from "./appStyles";
import ImageSlider from "react-native-image-slider";


export default class HomeScreen extends React.Component<any> {
	static navigationOptions = {
        header: null,
        headerBackTitle: null,
	};
	render() {
		const sliderImages = [];
		Object.keys(this.props.screenProps.stocks).map(item => {
			sliderImages.push(this.props.screenProps.stocks[item].img);
		});
		const products = this.props.screenProps.products
			? Object.keys(this.props.screenProps.products).slice(0 , 20)
					.map(key => {
						const item = this.props.screenProps.products[key];
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
								<View style={{ width: 130, marginRight: 5 }}>
                                <View style={{backgroundColor: Colors.lightgray,borderRadius: 10,}}>
                                        <Image
                                            style={{
                                                width: 130,
                                                height: 130,
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
						paddingLeft: 30,
						paddingRight: 30,
						height: 70
					}}
				>
					<TouchableOpacity
						onPress={this.props.navigation.openDrawer}
					>
						<Image
							style={{ width: 22, height: 19 }}
							source={require("../img/ico-menu.png")}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate("Stocks")}
					>
						<Image
							style={{ width: 24, height: 24 }}
							source={require("../img/ico-stock.png")}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate("Order");
						}}
					>
						<Image
							style={{ width: 30, height: 24 }}
							source={require("../img/ico-orders.png")}
						/>
						<View
							style={{
								backgroundColor: Colors.assent,
								borderRadius: 50,
								// justifyContent: "center",
								alignItems: "center",
								width: 23,
								height: 23,
								position: "absolute",
								top: -11,
								right: -11
							}}
						>
							<Text
								style={{
									color: "white",
									fontSize: 20,
									fontFamily: "Neuron-Heavy",
									lineHeight: 24
								}}
							>
								{
									this.props.screenProps.basket? Object.entries(
										this.props.screenProps.basket
									).length : null
								}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View style={{ height: 270  }}>
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
				<View >
					<Text style={{...appStyles.sectTitle , paddingLeft: 15 , marginTop: -20}}>Новинки</Text>
					<ScrollView style={{paddingLeft: 15}} horizontal={true}>{products}</ScrollView>
					<Text style={{...appStyles.sectTitle , paddingLeft: 15}}>Меню</Text>
					<ScrollView style={{paddingLeft: 15}}  horizontal={true}>{catalog}</ScrollView>
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
