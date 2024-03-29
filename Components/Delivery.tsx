import React from "react";
import {
	View,
	ScrollView,
	Text,
	Image,
	TouchableHighlight,
	TouchableOpacity,
	SafeAreaView,
	StyleSheet
} from "react-native";
import Colors from "../constants/Colors.js";
import months from "../constants/months.js";
import Modals from "./Modal";

import DatePicker from "react-native-datepicker";

import appStyles from "./appStyles";
interface State {
	priceTotal: number;
	address: string;
	date: string;
	modalIsOpen: boolean;
	modalOrderIsOpen: boolean;
	DatePickerIsOpen: boolean;
	isInitial: boolean;
	isSunday: boolean;
	// data: any;
}

export default class Order extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			priceTotal: 0,
			address: this.props.screenProps.user.addresses
				? this.props.screenProps.user.addresses[0].address
				: null,
			date: "2019-08-11",
			modalIsOpen: false,
			modalOrderIsOpen: false,
			DatePickerIsOpen: false,
			isInitial: true,
			isSunday: false
		};
		this.setAddress = this.setAddress.bind(this);
		this.setDate = this.setDate.bind(this);
		this.makeOrder = this.makeOrder.bind(this);
		this.openDatePicker = this.openDatePicker.bind(this);
	}
	static navigationOptions = {
		title: "Оформление заказа"
	};

	componentDidMount() {
		const date = new Date();
		const formatedDate = `${date.getFullYear()}-${(
			"0" +
			(date.getMonth() + 1)
		).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
		// console.log("formatedDate", formatedDate);
		this.setState({ date: formatedDate });

		const didBlurSubscription = this.props.navigation.addListener(
			"willBlur",
			payload => {
				//   console.debug('willBlur', payload);
				this.setState({
					modalIsOpen: false,
					modalOrderIsOpen: false
				});
			}
		);
	}

	componentDidUpdate(prevProps, prevState) {
		// const datestr = this.state.date.replace('-', ',').replace('-', ',');
		// const selectedDate = new Date();
		// const dateArr = this.state.date.split("-");
		// selectedDate.setFullYear(parseInt(dateArr[0]));
		// selectedDate.setMonth(parseInt(dateArr[1]), 0);
		// selectedDate.setDate(parseInt(dateArr[2]));
		// console.log('selectedDate'  , selectedDate.getMonth() ,'-',selectedDate.toUTCString(),'-', selectedDate.getDate() , selectedDate.getDay());
	}
	openDatePicker() {
		this.setState({ DatePickerIsOpen: true });
		setTimeout(() => {
			// console.log("openDatePicker2", this.state.DatePickerIsOpen);
			this.setState({ DatePickerIsOpen: false });
		}, 300);
	}
	_checkDate() {
		if (this.state.isInitial) {
			return false;
		}
		const date = new Date();
		const dateArr = this.state.date.split("-");

		// disable for sunday
		const selectedDate = new Date();
		selectedDate.setFullYear(parseInt(dateArr[0]));
		selectedDate.setMonth(parseInt(dateArr[1]), 0);
		selectedDate.setDate(parseInt(dateArr[2]));
		// console.log('selectedDate'  , selectedDate.getMonth() ,'-',selectedDate.toUTCString(),'-', selectedDate.getDate() , selectedDate.getDay());
		if (selectedDate.getDay() === 0) {
			// console.log('FALSE');
			this.setState({ isSunday: true });
			return false;
		} else {
			this.setState({ isSunday: false });
		}
		// END disable for sunday

		// const selectedDay = parseInt(dateArr[2]);

		if (
			parseInt(dateArr[0]) === date.getFullYear() &&
			parseInt(dateArr[1]) === date.getMonth() + 1 &&
			parseInt(dateArr[2]) === date.getDate() &&
			date.getHours() > 17
		) {
			return false;
		} else {
			return true;
		}
	}
	setAddress(address) {
		this.setState({ address: address });
		// console.log('addr' , this.state.address);
	}
	setDate(newDate) {
		// this.setState({chosenDate: newDate});
		// this.props.navigation.actions.goBack();
	}
	async makeOrder() {
		const success = await this.props.screenProps.makeOrder({
			address: this.state.address,
			date: this.state.date
		});
		console.log("success", success);
		if (success) {
			this.setState({ modalOrderIsOpen: true });
		} else {
			alert("error");
		}
	}
	renderAddresses = () => {
		const addresses = this.props.screenProps.user.addresses || [];
		const addressesItems = addresses.map(item => {
			const isCurrent = item.address === this.state.address;
			return (
				<TouchableHighlight
					key={item.address}
					underlayColor="white"
					onPress={() => {
						this.setAddress(item.address);
					}}
				>
					<View
						style={{
							height: 80,
							borderWidth: isCurrent ? 3 : 1,
							flex: 1,
							flexDirection: "row",
							borderColor: isCurrent ? Colors.assent : "#D6D6D6",
							marginBottom: 10,
							borderRadius: 10,
							alignItems: "center",
							padding: 15
						}}
					>
						<Image
							style={{ marginRight: 20 }}
							source={
								isCurrent
									? require("../img/ico-address-active.png")
									: require("../img/ico-address.png")
							}
						/>
						<View>
							<Text
								style={{
									fontFamily: "Neuron-Bold",
									color: "#000000"
								}}
							>
								{item.address}
								{/* заголовок */}
							</Text>
							{/* <Text>
                            {item.address}
							</Text> */}
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
			<View>
				{addressesItems.length > 0 ? (
					addressesItems
				) : (
					<Text style={appStyles.sectTitle}>
						Для изменения адреса, обратитесь к вашему менеджеру.
					</Text>
				)}
			</View>
		);
	};
	render() {
		if (!this.props.screenProps.user?.id) {
			return (
				<View style={appStyles.paddings}>
					<Text style={appStyles.sectTitle}>
						Для оформления заказа нужна авторизация
					</Text>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate("User");
						}}
						style={appStyles.button}
					>
						<Text style={appStyles.buttonText}>Вход</Text>
					</TouchableOpacity>
				</View>
			);
		}
		const date = new Date();
		date.setDate(date.getDate() + 1);
		const minDate = date;
		return (
			<SafeAreaView style={appStyles.page}>
				<ScrollView
					style={{
						paddingVertical: 0,
						paddingLeft: 15,
						// paddingTop: 25,
						flex: 1,
						paddingRight: 15
						// marginTop: 35,
					}}
				>
					<Text style={appStyles.sectTitle}>Адрес</Text>
					{this.renderAddresses()}
					<Text style={appStyles.sectTitle}>
						Дата и время доставки
					</Text>

					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							width: "100%"
						}}
					>
                        {/* if (nextProps.isOpen) {
                            this.setModalVisible(true)
                        } */}
						<View style={{ marginLeft: 5, marginTop: 5 }}>
							<DatePicker
								isOpen={this.state.DatePickerIsOpen}
								style={{ width: 30 }}
								date={this.state.date}
								mode="date"
								placeholder="select date"
								format="YYYY-MM-DD"
								minDate={minDate}
								confirmBtnText="Принять"
								cancelBtnText="Отмена"
								iconSource={require("../img/ico-date.png")}
								hideText="true"
								customStyles={{
									dateIcon: {
										position: "absolute",
										left: 0,
										top: 4,
										marginLeft: 0,
										width: 18,
										height: 21
									},
									dateInput: {
										marginLeft: 30
									}
									// ... You can check the source to find the other keys.
								}}
								onDateChange={date => {
									this.setState({ date: date });
									this.setState({ isInitial: false });
								}}
							/>
						</View>
						<TouchableOpacity
							onPress={this.openDatePicker}
							style={{ flexDirection: "row" }}
						>
							<View style={styles.dateLabel}>
								<Text style={styles.dateLabelText}>
									{this.state.isInitial
										? "--"
										: this.state.date.split("-")[2]}
								</Text>
							</View>
							<View style={styles.dateLabel}>
								<Text style={styles.dateLabelText}>
									{
										months[
											parseInt(
												this.state.date.split("-")[1]
											) - 1
										]
									}
								</Text>
							</View>
							<View style={styles.dateLabel}>
								<Text style={styles.dateLabelText}>
									{this.state.date.split("-")[0]}
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</ScrollView>
				<TouchableOpacity
					onPress={() => {
						this._checkDate()
							? this.makeOrder()
							: this.setState({ modalIsOpen: true });
					}}
					style={appStyles.buttonBottom}
				>
					<Text style={{ color: "white", fontSize: 20 }}>
						Оформить заказ
					</Text>
				</TouchableOpacity>
				{/*  */}
				<Modals
					// height={310}
					isOpen={this.state.modalIsOpen}
					isOpenHendler={isOpen => {}}
				>
					<Text style={appStyles.modalText}>
						{this.state.isSunday
							? "Доставка в воскресенье невозможна\nвыберите другой день"
							: this.state.isInitial
							? "Укажите дату доставки"
							: "Даю согласие\nна обработку заказа\nна следующий \nрабочий день"}
					</Text>
					<View style={{ flexDirection: "row", marginTop: 10 }}>
						{!this.state.isInitial && !this.state.isSunday ? (
							<TouchableOpacity
								onPress={() => {
									this.setState({ modalIsOpen: false });
								}}
								style={[
									appStyles.modalButton,
									{ backgroundColor: "white" }
								]}
							>
								<Text style={appStyles.modalButtonText}>
									Нет
								</Text>
							</TouchableOpacity>
						) : null}
						<TouchableOpacity
							onPress={() => {
								this.setState({ modalIsOpen: false });
								!this.state.isInitial && !this.state.isSunday
									? this.makeOrder()
									: null;
							}}
							style={appStyles.modalButton}
						>
							<Text
								style={[
									appStyles.modalButtonText,
									{ color: "white" }
								]}
							>
								{!this.state.isInitial && !this.state.isSunday
									? "Да"
									: "Ок"}
							</Text>
						</TouchableOpacity>
					</View>
				</Modals>
				<Modals
					height={250}
					isOpen={this.state.modalOrderIsOpen}
					isOpenHendler={isOpen => {}}
				>
					<Text style={appStyles.modalText}>
						Спасибо!{"\n"}Ваш заказ принят
					</Text>
					<View style={{ flexDirection: "row", marginTop: 10 }}>
						<TouchableOpacity
							onPress={() => {
								this.setState({ modalOrderIsOpen: false });
								setTimeout(() => {
									this.props.navigation.navigate("Home");
								}, 500);
							}}
							style={appStyles.modalButton}
						>
							<Text
								style={[
									appStyles.modalButtonText,
									{ color: "white" }
								]}
							>
								Ок
							</Text>
						</TouchableOpacity>
					</View>
				</Modals>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	dateLabel: {
		borderBottomColor: "#E2E2E2",
		borderBottomWidth: 1,
		height: 50,
		justifyContent: "center",
		marginRight: 25
	},
	dateLabelText: { fontFamily: "Neuron", fontSize: 30, color: Colors.text }
});
