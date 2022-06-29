import { useState } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import CategorySliderItem from "./CategorySliderItem";
import Basket from "./Basket";

import Swiper from "react-native-swiper";

const styles = StyleSheet.create({
	wrapper: {
		//   height: 400,
		//   backgroundColor: 'gray'
	},
});

const SwiperComponent = (props: any) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isZoom, setIsZoom] = useState(false);

	const zoom = (zoom: boolean) => {
		setIsZoom(zoom);
	};
	const onPositionChanged = (index: any) => {
		// console.log('onPositionChanged' , index);
		// this.setState({ currentIndex: index });
	};
	const slides = props.slides.map((item: any, index: any) => (
		<CategorySliderItem
			key={index}
			item={item}
			zoom={zoom}
			isZoom={isZoom}
			searchWords={props.searchWords}
		/>
	));

	return (
		<View style={{ flex: 1 }}>
			<Swiper
				style={styles.wrapper}
				showsButtons={false}
				loop={false}
				index={props.index}
				onIndexChanged={props.onIndexChanged}
				showsPagination={false}
			>
				{slides}
			</Swiper>
			<Basket />
		</View>
	);
};
export default SwiperComponent;
AppRegistry.registerComponent("Subexpress", () => SwiperComponent);
