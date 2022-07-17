import {} from "react";
import Colors from "./../constants/colors";

import { ActivityIndicator, View, StyleSheet } from "react-native";

interface Props {
	size?: number | "large" | "small";
	// margins?: boolean;
}
export const Loading = (props: Props) => {
	return (
		<View style={styles.container}>
			<ActivityIndicator
				size={props.size || "large"}
				color={Colors.assent}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		//   flex: 1,
		justifyContent: "center",
		alignItems: "center",
		//   backgroundColor: '#fff',
		// paddingVertical: 20,
	},

	circles: {
		flexDirection: "row",
		alignItems: "center",
	},
	progress: {
		margin: 10,
	},
});
export default Loading;
