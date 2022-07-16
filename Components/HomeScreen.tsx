import { useContext } from "react";
import { AppContext } from "./App/Context";
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
import { useNavigation } from "@react-navigation/native";

import Colors from "../constants/colors";
import HomeCatalog from "./HomePage/Catalog";
import appStyles from "./appStyles";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const totalProductsCount = (basket): number => {
	if (!basket) return 0;
	let totalProductsCount = 0;
	Object.keys(basket).map((key) => {
		totalProductsCount = parseInt(basket[key].count) + totalProductsCount;
	});
	return totalProductsCount;
};
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomHeaderBackImage from "./customHeaderBackImage";
import { Categories } from "./Catalog/Categories";
import { CategoriesList } from "./Catalog/CategoriesList";
import HeaderRight from "./Catalog/HeaderRight";
import Catalog from "./Catalog";
import { OrderHistoryNav } from "./Order/History";
import { BasketContext } from "./Basket/BasketContext";

interface Props {}

const HomeScreen = (props: Props) => {
	const appContext = useContext(AppContext);
	const basketContext = useContext(BasketContext);
	const navigation = useNavigation();

	const sliderImages = [];
	Object.keys(appContext.stocks).map((item) => {
		sliderImages.push(appContext.stocks[item].img);
	});
	const products = appContext.products
		? Object.keys(appContext.products)
				.slice(0, 20)
				.map((key) => {
					const item = appContext.products[key];
					if (item.price)
						return (
							<TouchableOpacity
								key={item.name}
								onPress={() => {
									navigation.navigate("CategorySlider", {
										id: item.id,
									});
								}}
							>
								<View
									style={{
										width: screenHeight > 600 ? 130 : 70,
										marginRight: 5,
									}}
								>
									<View
										style={{
											backgroundColor: Colors.lightgray,
											borderRadius: 10,
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
												marginBottom: 5,
											}}
											source={{
												uri:
													"https://subexpress.ru" +
													item.img,
											}}
										/>
									</View>
									<Text
										numberOfLines={1}
										style={{
											fontFamily: "Neuron-Bold",
											fontSize: 14,
											color: Colors.text,
										}}
									>
										{item.id} {item.name}
									</Text>
									<Text
										style={{
											fontFamily: "Neuron-Heavy",
											fontSize: 18,
											color: Colors.assent,
										}}
									>
										{item.price} руб.
									</Text>
								</View>
							</TouchableOpacity>
						);
				})
		: null;
	// console.log("appContext.products", appContext.products);

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
					height: 70,
				}}
			>
				<TouchableOpacity
					style={{ width: 40, height: 40 }}
					onPress={navigation.openDrawer}
				>
					<Image
						style={{ width: 22, height: 19 }}
						source={require("../img/ico-menu.png")}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ width: 40, height: 40 }}
					onPress={() => navigation.navigate("Stocks")}
				>
					<Image
						style={{ width: 24, height: 24 }}
						source={require("../img/ico-stock.png")}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ width: 40, height: 40 }}
					onPress={() => {
						navigation.navigate("Order");
					}}
				>
					<Image
						style={{ width: 30, height: 24 }}
						source={require("../img/ico-orders.png")}
					/>
					<View style={appStyles.bottonToOrderCount}>
						<Text style={appStyles.bottonToOrderCountText}>
							{/* {appContext.basket
									? Object.entries(
											appContext.basket
									  ).length
									: null} */}
							{totalProductsCount(basketContext.basket)}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			{/* <View style={{ height: screenHeight > 600 ? 270 : 200 }}>
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
				</View> */}
			<View>
				<Text
					style={{
						...appStyles.sectTitle,
						paddingLeft: 15,
						// marginTop: -20,
					}}
				>
					Новинки
				</Text>
				<ScrollView
					style={{ marginRight: 15, marginLeft: 15 }}
					horizontal={true}
				>
					{products}
				</ScrollView>
				<Text style={{ ...appStyles.sectTitle, paddingLeft: 15 }}>
					Меню
				</Text>
				<ScrollView
					style={{ marginRight: 15, marginLeft: 15 }}
					horizontal={true}
				>
					<HomeCatalog />
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	customSlide: {
		backgroundColor: "white",
		alignItems: "flex-start",
		justifyContent: "center",
	},
	customImage: {
		width: "100%",
		height: 270,
	},
});

export const Stack = createNativeStackNavigator();
export const HomeNav = (_props) => {
	return (
		<Stack.Navigator
			screenOptions={
				{
					// headerBackTitle: null,
					// headerBackImageSource: "../img/back.png",
					// headerBackImage: customHeaderxBackImage,
					// headerStyle: appStyles.headerStyle,
					// headerTitleStyle: appStyles.headerTitle,
					// TODO
					// headerBackImage: () => <CustomHeaderBackImage />,
				}
			}
		>
			<Stack.Screen
				name="Menu"
				options={{
					headerShown: false,
					headerTitle: "Меню",
				}}
				component={HomeScreen}
			/>
			<Stack.Screen
				name="Cats"
				component={CategoriesList}
				options={{ headerTitle: "Категории" }}
			/>
			<Stack.Screen
				name="Catalog"
				component={Catalog}
				options={{
					headerTitle: "Меню",
					headerRight: () => {
						return <HeaderRight />;
					},
				}}
			></Stack.Screen>
			{OrderHistoryNav}
		</Stack.Navigator>
	);
};

export default HomeNav;
