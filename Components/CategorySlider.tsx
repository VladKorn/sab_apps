import { useState, useEffect, useContext } from "react";
import {
	View,
	Text,
	Image,
	AppRegistry,
	SafeAreaView,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { BasketContext } from "./Basket/BasketContext";
import appStyles from "./appStyles";
import SwiperComponent from "./SwiperComponent";
import Loading from "./Loading";

// interface Slides {
//     id: number;
// }
interface State {
	currentProductId: number;
	currentIndex: number;
	catId: number;
	isLoading: boolean;
	slides: Array<object>;
	catName: string;
	isFavorite: boolean;
}
export const CategorySlider = (props) => {
	const basketContext = useContext(BasketContext);
	const [isLoading, setIsLoading] = useState(true);
	const [currentProductId, setCurrentProductId] = useState(
		parseInt(props.route.params.id)
	);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFavorite, setIsFavorite] = useState(
		props.screenProps.favorite.includes(currentProductId)
	);
	const [catId, setCatId] = useState(0);
	const [slides, setSlides] = useState([]);
	const [catName, setCatName] = useState("");

	const setFvorite = () => {
		setIsFavorite(!isFavorite);
	};
	const onChange = (number, type) => {
		// console.log('number, type' ,number, type)
		basketContext.basketApi({
			action: "setProduct",
			params: {
				productId: currentProductId,
				count: number,
			},
		});
	};
	const onPositionChanged = (index) => {
		// const id = props.screenProps.products[currentProductId].id;
		// console.log('onPositionChanged' , slides[index].id);
		setCurrentIndex(index);
		setCurrentProductId(parseInt(slides[index].id));
	};
	useEffect(() => {
		const catId = props.screenProps.products[currentProductId].categoryId;
		const productIndex = props.screenProps.catalog[catId].products.indexOf(
			currentProductId
		);
		// .indexOf(currentProductId)
		setCurrentIndex(productIndex);
		setCatId(catId);
		const catName = props.screenProps.catalog[catId].name;
		const slides = [];

		// console.log("props.screenProps.products", catId);
		props.screenProps.catalog[catId].products.map((key) => {
			const item = props.screenProps.products[key];
			slides.push(item);
		});
		setSlides(slides);
		setCatName(catName);
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	}, []);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center" }}>
				<Loading></Loading>
			</View>
		);
	}
	let searchWords = [];
	if (
		props.navigation.state &&
		props.route.params &&
		props.route.params.searchWords
	) {
		searchWords = props.route.params.searchWords;
	}
	// console.log('navigation' ,JSON.stringify( props.navigation  ))
	// console.log(props.screenProps.catalog.cats[props.screenProps.products[currentProduct].categoryId] )
	// console.log("render");
	// const isFavorite = isFavorite;

	return (
		<SafeAreaView
			style={[
				appStyles.page,
				// isZoom ? { backgroundColor: "#F2F2F2" } : {}
			]}
		>
			<View style={styles.topBar}>
				<TouchableOpacity
					onPress={() => {
						props.navigation.goBack();
					}}
				>
					<Image
						source={require("../img/ico-close.png")}
						style={{
							width: 20.91,
							height: 18.98,
							marginRight: 30,
						}}
					/>
				</TouchableOpacity>
				<Text style={{ fontFamily: "Neuron", fontSize: 24 }}>
					{catName} {currentIndex + 1} /{slides.length}
				</Text>
				<TouchableOpacity
					onPress={() => {
						props.screenProps.addToFavorite(currentProductId);
					}}
					style={{
						alignItems: "center",
						justifyContent: "center",
						width: 30,
						height: 30,
						marginLeft: "auto",
					}}
				>
					<Image
						style={{ width: 20, height: 17.67 }}
						source={
							isFavorite
								? require("../img/favorite-active.png")
								: require("../img/favorite.png")
						}
					/>
				</TouchableOpacity>
			</View>
			<SwiperComponent
				slides={slides}
				index={currentIndex}
				navigation={props.navigation}
				route={props.route}
				onIndexChanged={onPositionChanged}
				basket={props.screenProps.basket}
				products={props.screenProps.products}
				searchWords={searchWords}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	topBar: {
		// flex: 1,
		// justifyContent: 'center',
		position: "absolute",
		width: "100%",
		zIndex: 3,
		top: 15,
		paddingLeft: 40,
		paddingRight: 40,
		paddingTop: 20,
		alignItems: "center",
		// justifyContent: 'center',
		height: 70,
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "#E2E2E2",
	},
	sliderWrap: {
		height: "100%",

		// flex: 1
	},
	box: {
		// flex: 1,
		width: "80%",
		backgroundColor: "white",
		borderRadius: 10,
		marginTop: -35,
		padding: 20,
		// marginLeft: 35,
		// marginRight: 35,
		alignSelf: "center",
	},
});
export default CategorySlider;
AppRegistry.registerComponent("Subexpress", () => CategorySlider);
