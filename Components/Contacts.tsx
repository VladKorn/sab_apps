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
import Form from './Form';
import {phone , phoneFormated} from '../constants/data.js';
export default class Contacts extends React.Component<any> {
  
	static navigationOptions = {
		title: "Контакты"
	};
	render() {
		return (
			<ScrollView>
				<View
					style={{
						backgroundColor: Colors.lightgray,
						alignItems: "center",
						paddingTop: 30,
						paddingBottom: 30
					}}
				>
					<Image
						style={{ width: 144, height: 56.43 , marginBottom: 20 }}
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
                            fontFamily: "Neuron",
                            marginBottom: 10
						}}
					>
						Телефон для связи{phone}
					</Text>
					<TouchableOpacity
						onPress={() => {
							Linking.openURL(`tel:${phone}`);
						}}
					>
						<Text
							style={{
								textAlign: "center",
								fontSize: 28,
								color: Colors.text,
                                fontFamily: "Neuron-Bold",
                                marginBottom: 10,
							}}
						>
							{phoneFormated}
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
				<View style={{ paddingTop: 30 }}>
					<Text
						style={{
							textAlign: "center",
							color: "#B8B8B8",
							fontFamily: "Neuron"
						}}
					>
						Заполните форму обратной связи{"\n"}и мы свяжемся с вами
						в ближайшее время
					</Text>
                    
				</View>
                    <Form 
                        style={{paddingBottom: 50}}
                        title='Форма обратной связи'
                        fromPage='С страницы контакты'
                        sendMail={this.props.screenProps.sendMail}
                        navigation={this.props.navigation}
                    />
			</ScrollView>
		);
	}
}
