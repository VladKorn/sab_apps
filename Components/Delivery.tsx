import { useState, useEffect, useContext } from "react";
import {
	View,
	ScrollView,
	Text,
	Image,
	TouchableHighlight,
	TouchableOpacity,
	SafeAreaView,
	StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/colors";
import months from "../constants/months.js";
import Modals from "./Modal";

import { Addresses } from "./Order/Addresses";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import appStyles from "./appStyles";
import { BasketContext } from "./Basket/BasketContext";
import { AuthContext } from "./Login/Login";
import { Loading } from "./Loading";
interface Props {}

export const Delivery = (props: Props) => {
	const basketContext = useContext(BasketContext);
	const authContext = useContext(AuthContext);

	const navigation = useNavigation();
	const [orderId, setOrderId] = useState(null);
	const [priceTotal, setPriceTotal] = useState(0);
	const [address, setAddress] = useState(
		authContext.user?.addresses ? authContext.user.addresses[0] : null
	);

	const _date = new Date();
	_date.setDate(_date.getDate() + 1);
	const minDate = _date;
	const [date, setDate] = useState<Date>(minDate);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalOrderIsOpen, setModalOrderIsOpen] = useState(false);
	const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
	const [isInitial, setIsInitial] = useState(true);
	const [isSunday, setIsSunday] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		// const date = new Date();
		// const formatedDate = `${date.getFullYear()}-${(
		// 	"0" +
		// 	(date.getMonth() + 1)
		// ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
		// // console.log("formatedDate", formatedDate);
		// setDate(formatedDate);

		const didBlurSubscription = navigation.addListener(
			"willBlur",
			(payload) => {
				//   console.debug('willBlur', payload);

				setModalIsOpen(false);
				setModalOrderIsOpen(false);
			}
		);
	}, []);
	useEffect(() => {
		setIsSunday(date.getDay() === 6);
	}, [date]);

	// componentDidUpdate(prevProps, prevState) {
	// 	// const datestr = this.state.date.replace('-', ',').replace('-', ',');
	// 	// const selectedDate = new Date();
	// 	// const dateArr = this.state.date.split("-");
	// 	// selectedDate.setFullYear(parseInt(dateArr[0]));
	// 	// selectedDate.setMonth(parseInt(dateArr[1]), 0);
	// 	// selectedDate.setDate(parseInt(dateArr[2]));
	// 	// console.log('selectedDate'  , selectedDate.getMonth() ,'-',selectedDate.toUTCString(),'-', selectedDate.getDate() , selectedDate.getDay());
	// }

	const formatDate = (date: Date) => {
		function format(n) {
			return n < 10 ? "0" + n : n;
		}
		return `${date.getFullYear()}-${format(date.getMonth())}-${format(
			date.getDate()
		)} 00:00:00`;
	};

	const _setDate = (newDate) => {
		// this.setState({chosenDate: newDate});
		// props.navigation.actions.goBack();
	};
	const makeOrder = async () => {
		setIsLoading(true);
		const res = await basketContext.makeOrder({
			address: address,
			date: formatDate(date),
		});
		setIsLoading(false);
		console.log("Order makeOrder res", res);
		if (res.success) {
			setOrderId(res.orderId);
			setModalOrderIsOpen(true);
		}
	};

	if (!authContext.user?.id) {
		return (
			<View style={appStyles.paddings}>
				<Text style={appStyles.sectTitle}>
					Для оформления заказа нужна авторизация
				</Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("User");
					}}
					style={appStyles.button}
				>
					<Text style={appStyles.buttonText}>Вход</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<SafeAreaView style={appStyles.page}>
			<ScrollView
				style={{
					paddingVertical: 0,
					paddingLeft: 15,
					// paddingTop: 25,
					flex: 1,
					paddingRight: 15,
					// marginTop: 35,
				}}
			>
				<Text style={appStyles.sectTitle}>Адрес</Text>
				<Addresses
					user={authContext.user}
					setAddress={setAddress}
					address={address}
				/>
				<Text style={appStyles.sectTitle}>Дата и время доставки</Text>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						width: "100%",
					}}
				>
					<TouchableOpacity
						onPress={() => {
							setDatePickerIsOpen(true);
						}}
					>
						<Image
							style={{ width: 20, height: 20 }}
							source={require("../img/calendar.png")}
						/>
					</TouchableOpacity>

					<View style={{ marginLeft: 5, marginTop: 5 }}>
						<DateTimePickerModal
							isVisible={datePickerIsOpen}
							minimumDate={minDate}
							mode="date"
							onConfirm={(_date) => {
								setDatePickerIsOpen(false);
								setDate(_date);
								setIsInitial(false);
							}}
							onCancel={() => {
								setDatePickerIsOpen(false);
							}}
						/>
						{/* <DatePicker
								style={{ width: 30 }}
								date={new Date(this.state.date)}
								mode="date"
								// placeholder="select date"
								// format="YYYY-MM-DD"
								// minDate={minDate}
								// confirmBtnText="Принять"
								// cancelBtnText="Отмена"
								// iconSource={require("../img/ico-date.png")}
								// hideText="true"
								// customStyles={{
								// 	dateIcon: {
								// 		position: "absolute",
								// 		left: 0,
								// 		top: 4,
								// 		marginLeft: 0,
								// 		width: 18,
								// 		height: 21,
								// 	},
								// 	dateInput: {
								// 		marginLeft: 30,
								// 	},
								// 	// ... You can check the source to find the other keys.
								// }}
							
							/> */}
					</View>
					<TouchableOpacity
						onPress={() => {
							setDatePickerIsOpen(true);
						}}
						style={{ flexDirection: "row" }}
					>
						<View style={styles.dateLabel}>
							<Text style={styles.dateLabelText}>
								{isInitial ? "--" : date.getDate()}
							</Text>
						</View>
						<View style={styles.dateLabel}>
							<Text style={styles.dateLabelText}>
								{months[date.getMonth() - 1]}
							</Text>
						</View>
						<View style={styles.dateLabel}>
							<Text style={styles.dateLabelText}>
								{date.getFullYear()}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
			{isLoading ? (
				<Loading />
			) : (
				<TouchableOpacity
					onPress={() => {
						!isSunday ? makeOrder() : setModalIsOpen(true);
					}}
					style={appStyles.buttonBottom}
				>
					<Text style={{ color: "white", fontSize: 20 }}>
						Оформить заказ
					</Text>
				</TouchableOpacity>
			)}
			{/*  */}
			<Modals
				// height={310}
				isOpen={modalIsOpen}
				isOpenHendler={setModalIsOpen}
			>
				<Text style={appStyles.modalText}>
					{isSunday
						? "Доставка в воскресенье невозможна\nвыберите другой день"
						: isInitial
						? "Укажите дату доставки"
						: "Даю согласие\nна обработку заказа\nна следующий \nрабочий день"}
				</Text>
				<View style={{ flexDirection: "row", marginTop: 10 }}>
					{!isInitial && !isSunday ? (
						<TouchableOpacity
							onPress={() => {
								setModalIsOpen(false);
							}}
							style={[
								appStyles.modalButton,
								{ backgroundColor: "white" },
							]}
						>
							<Text style={appStyles.modalButtonText}>Нет</Text>
						</TouchableOpacity>
					) : null}
					<TouchableOpacity
						onPress={() => {
							setModalIsOpen(false);

							!isInitial && !isSunday ? makeOrder() : null;
						}}
						style={appStyles.modalButton}
					>
						<Text
							style={[
								appStyles.modalButtonText,
								{ color: "white" },
							]}
						>
							{!isInitial && !isSunday ? "Да" : "Ок"}
						</Text>
					</TouchableOpacity>
				</View>
			</Modals>
			<Modals
				height={250}
				isOpen={modalOrderIsOpen}
				isOpenHendler={setModalOrderIsOpen}
			>
				<Text style={appStyles.modalText}>
					Спасибо!{"\n"}Ваш заказ принят
				</Text>
				<View style={{ flexDirection: "row", marginTop: 10 }}>
					<TouchableOpacity
						onPress={() => {
							setModalOrderIsOpen(false);
							setTimeout(() => {
								navigation.navigate("OrderHistory", {
									screen: "HistoryDetail",
									params: { pageData: { id: orderId } },
								});
							}, 500);
						}}
						style={appStyles.modalButton}
					>
						<Text
							style={[
								appStyles.modalButtonText,
								{ color: "white" },
							]}
						>
							Ок
						</Text>
					</TouchableOpacity>
				</View>
			</Modals>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	dateLabel: {
		borderBottomColor: "#E2E2E2",
		borderBottomWidth: 1,
		height: 50,
		justifyContent: "center",
		marginRight: 25,
	},
	dateLabelText: { fontFamily: "Neuron", fontSize: 30, color: Colors.text },
});
