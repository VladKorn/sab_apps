import { View, Text } from "react-native";
import Colors from "./../../constants/colors";

interface Props {
	products: any[];
	price: number;
}

export const HistoryDetailProductsList = (props: Props) => {
	return (
		<View>
			{props.products
				? props.products.map((item) => {
						return (
							<View
								key={item.id}
								style={{
									flexDirection: "row",
									height: 50,
									alignItems: "center",
									borderBottomColor: "#E2E2E2",
									borderBottomWidth: 1,
								}}
							>
								<View
									style={{
										width: 65,
										alignItems: "center",
									}}
								>
									<Text
										style={{
											fontFamily: "Neuron",
											color: Colors.lightText,
										}}
									>
										X{item.count}
									</Text>
								</View>
								<View style={{ width: 240 }}>
									<Text
										style={{
											fontFamily: "Neuron",
											color: Colors.lightText,
											// borderColor: "red",
											// borderWidth: 1,
											width: "auto",
										}}
									>
										{item.name}
									</Text>
								</View>
								<Text
									style={{
										fontFamily: "Neuron",
										color: Colors.text,
										marginLeft: "auto",
									}}
								>
									{item.price * item.count} руб.
								</Text>
							</View>
						);
				  })
				: null}
			<View style={{ marginLeft: 65, paddingTop: 20 }}>
				<View
					style={{
						justifyContent: "space-between",
						flexDirection: "row",
					}}
				>
					<Text
						style={{
							fontFamily: "Neuron-Heavy",
							color: Colors.text,
							paddingBottom: 25,
						}}
					>
						{" "}
						Общая сумма:
					</Text>
					<Text
						style={{
							fontFamily: "Neuron-Heavy",
							color: Colors.text,
						}}
					>
						{" "}
						{props.price} руб.
					</Text>
				</View>
			</View>
		</View>
	);
};
