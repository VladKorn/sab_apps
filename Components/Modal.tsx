import React from "react";
import Modal, {
	ModalContent,
	SlideAnimation,
	ScaleAnimation
} from "react-native-modals";
import { View, Text, Animated, StyleSheet, Image } from "react-native";
import { BlurView } from "expo-blur";

interface State {
	visible: boolean;
	visibleBlur: boolean;
	intensity: any;
}
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default class Modalt extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			visible: this.props.isOpen,
			intensity: new Animated.Value(0),
			visibleBlur: this.props.isOpen
		};
	}
	_blur = () => {
		let { intensity } = this.state;
		Animated.timing(intensity, { duration: 400, toValue: 100 }).start();
	};
	_blurOff = () => {
		let { intensity } = this.state;
		Animated.timing(intensity, { duration: 400, toValue: 0 }).start();
	};
	componentDidMount() {
		this.state.visibleBlur ? this._blur() : null;
	}
	componentWillUpdate(nextProps, nextState) {
		if (this.props.isOpen !== nextProps.isOpen) {
			if (nextProps.isOpen) {
				this.setState({ visibleBlur: true });
			}
		}
		nextProps.isOpen ? this._blur() : null;
	}
	render() {
		return [
			this.state.visibleBlur ? (
				<AnimatedBlurView
					key={"AnimatedBlurView"}
					style={StyleSheet.absoluteFill}
					tint="light"
					intensity={this.state.intensity}
					blurRadius={0}
				/>
			) : null,
			<View key={"modal"} style={{}}>
				<Modal
					overlayOpacity={0.1}
                    // hasOverlay={false}
                    width={300}
                    height={this.props.height || 310}
					onDismiss={() => {
						setTimeout(() => {
							this.setState({ visibleBlur: false });
						}, 300);
					}}
					visible={this.props.isOpen}
					onTouchOutside={() => {
						this._blurOff();
						this.props.isOpenHendler(false);
						// this.setState({ visible: false })
					}}
					// modalAnimation={
					// 	new ScaleAnimation({
					//         initialValue: 0, // optional
					//         useNativeDriver: true, // optional
					// 	})
					// }
					modalAnimation={
						new SlideAnimation({
							slideFrom: "bottom"
						})
					}
					swipeDirection={["up", "down"]} // can be string or an array
					swipeThreshold={200} // default 100
					onSwipeOut={event => {
						this.props.isOpenHendler(false);
						this.setState({ visibleBlur: false });
					}}
				>
					<ModalContent>
                        <View style={{alignItems: 'center'}}>
						<Image
							style={{ width: 50, height: 50 ,marginBottom: 20, marginTop: 10}}
							source={require("../img/ico-clock.png")}
						/>
                        {this.props.children}
                        </View>
					</ModalContent>
				</Modal>
			</View>
		];
	}
}
