import { useContext } from "react";
import { AppContext } from "./../App/Context";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import appStyles from "./../appStyles";
import { Colors } from "./../../constants/colors";
// import { styles } from "../Order/historyStyles";
const styles = StyleSheet.create({
	wrap: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		width: "100%",
		// backgroundColor: "white",
		// justifyContent: "space-around",
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 7,
		paddingRight: 7,
	},
	itemWrap: {
		width: "33.33%",
		// flexGrow: 1,
		marginBottom: 15,
		alignItems: "center",
		// margin: "5%",
	},
	item: {
		// margin: 10,
		// flexGrow: 1,
		borderRadius: appStyles.borderRadius.borderRadius,
		overflow: "hidden",
		// padding: 5,
		alignItems: "center",
		backgroundColor: Colors.lightgray,
		marginLeft: 7,
		marginRight: 7,
		paddingBottom: 15,
	},
	img: {
		...appStyles.borderRadius,
		width: 110,
		height: 90,
		// marginRight: 5,
		marginBottom: 10,
		// backgroundColor: Colors.lightgray,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		width: 90,
		// color: "white",
		position: "absolute",
		bottom: 7,
		left: 10,
	},
});
export const CatalogCats = () => {
	const navigation = useNavigation();
	const appContext = useContext(AppContext);
	if (!appContext.catalog) return null;
	const cats = Object.keys(appContext.catalog).map((id) => {
		const item = appContext.catalog[id];
		return (
			<View style={styles.itemWrap} key={item.id}>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("Catalog", {
							catId: item.id,
						});
					}}
					style={styles.item}
				>
					<View style={styles.img}>
						<Image
							style={{ width: 110, height: 90 }}
							source={{
								uri: "https://subexpress.ru" + item.img,
							}}
						/>
					</View>
					<Text style={styles.text}>{item.name}</Text>
				</TouchableOpacity>
			</View>
		);
	});
	return (
		<View style={styles.wrap}>
			{cats.map((x) => {
				return x;
			})}
		</View>
	);
};
