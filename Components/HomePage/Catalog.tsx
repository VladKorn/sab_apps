import { useContext } from "react";
import { AppContext } from "./../App/Context";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import appStyles from "./../appStyles";
const Catalog = () => {
	const navigation = useNavigation();
	const appContext = useContext(AppContext);
	if (!appContext.catalog) return null;
	const cats = Object.keys(appContext.catalog).map((id) => {
		const item = appContext.catalog[id];
		return (
			<TouchableOpacity
				key={item.id}
				onPress={() => {
					navigation.navigate("Cats", {
						catId: item.id,
					});
				}}
			>
				<View
					style={{
						...appStyles.borderRadius,
						width: 71,
						height: 73,
						marginRight: 5,
						marginBottom: 10,
						backgroundColor: "#F2F2F2",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Image
						style={{ width: 71, height: 73 }}
						source={{
							uri: "https://subexpress.ru" + item.img,
						}}
					/>
				</View>
				<Text style={{ width: 70, textAlign: "center" }}>
					{item.name}
				</Text>
			</TouchableOpacity>
		);
	});
	return (
		<>
			{cats.map((x) => {
				return x;
			})}
		</>
	);
};
export default Catalog;
