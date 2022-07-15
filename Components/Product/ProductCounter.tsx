import {
	useState,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useCallback,
} from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
} from "react-native";
import Colors from "../../constants/colors";
import { Styles } from "./ProductCounter.styles";
import { BasketContext } from "../Basket/BasketContext";
import { tsBasketApi, tsBasket } from "../../interfaces";
import { useRoute, useNavigation } from "@react-navigation/native";

interface Props1 {
	id: number;
	initialValue: number;
	mode?: "v";
	onChange: any;
}
interface State {}

function useTraceUpdate(props) {
	const prev = useRef(props);
	useEffect(() => {
		const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
			if (prev.current[k] !== v) {
				ps[k] = [prev.current[k], v];
			}
			return ps;
		}, {});
		if (Object.keys(changedProps).length > 0) {
			console.log("Changed props:", changedProps);
		}
		prev.current = props;
	});
}

const ProductCounter: React.FC<Props1> = (props) => {
	const navigation = useNavigation();

	const [value, setValue] = useState(props.initialValue);
	const setCount = (count: number) => {
		setValue(count);
	};
	const onPressPlus = () => {
		setValue((x) => x + 1);
	};
	const onPressMinus = () => {
		setValue((x) => x - 1);
	};
	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			if (props.initialValue !== value) {
				setValue(props.initialValue);
			}
		});
		return unsubscribe;
	}, [navigation, props.initialValue]);

	useEffect(() => {
		props.onChange(value);
	}, [value]);
	const MinusButton = () => {
		return useMemo(() => {
			return (
				<TouchableOpacity
					style={[
						props.mode === "v"
							? Styles.touchable_v
							: Styles.touchable_minus,
					]}
					onPress={onPressMinus}
				>
					<Text
						style={[
							Styles.iconText,
							{
								color:
									props.mode === "v"
										? Colors.gray
										: "#DCDCDC",
							},
						]}
					>
						-
					</Text>
				</TouchableOpacity>
			);
		}, []);
	};
	const PlusButton = () => {
		return useMemo(() => {
			return (
				<TouchableOpacity
					style={[
						props.mode === "v"
							? Styles.touchable_v
							: value > 0
							? Styles.touchable_active
							: Styles.touchable,
					]}
					onPress={onPressPlus}
				>
					<Text
						style={[
							Styles.iconText,
							{
								color:
									props.mode === "v" || value === 0
										? Colors.gray
										: "#ffffff",
							},
						]}
					>
						+
					</Text>
				</TouchableOpacity>
			);
		}, []);
	};

	return useMemo(() => {
		return (
			<View
				style={
					props.mode === "v" ? Styles.container_v : Styles.container
				}
			>
				{/* <Text>{renders.current++}</Text> */}

				<View>{value > 0 ? <MinusButton /> : null}</View>
				{value > 0 ? (
					<View style={Styles.number}>
						<TextInput
							selectTextOnFocus
							style={
								props.mode === "v" ? Styles.text_v : Styles.text
							}
							keyboardType="numeric"
							onChangeText={(number) => {
								let value = parseInt(number) || 0;
								if (value > 999) {
									value = 999;
								}
								setCount(value);
								if (value !== 0) {
									// this.props.onChange(value, "+");
								}
							}}
							value={`${value}`}
						/>
					</View>
				) : null}
				<View>
					<PlusButton />
				</View>
			</View>
		);
	}, [value]);
};
interface Props {
	id: number;
	mode?: "v";
}
const Container = (props: Props) => {
	const ctx = useContext(BasketContext);
	// const item = useRef(ctx.basket[props.id]).current;
	// const initialValue = useRef(item ? item.count : 0).current;
	const item = ctx.basket[props.id];
	const value = item ? item.count : 0;
	const onChange = useCallback((x: number) => {
		const params: tsBasketApi = {
			action: "setProduct",
			params: {
				count: x,
				productId: props.id,
			},
		};
		ctx.basketApi(params);
	}, []);
	// const onChange = (x: number) => {
	// 	const params: tsBasketApi = {
	// 		action: "setProduct",
	// 		params: {
	// 			count: x,
	// 			productId: props.id,
	// 		},
	// 	};
	// 	ctx.basketApi(params);
	// };
	// return useMemo(() => {
	return (
		<ProductCounter
			id={props.id}
			onChange={onChange}
			initialValue={value}
			mode={props.mode}
		/>
	);
	// }, [value]);
};

export default Container;
