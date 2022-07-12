import { View, Text, Image } from "react-native";
import { styles } from "./historyStyles";
import Colors from "../../constants/colors";
interface Props {
	status: any;
}

export const HistoryDetailStepStatus = (props: Props) => {
	return (
		<>
			<Text
				style={{
					textAlign: "center",
					marginTop: 30,
					marginBottom: 15,
				}}
			>
				Предварительное время ожидания заказа
			</Text>
			<View
				style={{
					flexDirection: "row",
					maxWidth: 265,
					width: "100%",
					marginLeft: "auto",
					marginRight: "auto",
				}}
			>
				<View style={styles.step}>
					<View
						style={[
							styles.stepImgWrap,
							props.status === "N" ||
							props.status === "P" ||
							props.status === "V"
								? {
										backgroundColor:
											props.status === "P" ||
											props.status === "V"
												? Colors.assent
												: "white",
										borderColor: Colors.assent,
								  }
								: null,
						]}
					>
						<Image
							style={{ width: 20.82, height: 20.82 }}
							source={require("../../img/ico-steps2.png")}
						/>
					</View>
					<Text
						style={[
							styles.steptext,
							props.status === "N"
								? { fontFamily: "Neuron-Heavy" }
								: null,
						]}
					>
						Принят
					</Text>
				</View>
				<View
					style={[
						styles.stepLine,
						props.status === "P" || props.status === "V"
							? { backgroundColor: Colors.assent }
							: null,
					]}
				/>
				<View style={styles.step}>
					<View
						style={[
							styles.stepImgWrap,
							props.status === "P" || props.status === "V"
								? {
										backgroundColor:
											props.status === "V"
												? Colors.assent
												: "white",
										borderColor: Colors.assent,
								  }
								: null,
						]}
					>
						<Image
							style={{ width: 20.82, height: 20.82 }}
							source={require("../../img/ico-steps2.png")}
						/>
					</View>
					<Text
						style={[
							styles.steptext,
							props.status === "P"
								? { fontFamily: "Neuron-Heavy" }
								: null,
						]}
					>
						Готовим
					</Text>
				</View>
				<View
					style={[
						styles.stepLine,
						props.status === "V"
							? { backgroundColor: Colors.assent }
							: null,
					]}
				/>
				<View style={styles.step}>
					<View
						style={[
							styles.stepImgWrap,
							props.status === "V"
								? {
										backgroundColor: Colors.assent,
										borderColor: Colors.assent,
								  }
								: null,
						]}
					>
						<Image
							style={{ width: 20.82, height: 20.82 }}
							source={require("../../img/ico-steps3.png")}
						/>
					</View>
					<Text style={styles.steptext}>В пути</Text>
				</View>
				<View
					style={[
						styles.stepLine,
						props.status === "V"
							? { backgroundColor: Colors.assent }
							: null,
					]}
				/>
				<View style={styles.step}>
					<View
						style={[
							styles.stepImgWrap,
							props.status === "V"
								? {
										borderColor: Colors.assent,
								  }
								: null,
						]}
					>
						<Image
							style={{ width: 20.82, height: 20.82 }}
							source={require("../../img/ico-steps4.png")}
						/>
					</View>

					<Text
						style={[
							styles.steptext,
							props.status === "V"
								? { fontFamily: "Neuron-Heavy" }
								: null,
						]}
					>
						Доставлен
					</Text>
				</View>
			</View>
		</>
	);
};
