import React from "react";
import {
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
	StyleSheet,
	Linking,
	ScrollView
} from "react-native";
import Colors from "../constants/Colors.js";
import appStyles from "./appStyles";
export default class Contacts extends React.Component<any> {
	static navigationOptions = {
		title: "Контакты"
	};
	render() {
		return (
			<View>
				<View
					style={{
						backgroundColor: Colors.lightgray,
                        alignItems: "center",
                        paddingTop: 30,
                         paddingBottom: 30
					}}
				>
					<Image
						style={{ width: 144, height: 56.43 }}
						source={require("../img/logo.png")}
					/>
					<Text
						style={{
							...appStyles.text,
							textAlign: "center",
							fontSize: 16
						}}
					>
						ООО “ САБ ЭКСПРЕСС”{"\n"}ИНН 5018185048, КПП 501801001
						{"\n"}М.О. Г. КОРОЛЕВ, УЛ. ПИОНЕРСКАЯ 1А
					</Text>
					<View style={appStyles.hr} />
					<Text
						style={{
							textAlign: "center",
							color: "#B8B8B8",
							fontFamily: "Neuron"
						}}
					>
						Телефон для связи
					</Text>
					<TouchableOpacity
						onPress={() => {
							Linking.openURL("tel:+84996775060");
						}}
					>
						<Text
							style={{
								textAlign: "center",
								fontSize: 28,
								color: Colors.text,
								fontFamily: "Neuron-Bold"
							}}
						>
							8 499 677 50 60
						</Text>
						<View style={appStyles.button}>
							<Text style={appStyles.buttonText}>
								Позвонить нам
							</Text>
						</View>
					</TouchableOpacity>
					<View style={appStyles.hr} />
                    <Text
						style={{
							textAlign: "center",
							color: "#B8B8B8",
							fontFamily: "Neuron"
						}}
					>
						E-mail
					</Text>
                    <TouchableOpacity
						onPress={() => {
							Linking.openURL("mailto:zakaz@subexpress.ru");
						}}
					>
						<Text
							style={{
								textAlign: "center",
								fontSize: 22,
								color: Colors.text,
								fontFamily: "Neuron-Bold"
							}}
						>
							ZAKAZ@SUBEXPRESS.RU
						</Text>
						
					</TouchableOpacity>
				</View>
                <View style={{paddingTop: 30, paddingBottom: 30}}>
                    <Text style={{
							textAlign: "center",
							color: "#B8B8B8",
							fontFamily: "Neuron"
						}}>Заполните форму обратной связи{"\n"}и мы свяжемся с вами в ближайшее время</Text>
                </View>
			</View>
		);
	}
}
