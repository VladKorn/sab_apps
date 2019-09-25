import React from "react";
import {
	View,
	Text,
	TouchableHighlight,
	Image,
	TouchableOpacity,
	StyleSheet,
	Linking,
	ScrollView
} from "react-native";
import Colors from "../constants/Colors.js";
import appStyles from "./appStyles";
import Form from './Form'
import {phone , phoneFormated} from '../constants/data.js';

export default class Addresses extends React.Component<any> {
  
	static navigationOptions = {
		title: "Адреса доставок"
	};
	render() {
        const addresses = this.props.screenProps.user.addresses || [];
		const addressesItems = addresses.map(item => {
			const isCurrent = false;
			return (
				<TouchableHighlight
					key={item.address}
					underlayColor="white"
					onPress={() => {
						// this.setAddress(item.address);
					}}
				>
					<View
						style={{
							height: 80,
							borderWidth: 1,
							// flex: 1,
							flexDirection: "row",
							borderColor: "#D6D6D6",
							marginBottom: 10,
							borderRadius: 10,
							alignItems: "center",
							padding: 15
						}}
					>
						<Image
							style={{ marginRight: 20 }}
							source={require("../img/ico-address.png")}
						/>
						<View style={{alignItems: 'flex-start' , minWidth: 200,justifyContent: 'flex-start' }}>
						
							<Text style={{...appStyles.text , fontSize: 16 , textAlign: 'left'}}>
								{item.address}
							</Text>
						</View>
						{isCurrent ? (
							<Image
								style={{
									marginRight: 20,
									marginLeft: "auto",
									width: 19,
									height: 22
								}}
								source={require("../img/ico-ok.png")}
							/>
						) : null}
					</View>
				</TouchableHighlight>
			);
		});
		return (
			<ScrollView>
				<View
					style={{
						// backgroundColor: Colors.lightgray,
						alignItems: "center",
						paddingTop: 30,
                        // paddingBottom: 30,
                        ...appStyles.paddings,
					}}
				>
                    {addressesItems}
					<Text
						style={{
							textAlign: "center",
                            color: Colors.text,
                            fontSize: 16,
                            fontFamily: "Neuron",
                            marginTop: 30,
                            marginBottom: 30,
						}}
					>
						Если вы хотите изменить текущий или добавить новый адрес, просьба оставить заявку в форму ниже или позвонить нам
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
                        
					</Text>
                    
				</View>
                    <Form 
                        style={{paddingBottom: 50}}
                        title='Добавлени/изменение адреса'
                        fromPage='С страницы "Адреса доставок" '
                        sendMail={this.props.screenProps.sendMail}
                        
                        navigation={this.props.navigation}
                    />
			</ScrollView>
		);
	}
}
