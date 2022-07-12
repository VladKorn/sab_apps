import { useState, useEffect, useRef } from "react";
import Modal, {
	ModalContent,
	SlideAnimation,
	ScaleAnimation,
} from "react-native-modals";
import { View, Text, Animated, StyleSheet, Image } from "react-native";
import { BlurView } from "expo-blur";

interface Props {
	isOpen: boolean;
	isOpenHendler: (boolean) => void;
	height?: number;
}
interface State {
	visible: boolean;
	visibleBlur: boolean;
	intensity: any;
}
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export const Modals = (props) => {
	const [visible, setVisible] = useState(props.isOpen);
	const [visibleBlur, setVisibleBlur] = useState(props.isOpen);
	const intensity = useRef(new Animated.Value(0)).current;

	const _blur = () => {
		Animated.timing(intensity, {
			duration: 400,
			toValue: 100,
			useNativeDriver: false,
		}).start();
	};
	const _blurOff = () => {
		Animated.timing(intensity, {
			duration: 400,
			toValue: 0,
			useNativeDriver: false,
		}).start();
	};
	useEffect(() => {
		visibleBlur ? _blur() : null;
	}, []);
	useEffect(() => {
		if (props.isOpen) {
			setVisibleBlur(true);
		}
		// TODO ??
		props.isOpen ? _blur() : null;
	}, [props.isOpen]);
	return (
		<>
			{visibleBlur ? (
				<AnimatedBlurView
					key={"AnimatedBlurView"}
					style={StyleSheet.absoluteFill}
					tint="light"
					intensity={intensity}
					blurRadius={0}
				/>
			) : null}
			<View key={"modal"} style={{}}>
				<Modal
					overlayOpacity={0.1}
					// hasOverlay={false}
					width={300}
					height={props.height || 310}
					onDismiss={() => {
						setTimeout(() => {
							setVisibleBlur(false);
						}, 100);
					}}
					visible={props.isOpen}
					onTouchOutside={() => {
						_blurOff();
						props.isOpenHendler(false);
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
							slideFrom: "bottom",
						})
					}
					swipeDirection={["up", "down"]} // can be string or an array
					swipeThreshold={200} // default 100
					onSwipeOut={(event) => {
						props.isOpenHendler(false);
						setVisibleBlur(false);
					}}
				>
					<ModalContent>
						<View style={{ alignItems: "center" }}>
							<Image
								style={{
									width: 50,
									height: 50,
									marginBottom: 20,
									marginTop: 10,
								}}
								source={require("../img/ico-clock.png")}
							/>
							{props.children}
						</View>
					</ModalContent>
				</Modal>
			</View>
		</>
	);
};
export default Modals;
