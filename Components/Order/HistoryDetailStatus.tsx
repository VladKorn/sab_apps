import { View, Text } from "react-native";
import Colors from "../../constants/colors";
interface Props {
	canceled: any;
	status: any;
}

export const HistoryDetailStatus = (props: Props) => {
	return (
		<View
			style={{
				backgroundColor:
					props.canceled === "Y"
						? "#B8B8B8"
						: props.status === "N"
						? Colors.assent
						: props.status === "P"
						? Colors.assent3
						: props.status === "V"
						? Colors.assent4
						: Colors.assent3,
				height: 17,
				marginLeft: "auto",
				justifyContent: "center",
				alignItems: "center",
				paddingLeft: 5,
				paddingRight: 5,
				borderRadius: 5,
				marginTop: 15,
			}}
		>
			<Text
				style={{
					color: "white",
					fontFamily: "Neuron-Heavy",
					fontSize: 14,
					letterSpacing: 1,
				}}
			>
				{props.status === "N" && props.canceled === "N"
					? "ПРИНЯТ"
					: null}
				{props.status === "P" && props.canceled === "N"
					? "ГОТОВИМ"
					: null}
				{props.status === "V" && props.canceled === "N"
					? "ВЫПОЛНЕН"
					: null}
				{props.canceled === "Y" ? "ОТМЕНЕН" : null}
			</Text>
		</View>
	);
};
