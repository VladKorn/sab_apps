import React from "react";
import {
	View,
	Text,
	Image,
	AppRegistry,
	SafeAreaView,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
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
export default class CategorySlider extends React.Component<any, State> {
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			currentProductId: parseInt(this.props.route.params.id),
			currentIndex: 0,
			isFavorite: false,
			catId: 0,
			slides: [],
			catName: "",
		};
		this.onChange = this.onChange.bind(this);
		this.onPositionChanged = this.onPositionChanged.bind(this);
		this.setFvorite = this.setFvorite.bind(this);
	}

	setFvorite = () => {
		this.setState({
			isFavorite: !this.state.isFavorite,
		});
	};
	onChange(number, type) {
		// console.log('number, type' ,number, type)
		this.props.screenProps.basketApi({
			action: "setProduct",
			params: {
				productId: this.state.currentProductId,
				count: number,
			},
		});
	}
	onPositionChanged(index) {
		// const id = this.props.screenProps.products[this.state.currentProductId].id;
		// console.log('onPositionChanged' , this.state.slides[index].id);
		this.setState({
			currentIndex: index,
			currentProductId: parseInt(this.state.slides[index].id),
		});
	}

	componentDidMount() {
		const catId = this.props.screenProps.products[
			this.state.currentProductId
		].categoryId;
		const productIndex = this.props.screenProps.catalog[
			catId
		].products.indexOf(this.state.currentProductId);
		// .indexOf(this.state.currentProductId)
		this.setState({ currentIndex: productIndex, catId: catId });
		const catName = this.props.screenProps.catalog[catId].name;
		const slides = [];

		// console.log("this.props.screenProps.products", catId);
		this.props.screenProps.catalog[catId].products.map((key) => {
			const item = this.props.screenProps.products[key];
			slides.push(item);
		});
		this.setState({ slides: slides, catName: catName });
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 500);
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View style={{ flex: 1, justifyContent: "center" }}>
					<Loading></Loading>
				</View>
			);
		}
		let searchWords = [];
		if (
			this.props.navigation.state &&
			this.props.route.params &&
			this.props.route.params.searchWords
		) {
			searchWords = this.props.route.params.searchWords;
		}
		// console.log('navigation' ,JSON.stringify( this.props.navigation  ))
		// console.log(this.props.screenProps.catalog.cats[this.props.screenProps.products[this.state.currentProduct].categoryId] )
		// console.log("render");
		// const isFavorite = this.state.isFavorite;
		const isFavorite = this.props.screenProps.favorite.includes(
			this.state.currentProductId
		);
		return (
			<SafeAreaView
				style={[
					appStyles.page,
					// this.state.isZoom ? { backgroundColor: "#F2F2F2" } : {}
				]}
			>
				<View style={styles.topBar}>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.goBack();
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
						{this.state.catName} {this.state.currentIndex + 1} /
						{this.state.slides.length}
					</Text>
					<TouchableOpacity
						onPress={() => {
							this.props.screenProps.addToFavorite(
								this.state.currentProductId
							);
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
					slides={this.state.slides}
					index={this.state.currentIndex}
					navigation={this.props.navigation}
					route={this.props.route}
					onIndexChanged={this.onPositionChanged}
					basketApi={this.props.screenProps.basketApi}
					basket={this.props.screenProps.basket}
					products={this.props.screenProps.products}
					searchWords={searchWords}
				/>
			</SafeAreaView>
		);
	}
}

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
AppRegistry.registerComponent("Subexpress", () => CategorySlider);
