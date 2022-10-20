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
import { useNavigation } from "@react-navigation/native";

export const Info = () => {
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
			<Text style={styleTitle}>Важные правила:</Text>
			<Text style={textStyle}>
				• — Доставка заказов производится 6 дней в неделю с понедельника
				по субботу.
			</Text>
			<Text style={textStyle}>
				• — Минимальный заказ 1000 руб, до 1500 доставка 150 руб, от
				1500 доставка бесплатно (в пределах МКАД)
			</Text>
			<Text style={textStyle}>
				• — Заказы на "завтра" принимаем СТРОГО с 10:00 до 18:00 с
				понедельника по пятницу (заказы на понедельник и субботу
				принимаем в пятницу).
			</Text>
			<Text style={styleTitle}>Заключение договора</Text>
			<Text style={textStyle}>
				Копии документов для заключения договора необходимо выслать на
				почту zakaz@subexpress.ru Список документов:
			</Text>
			<Text style={textStyle}>Список документов:</Text>

			<Text style={textStyle}>• ИНН</Text>
			<Text style={textStyle}>• ОГРН</Text>
			<Text style={textStyle}>• ПАСПОРТ</Text>
			<Text style={textStyle}>• ДОГОВОР АРЕНДЫ ТТ</Text>
			<Text style={textStyle}>• КАРТОЧКА ОРГАНИЗАЦИИ</Text>
		</ScrollView>
	);
};
export default Info;
