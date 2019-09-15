import React from "react";
import Input from "./Input";
import { View, Text, TouchableOpacity } from "react-native";
import appStyles from "./appStyles.js";
import Modals from "./Modal";
interface Props {
	title?: string;
	fromPage: string;
	sendMail: (data) => any;
	style?: object;
}
interface State {
	name: string;
	contact: string;
	comment: string;
	modalIsOpen: boolean;
}
export default class Form extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			contact: "",
			comment: "",
			modalIsOpen: false
		};
		this.submit = this.submit.bind(this);
		this.isOpenHendler = this.isOpenHendler.bind(this);
	}
	isOpenHendler(isOpen) {
		this.setState({ modalIsOpen: isOpen });
	}
	async submit() {
        // console.log('submit');
        
		const data: any = {
			name: this.state.name,
			contact: this.state.contact,
			comment: this.state.comment,
			fromPage: this.props.fromPage
		};
        const success = await this.props.sendMail(data);
        // console.log('submit-success' , success);
        if(success){
            this.setState({ modalIsOpen: true , name: "", contact: "", comment: "" });
        } else{
            alert('error');
        }
	}
	render() {
		return [
			<View
				key="form"
				style={[{ alignItems: "center" }, this.props.style]}
			>
				<Text
					style={{
						...appStyles.sectTitle,
						textAlign: "center",
						marginTop: 15,
						marginBottom: 10
					}}
				>
					{this.props.title}
				</Text>
				<Input
					center={true}
					placeholder="Ваше имя"
					onChangeText={text => {
						this.setState({ name: text });
					}}
					value={this.state.name}
				/>
				<Input
					center={true}
					placeholder="Телефон или E-mail"
					onChangeText={text => {
						this.setState({ contact: text });
					}}
					value={this.state.contact}
				/>
				<Input
					center={true}
					placeholder="Комментарий"
					onChangeText={text => {
						this.setState({ comment: text });
					}}
					value={this.state.comment}
				/>
				<TouchableOpacity
					onPress={this.submit}
					style={[
						appStyles.button,
						{ marginBottom: 20, marginTop: 10 }
					]}
				>
					<Text style={appStyles.buttonText}>Отправить</Text>
				</TouchableOpacity>
			</View>,
			<Modals
				key="modal"
				height={270}
				isOpen={this.state.modalIsOpen}
				isOpenHendler={this.isOpenHendler}
			>
				<Text style={appStyles.modalText}>
					Ваше сообщение отправлено
				</Text>

				<TouchableOpacity
					onPress={() => {
						this.setState({ modalIsOpen: false });
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
		];
	}
}
