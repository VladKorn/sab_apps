import {} from "react";
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
				options={{
					headerTitle: "Меню",
					headerRight: () => {
						return <HeaderRight />;
					},
				}}
			>
				{(props) => <Catalog {...props} name={"Catalog"} />}
			</Stack.Screen>
		</>
	);
};
export default Categories;
