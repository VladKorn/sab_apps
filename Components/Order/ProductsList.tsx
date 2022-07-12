import { Text } from "react-native";
import ProductItemOrder from "./../ProductItemOrder";
import appStyles from "./../appStyles";
import { useContext } from "react";
import { BasketContext } from "../Basket/BasketContext";

interface Props {
	products: any;
}

export const ProductsList = (props: Props) => {
	const basketContext = useContext(BasketContext);

	const items =
		Object.entries(basketContext.basket).length !== 0 &&
		Object.entries(props.products).length !== 0 ? (
			Object.keys(basketContext.basket).map((key) => {
				let item = props.products[key];
				return (
					<ProductItemOrder
						key={item.id}
						id={item.id}
						name={item.name}
						img={item.img}
						price={item.price}
						initialCount={parseInt(
							basketContext.basket[item.id].count
						)}
					/>
				);
			})
		) : (
			<Text style={appStyles.text}>Корзина пуста</Text>
		);
	return <>{items}</>;
};
