import { Text } from "react-native";
import { useMemo } from "react";
import ProductItemOrder from "./../ProductItemOrder";
import appStyles from "./../appStyles";
import { useContext } from "react";
import { BasketContext } from "../Basket/BasketContext";

interface Props {
	products: any;
}

export const ProductsList = (props: Props) => {
	const basketContext = useContext(BasketContext);
	console.log("ProductsList");
	const basketEmpty = !(Object.entries(basketContext.basket).length > 0);
	const productsEmpty = !(Object.entries(props.products).length > 0);

	const items = Object.keys(basketContext.basket).map((key) => {
		let item = props.products[key];
		const count = basketContext.basket[item.id].count;
		// return useMemo(() => {
		// if (basketEmpty) {
		// 	return <Text style={appStyles.text}>Корзина пуста</Text>;
		// }
		// if (productsEmpty) {
		// 	return null;
		// }
		return (
			<ProductItemOrder
				key={item.id}
				id={item.id}
				name={item.name}
				img={item.img}
				price={item.price}
				initialCount={count}
			/>
		);
		// }, [count]);
	});
	return <>{items}</>;
};
