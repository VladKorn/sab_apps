import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import appStyles from "./appStyles";
interface State {
	items: object;
	openedIndex: number;
}
export default class News extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			items: {},
			openedIndex: 0,
		};
		this.renderItems = this.renderItems.bind(this);
	}

	componentDidMount() {
		fetch(`https://subexpress.ru/apps_api/?get=news`)
			.then((res) => res.json())
			.then((res) => {
				this.setState({ items: res.news });
				// console.log('news' , res)
			});
	}
	renderItems() {
		if (Object.keys(this.state.items).length > 0) {
			return Object.keys(this.state.items).map((key) => {
				const item = this.state.items[key];
				return (
					<View
						key={key}
						style={{ width: "100%", alignItems: "center" }}
					>
						<Image
							style={{ width: "100%", height: 170 }}
							source={{
								uri: item.img,
							}}
						/>
						<View style={{ paddingLeft: 25, paddingRight: 25 }}>
							<Text
								style={{
									...appStyles.text,
									fontFamily: "Neuron-Heavy",
									fontSize: 22,
									// lineHeight: 17,
									marginTop: 15,
									marginBottom: 10,
								}}
							>
								{item.name}
							</Text>
							<Text
								numberOfLines={
									this.state.openedIndex === parseInt(key)
										? 100
										: 4
								}
								style={{
									...appStyles.text,
									fontFamily: "Neuron",
									fontSize: 16,
								}}
							>
								{item.text}
							</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								width: "100%",
								justifyContent: "space-between",
								paddingLeft: 25,
								paddingRight: 25,
								marginTop: 10,
							}}
						>
							<TouchableOpacity
								onPress={() => {
									this.setState({
										openedIndex: parseInt(key),
									});
								}}
							>
								<Image
									style={{ width: 15, height: 15 }}
									source={require("../img/ico-arrow-to-bottom.png")}
								/>
							</TouchableOpacity>
							<Text>{item.date}</Text>
						</View>
						<View style={{ ...appStyles.hr, maxWidth: "90%" }} />
					</View>
				);
			});
		}
	}

	render() {
		return (
			<ScrollView
				style={{
					flex: 1,
				}}
			>
				{this.renderItems()}
			</ScrollView>
		);
	}
}
