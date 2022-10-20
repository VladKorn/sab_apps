import {} from "react";
import { StyleSheet } from "react-native";

import { CategoriesList } from "./CategoriesList";
import HeaderRight from "./../Catalog/HeaderRight";
import Catalog from "./../Catalog";
import { Stack } from "./../HomeScreen";

export const Categories = () => {
	return (
		<>
			<Stack.Screen name="Cats" component={CategoriesList}></Stack.Screen>
			<Stack.Screen
				name="Catalog"
				component={Catalog}
				options={{
					headerTitle: "Меню",
					headerRight: () => {
						return <HeaderRight />;
					},
				}}
			/>
		</>
	);
};
