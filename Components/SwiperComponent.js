import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import CategorySliderItem from "./CategorySliderItem";
import Basket from "./Basket";

import Swiper from "react-native-swiper";

const styles = StyleSheet.create({
	wrapper: {
		//   height: 400,
		//   backgroundColor: 'gray'
	}
});

export default class SwiperComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentIndex: 0,
			isZoom: false
		};
		this.onPositionChanged = this.onPositionChanged.bind(this);
		this.zoom = this.zoom.bind(this);
		this._renderSlides = this._renderSlides.bind(this);
	}
	zoom(isZoom) {
		this.setState({ isZoom: isZoom });
	}
	onPositionChanged(index) {
		// console.log('onPositionChanged' , index);
		// this.setState({ currentIndex: index });
	}
	_renderSlides() {
		// console.log("_renderSlides");
		return this.props.slides.map((item, index) => {
            // const isCurrentSlide = this.state.currentIndex === index;
            // return (<Text>Text  Text</Text>)
			return (
				<CategorySliderItem
					key={index}
					item={item}
					zoom={this.zoom}
					isZoom={this.state.isZoom}
					basketApi={this.props.basketApi}
					navigation={this.props.navigation}
					searchWords={this.props.searchWords}
				/>
			);
		});
	}
	render() {
		return (
			<View style={{ flex: 1 }}>
				<Swiper
					style={styles.wrapper}
					showsButtons={false}
					loop={false}
					index={this.props.index}
					onIndexChanged={this.props.onIndexChanged}
					showsPagination={false}
				>
					{this._renderSlides()}
				</Swiper>
				{!this.state.isZoom ? (
					<Basket
						basket={this.props.basket}
						products={this.props.products}
						navigation={this.props.navigation}
					/>
				) : null}
			</View>
		);
	}
}

AppRegistry.registerComponent("subexpress", () => SwiperComponent);
