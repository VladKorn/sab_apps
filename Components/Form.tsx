import { useState, useEffect, useContext } from "react";
import Input from "./Input";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import appStyles from "./appStyles";
import Modals from "./Modal";
import { AppContext } from "./App/Context";
interface Props {
	title?: string;
	fromPage: string;
	style?: object;
}
export const Form = (props: Props) => {
	const navigation = useNavigation();
	const appContext = useContext(AppContext);

	const [name, setName] = useState("");
	const [contact, setContact] = useState("");
	const [comment, setComment] = useState("");
	const [modalIsOpen, setModalIsOpen] = useState(false);

	useEffect(() => {
		const didBlurSubscription = navigation.addListener(
			"willBlur",
			(payload) => {
				setModalIsOpen(false);
			}
		);
	}, []);

	const isOpenHendler = (isOpen) => {
		setModalIsOpen(isOpen);
	};
	const submit = async () => {
		// console.log('submit');

		const data: any = {
			name: name,
			contact: contact,
			comment: comment,
			fromPage: props.fromPage,
		};
		const success = await appContext.sendMail(data);
		// console.log('submit-success' , success);
		if (success) {
			setModalIsOpen(true);
			setName("");
			setContact("");
			setComment("");
		} else {
			alert("error");
		}
	};
	return (
		<>
			<View key="form" style={[{ alignItems: "center" }, props.style]}>
				<Text
					style={{
						...appStyles.sectTitle,
						textAlign: "center",
						marginTop: 15,
						marginBottom: 10,
					}}
				>
					{props.title}
				</Text>
				<Input
					center={true}
					placeholder="Ваше имя"
					onChangeText={(text) => {
						setName(text);
					}}
					value={name}
				/>
				<Input
					center={true}
					placeholder="Телефон или E-mail"
					onChangeText={(text) => {
						setContact(text);
					}}
					value={contact}
				/>
				<Input
					center={true}
					placeholder="Комментарий"
					onChangeText={(text) => {
						setComment(text);
					}}
					value={comment}
				/>
				<TouchableOpacity
					onPress={submit}
					style={[
						appStyles.button,
						{ marginBottom: 20, marginTop: 10 },
					]}
				>
					<Text style={appStyles.buttonText}>Отправить</Text>
				</TouchableOpacity>
			</View>
			<Modals
				key="modal"
				height={270}
				isOpen={modalIsOpen}
				isOpenHendler={isOpenHendler}
			>
				<Text style={appStyles.modalText}>
					Ваше сообщение отправлено
				</Text>

				<TouchableOpacity
					onPress={() => {
						setModalIsOpen(false);
					}}
					style={[appStyles.modalButton, { marginTop: 30 }]}
				>
					<Text
						style={[appStyles.modalButtonText, { color: "white" }]}
					>
						Ок
					</Text>
				</TouchableOpacity>
			</Modals>
		</>
	);
};
export default Form;
