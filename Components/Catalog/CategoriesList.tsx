import { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	Image,
} from "react-native";
import { AppContext } from "./../App/Context";
import colors from "./../../constants/colors";

interface Props {
	mode?: "horizontal";
}

export const CategoriesList = (props: Props) => {
	const appContex = useContext(AppContext);
	const route = useRoute();
	const navigation = useNavigation();
	// console.log("route.params.catId", route.params.catId);

	const rootCat = appContex.catalog[route.params.catId] || null;
	if (rootCat && !rootCat.cats) {
		console.log(rootCat.cats, rootCat.cats);
		// navigation.navigate("Catalog", {
		// 	catId: route.params.catId,
		// });

		return (
			<TouchableOpacity
				style={{ margin: 15 }}
				onPress={() => {
					navigation.navigate("Catalog", {
						catId: route.params.catId,
					});
				}}
			>
				<Image
					style={styles2.img}
					source={{
						uri: "https://subexpress.ru" + rootCat.img,
					}}
				/>
				<View style={styles2.button}>
					<Text style={{ padding: 10, textAlign: "center" }}>
						{rootCat.name}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
	// console.log("rootCat", rootCat);
	const innerCatId = route.params.innerCatId;

	// if (!rootCat) {
	// 	Object.keys(appContex.catalog).forEach((cat) => {
	// 		const innerCatId = cat.cats[route.params.catId];
	// 		if (innerCatId) rootCat = innerCatId;
	// 	});
	// }
	// console.log("rootCat", rootCat);
	if (!rootCat) return null;
	if (!appContex.catalog) return null;
	if (!rootCat.cats) return null;
	const styles = props.mode === "horizontal" ? _styles : styles2;

	const items = Object.keys(rootCat.cats)
		.sort((a, b) => (rootCat.cats[a].sort < rootCat.cats[b].sort ? -1 : 1))
		.map((id) => {
			const cat = rootCat.cats[id];
			// console.log("cat", cat);
			let sty = {
				...styles.button,
			};
			if (innerCatId === parseInt(id)) {
				sty = { ...sty, ...styles.active };
			}
			return (
				<TouchableOpacity
					style={{}}
					key={id}
					onPress={() => {
						navigation.navigate("Catalog", {
							catId: route.params.catId,
							innerCatId: parseInt(id),
						});
					}}
				>
					{props.mode !== "horizontal" ? (
						<Image
							style={styles.img}
							source={{
								uri: "https://subexpress.ru" + cat.img,
							}}
						/>
					) : null}
					<View style={sty}>
						<Text
							style={{ padding: 10, textAlign: "center" }}
							key={id}
						>
							{cat.name}
						</Text>
					</View>
				</TouchableOpacity>
			);
		});
	return (
		<ScrollView horizontal={props.mode === "horizontal" ? true : false}>
			{props.mode === "horizontal" ? (
				items
			) : (
				<View style={styles.wrap}>{items}</View>
			)}
		</ScrollView>
	);
};
export default CategoriesList;
const _styles = StyleSheet.create({
	wrap: { margin: 15 },
	button: {
		backgroundColor: "white",
		margin: 5,
		borderRadius: 25,
		overflow: "hidden",
	},
	active: {
		backgroundColor: colors.assent2,
		color: "white",
	},
});
const styles2 = StyleSheet.create({
	wrap: {
		margin: 15,
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		backgroundColor: "transparent",
		margin: 5,
		borderRadius: 25,
		overflow: "hidden",
		maxWidth: 100,
	},
	active: {
		backgroundColor: colors.assent2,
		color: "white",
	},
	img: {
		width: 100,
		height: 73,
		borderRadius: 15,
	},
});
