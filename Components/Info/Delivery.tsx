import { useNavigation } from "@react-navigation/native";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Linking,
	ScrollView,
	StyleSheet,
} from "react-native";
import { Colors } from "./../../constants/colors";
import appStyles from "./../appStyles";

const styles = StyleSheet.create({
	wrap: {
		borderRadius: appStyles.borderRadius.borderRadius,
		backgroundColor: "white",
		margin: 10,
		paddingTop: 7,
		// padding: 10,
		overflow: "hidden",
	},
	items: {
		flexDirection: "row",
		padding: 5,
		justifyContent: "space-around",
	},
	itemWrap: {},
	item: {
		textAlign: "center",
		fontSize: 18,
	},
	itemTop: {
		textAlign: "center",
		color: Colors.lightText,
	},
	pro: {
		backgroundColor: Colors.assent,
		color: "white",
		marginTop: 7,
		textAlign: "center",
		padding: 2,
	},
});

export const DeliveryInfo = () => {
	const textStyle = {
		...appStyles.text,
		fontSize: 16,
		paddingBottom: 5,
	};
	const styleTitle = {
		...appStyles.text,
		fontSize: 26,
		paddingBottom: 5,
		paddingTop: 8,
	};
	return (
		<ScrollView style={{ margin: 15 }}>
			<Text style={styleTitle}>Доставка</Text>

			<Text style={textStyle}>
				• Доставка заказов производится 6 дней в неделю с понедельника
				по субботу.
			</Text>

			<Text style={textStyle}>
				• Заказы на следующий день принимаются строго до 18.00 текущего
				дня!
			</Text>
			<Text style={textStyle}>
				• Заказы на субботу и понедельник принимаются в пятницу до
				18.00!{" "}
			</Text>
			<Text style={textStyle}>
				• Минимальный заказ 1000 рублей, но при этом в счет будет
				включена стоимость доставки 150 рублей!
			</Text>
			<Text style={textStyle}>
				• БЕСПЛАТНАЯ ДОСТАВКА только при сумме заказа от 1500 рублей или
				аккаунт со статусом PRO!
			</Text>

			<Text style={styleTitle}>Аккаунт со статусом PRO. </Text>

			<Text style={textStyle}>
				- Бесплатная доставка всегда! Минимальная сумма заказа 1000
				рублей при этом сохраняется.
			</Text>
			<Text style={textStyle}>
				- Дополнительные скидки на категории товаров! Вам будет доступен
				скрытый раздел.
			</Text>
			<Text style={styleTitle}>Как оформить.</Text>
			<Text style={textStyle}>
				Необходимо просто вносить депозит на свой счет. Суммы за заказ
				будут списываться с него. Провести сверку остатка можно в любой
				момент написав нашему бухгалтеру на почту buh@subexpress.ru
			</Text>
		</ScrollView>
	);
};

export const DeliveryInfoShort = () => {
	const navigation = useNavigation();
	const onPress = () => {
		navigation.navigate("DeliveryInfo");
	};
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.wrap}>
				<View style={styles.items}>
					<View style={styles.itemWrap}>
						<Text style={styles.itemTop}>Прием заказов</Text>
						<Text style={styles.item}>до 18.00</Text>
					</View>
					<View style={styles.itemWrap}>
						<Text style={styles.itemTop}>Доставка</Text>
						<Text style={styles.item}>0 Р</Text>
					</View>
					<View style={styles.itemWrap}>
						<Text style={styles.itemTop}>Мин заказ</Text>
						<Text style={styles.item}>от 1000 Р</Text>
					</View>
				</View>
				<Text style={styles.pro}>
					Переходи на PRO аккаунт! Информация внутри
				</Text>
			</View>
		</TouchableOpacity>
	);
};
