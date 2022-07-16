import { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useGetData } from "./../hooks/useGetData";
import appStyles from "./appStyles";
interface Props {}
export const News = (props: Props) => {
	const [items, setItems] = useState({});
	const [openedIndex, setOpenedIndex] = useState({});

	const res = useGetData({ news: true });

	useEffect(() => {
		if (Object.keys(items).length === 0) {
			if (res.error) {
				console.log(res.error);
				return;
			}
			if (res.isDataLoading) {
				return;
			}
			if (res.data) {
				setItems(res.data.news);
			}
		}
	}, [res.isDataLoading]);

	const renderItems = () => {
		if (Object.keys(items).length > 0) {
			return Object.keys(items).map((key) => {
				const item = items[key];
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
									openedIndex === parseInt(key) ? 100 : 4
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
									setOpenedIndex(parseInt(key));
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
	};

	return (
		<ScrollView
			style={{
				flex: 1,
			}}
		>
			{renderItems()}
		</ScrollView>
	);
};
