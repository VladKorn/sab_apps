import { useState } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import CategorySliderItem from "./CategorySliderItem";
import Basket from "./Basket/Basket";

import Swiper from "react-native-swiper";

const styles = StyleSheet.create({
	wrapper: {
		//   height: 400,
		//   backgroundColor: 'gray'
	},
});
interface Props {
	slides: any[];
	searchWords: string[];
	onIndexChanged: any;
	index: number;
}

const SwiperComponent = (props: Props) => {
	const [isZoom, setIsZoom] = useState(false);

	const zoom = (zoom: boolean) => {
		setIsZoom(zoom);
	};
	const onPositionChanged = (index: any) => {
		// console.log('onPositionChanged' , index);
		// this.setState({ currentIndex: index });
	};
	// Swiper.sc
	const slides = props.slides.map((item: any, index: any) => (
		<CategorySliderItem
			key={index}
			item={item}
			zoom={zoom}
			isZoom={isZoom}
			searchWords={props.searchWords}
		/>
	));
	// console.log(
	// 	"SwiperComponent props.slides",
	// 	props.index,
	// 	props.slides[props.index].name
	// );

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
