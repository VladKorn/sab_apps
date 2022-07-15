import { useEffect, useState, useRef } from "react";
import {
	View,
	Text,
	AppRegistry,
	TouchableWithoutFeedback,
	Dimensions,
	Animated,
	Platform,
	StyleSheet,
} from "react-native";
// import Counter from "./Counter";
import ProductCounter from "./Product/ProductCounter";
import Colors from "../constants/colors";
import appStyles from "./appStyles";
import { useRoute } from "@react-navigation/native";
// import SwiperComponent from "./SwiperComponent";
import Highlighter from "react-native-highlight-words";

const { width, height } = Dimensions.get("window");
const ANIMTIME = 200;

const IMGMIN = 333;
const IMGMAX = 500;
export const CategorySliderItem = (props) => {
	// console.log("CategorySliderItem props", props);
	const route = useRoute();
	const [currentProduct, setCurrentProduct] = useState(
		parseInt(route.params.id)
	);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isZoom, setIsZoom] = useState(props.isZoom);
	const [size, setSize] = useState({ width, height });
	const [catId, setCatId] = useState(0);
	const [slides, setSlides] = useState([]);
	const [catName, setCatName] = useState("");
	const [isAnimationEnded, setIsAnimationEnded] = useState(true);
	const [isContentHidden, setIsContentHidden] = useState(false);
	const aminImg = useRef(new Animated.Value(200)).current;
	const opacityAnim = useRef(new Animated.Value(1)).current;
	const animTranslateY = useRef(new Animated.Value(200)).current;

	const zoomToggle = () => {
		setIsZoom(!isZoom);
		setIsContentHidden(false);
		setIsAnimationEnded(false);
		if (props.isZoom) {
			// props.zoom(false);

			Animated.timing(aminImg, {
				toValue: IMGMIN,
				duration: ANIMTIME,
				useNativeDriver: false,
			}).start();
			Animated.timing(opacityAnim, {
				useNativeDriver: false,
				toValue: 1,
				duration: ANIMTIME,
			}).start();
			Animated.timing(animTranslateY, {
				useNativeDriver: false,
				toValue: 200,
				duration: ANIMTIME,
			}).start(() => {
				setIsAnimationEnded(true);
				props.zoom(false);
			});
		} else {
			// props.zoom(true);

			Animated.timing(aminImg, {
				useNativeDriver: false,
				toValue: IMGMAX,
				duration: ANIMTIME,
			}).start();
			Animated.timing(opacityAnim, {
				useNativeDriver: false,
				toValue: 0,
				duration: ANIMTIME,
			}).start();
			Animated.timing(animTranslateY, {
				useNativeDriver: false,
				toValue: 0,
				duration: ANIMTIME,
			}).start(() => {
				setIsContentHidden(true);
				setIsAnimationEnded(true);
				props.zoom(true);
			});
		}
	};

	const onPositionChanged = (index) => {
		// console.log('onPositionChanged' , index);
		setCurrentIndex(index);
	};
	return (
		<View style={[size, isZoom ? { backgroundColor: "#F2F2F2" } : {}]}>
			<TouchableWithoutFeedback onPress={zoomToggle}>
				<Animated.Image
					source={{
						uri: "https://subexpress.ru" + props.item.img,
						cache: "force-cache",
					}}
					style={[
						styles.customImage,
						{
							height: isAnimationEnded
								? props.isZoom
									? IMGMAX
									: IMGMIN
								: aminImg,
						},
					]}
				/>
			</TouchableWithoutFeedback>

			<Animated.View
				style={[
					{ flex: 1, width: "100%" },
					{
						opacity: isAnimationEnded
							? props.isZoom
								? 0
								: 1
							: opacityAnim,
					},
				]}
			>
				<View
					style={[
						Platform.OS === "ios"
							? appStyles.shadow
							: isAnimationEnded
							? appStyles.shadow
							: {},
						styles.box,
					]}
				>
					<Text
						style={{
							fontFamily: "Neuron-Heavy",
							fontSize: 26,
							color: Colors.gray,
						}}
					>
						<Highlighter
							highlightStyle={{
								backgroundColor: "#DDDDDD",
								color: "black",
							}}
							searchWords={props.searchWords || []}
							textToHighlight={props.item.name
								.replace("&quot;", '"')
								.replace("&quot;", '"')}
						/>
					</Text>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							paddingTop: 7,
						}}
					>
						<Text
							style={{
								fontFamily: "Neuron-Heavy",
								fontSize: 28,
								color: Colors.assent,
							}}
						>
							{props.item.price} руб.
						</Text>
						{/* <Counter
                                    onChange={this.onChange}
                                    InitialValue={count}
                                /> */}
						<ProductCounter id={props.item.id} />
					</View>
				</View>
				<View
					style={{
						width: "70%",
						alignSelf: "center",
						marginTop: 20,
					}}
				>
					<Text>
						Состав:{" "}
						<Highlighter
							highlightStyle={{
								backgroundColor: "#DDDDDD",
								color: "black",
							}}
							searchWords={props.searchWords || []}
							textToHighlight={props.item.text
								.replace("&quot;", '"')
								.replace("&quot;", '"')
								.replace("<br />", "")}
						/>
					</Text>
					<Text>Вес НЕТТО: {props.item.weight} (+/- 5 гр.)</Text>
				</View>
			</Animated.View>

			<View
				style={{
					height: 150,
					justifyContent: "flex-start",
					alignItems: "center",
					width: "100%",
				}}
			>
				<Animated.View
					style={{
						// position: 'fixed',
						bottom: 50,
						transform: [
							{
								translateY: isAnimationEnded
									? props.isZoom
										? 0
										: 200
									: animTranslateY,
							},
						],
					}}
				>
					{/* <Counter onChange={this.onChange} InitialValue={count}  /> */}
					<ProductCounter id={props.item.id} />
				</Animated.View>
			</View>
		</View>
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
		minHeight: IMGMIN,
	},
	topBar: {
		// flex: 1,
		// justifyContent: 'center',
		position: "absolute",
		width: "100%",
		zIndex: 3,
		top: 25,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 20,
		alignItems: "center",
		// justifyContent: 'center',
		height: 72,
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
export default CategorySliderItem;
// AppRegistry.registerComponent("Subexpress", () => CategorySliderItem);
