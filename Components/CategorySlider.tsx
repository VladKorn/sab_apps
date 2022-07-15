import { useState, useEffect, useContext, useMemo } from "react";
import {
	View,
	Text,
	Image,
	AppRegistry,
	SafeAreaView,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { BasketContext } from "./Basket/BasketContext";
import { AppContext } from "./App/Context";

import appStyles from "./appStyles";
import SwiperComponent from "./SwiperComponent";
import Loading from "./Loading";
import { Head } from "./Slider/Head";

interface Props {
	initialProductId: number;
	searchWords?: string[];
}
export const CategorySlider = (props: Props) => {
	const appContext = useContext(AppContext);

	console.log("initialProductId", props.initialProductId);

	const [isLoading, setIsLoading] = useState(false);

	const catId = appContext.products[props.initialProductId].categoryId;

	// const getProductByIndex = (id:number)=>{
	//     appContext.catalog[catId].products.indexOf(props.initialProductId)
	// }

	const [productIndex, setProductIndex] = useState(
		appContext.catalog[catId].products.indexOf(props.initialProductId)
	);
	console.log("CategorySlider productIndex", productIndex);

	const [currentProductId, setCurrentProductId] = useState(
		props.initialProductId
	);

	// const productIndex = appContext.catalog[catId].products.indexOf(
	// 	currentProductId
	// );

	useEffect(() => {
		const id = appContext.catalog[catId].products[productIndex];
		// console.log("useEffect productIndex", productIndex, id);
		setCurrentProductId(id);
	}, [productIndex]);

	// useEffect(() => {
	// 	setProductIndex(
	// 		appContext.catalog[catId].products.indexOf(currentProductId)
	// 	);
	// }, [currentProductId]);
	useEffect(() => {
		const index = appContext.catalog[catId].products.indexOf(
			props.initialProductId
		);
		console.log(
			"useEffect props.initialProductId",
			props.initialProductId,
			index
		);
		// setProductIndex(index);
		// setCurrentProductId(props.initialProductId);
	}, [props.initialProductId]);

	const onClose = () => {
		// setProductIndex(0);
	};
	// useEffect(() => {
	// 	const unsubscribe = navigation.addListener("focus", () => {
	// 		console.log("focus", initialProductId);
	// 		setCurrentProductId(initialProductId);
	// 	});
	// 	return unsubscribe;
	// }, [navigation, initialProductId, route.params.id]);
	// useEffect(() => {
	// 	console.log("currentProductId", currentProductId, currentIndex);
	// 	if (isLoading) {
	// 		setData();
	// 	}
	// }, [currentProductId]);
	// useEffect(() => {
	// 	console.log("useEffect initialProductId", initialProductId);
	// 	// setData();
	// }, [initialProductId]);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setIsLoading(false);
	// 	}, 500);
	// }, []);

	// console.log("currentProductId2", currentProductId, productIndex);
	const slides = appContext.catalog[catId].products.map((id) => {
		return appContext.products[id];
	});

	const onPositionChanged = (index) => {
		// const id = props.screenProps.products[currentProductId].id;
		// setProductIndex(index);
		console.log("====");
		console.log(
			"onPositionChanged",
			index,
			productIndex,
			slides[index]?.id
		);
		setProductIndex(index);
	};
	console.log(
		"slide",
		currentProductId,
		productIndex,
		slides[productIndex]?.name
	);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center" }}>
				<Loading></Loading>
			</View>
		);
	}

	// console.log('navigation' ,JSON.stringify( props.navigation  ))
	// console.log(props.screenProps.catalog.cats[props.screenProps.products[currentProduct].categoryId] )
	// const isFavorite = isFavorite;
	console.log("productIndex", productIndex, props.initialProductId);

	return (
		<SafeAreaView
			style={[appStyles.page, { paddingTop: 85, marginTop: 0 }]}
		>
			<Head
				catName={appContext.catalog[catId].name}
				productIndex={productIndex}
				currentProductId={currentProductId}
				slidesLength={slides.length}
				onClose={onClose}
			/>
			<SwiperComponent
				key={catId}
				slides={slides}
				index={productIndex}
				onIndexChanged={onPositionChanged}
				searchWords={props.searchWords}
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
const CategoryContainer = () => {
	const route = useRoute();
	const initialProductId = parseInt(route.params.id);

	let searchWords = [];
	if (route.params && route.params.searchWords) {
		searchWords = route.params.searchWords;
	}

	return (
		<CategorySlider
			initialProductId={initialProductId}
			searchWords={searchWords}
		/>
	);
};
export default CategoryContainer;
AppRegistry.registerComponent("Subexpress", () => CategorySlider);
