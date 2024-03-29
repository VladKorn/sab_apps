import { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/colors";
import appStyles from "../appStyles";
import HistoryListItem from "./HistoryListItem";
import Loading from "../Loading";
import HistoryDetail from "./HistoryDetail";
// import { Stack } from "./../HomeScreen";
// import { Stack } from "./../HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getOrders } from "./getOrders";
import { AuthContext } from "./../Login/Login";

interface Props {}
export const SidebarCatalog = (props: Props) => {
	const authContext = useContext(AuthContext);
	const navigation = useNavigation();
	const [items, setItems] = useState({});
	const [active, setActive] = useState<number[]>([]);
	const [week, setWeek] = useState<number[]>([]);
	const [month, setMonth] = useState<number[]>([]);
	const [year, setYear] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if (!authContext.user.id) {
			navigation.navigate("User");
		}
	}, []);

	useEffect(() => {
		const start = new Date().getTime();
		getOrders({ userId: authContext.user.id }).then((res) => {
			setItems(res.orders.all);
			setActive(res.orders.active);
			setWeek(res.orders.week);
			setMonth(res.orders.month);
			setYear(res.orders.year);
			setIsLoading(false);
			const end = new Date().getTime();
			console.log(end - start, Object.keys(res.orders.all).length);
		});
	}, []);

	if (isLoading) {
		return <Loading></Loading>;
	}
	return (
		<ScrollView>
			<View
				style={{
					backgroundColor: Colors.lightgray,
					...appStyles.paddings,
				}}
			>
				<Text style={appStyles.sectTitle}>Активные заказы</Text>
				<View>
					{active
						? active.map((id) => {
								const item = items[id];
								return (
									<HistoryListItem
										key={id}
										id={id}
										address={item.address}
										price={item.price}
										count={item.products.length}
										img={item.img}
										date={item.date}
										status={item.status}
										canceled={item.canceled}
										products={item.products}
										desc={item.desc}
										payData={item.payData}
									/>
								);
						  })
						: null}
				</View>
			</View>
			<View style={{ ...appStyles.paddings }}>
				<Text style={appStyles.sectTitle}>История заказов</Text>
				<Text
					style={{
						fontFamily: "Neuron-Bold",
						fontSize: 16,
						color: "#B8B8B8",
						marginBottom: 10,
						marginTop: 15,
					}}
				>
					На прошлой неделе
				</Text>
				<View>
					{week
						? week.map((id) => {
								const item = items[id];
								return (
									<HistoryListItem
										key={id}
										id={id}
										address={item.address}
										price={item.price}
										count={item.products.length}
										img={item.img}
										date={item.date}
										status={item.status}
										canceled={item.canceled}
										products={item.products}
										desc={item.desc}
										payData={item.payData}
									/>
								);
						  })
						: null}
				</View>
				<Text
					style={{
						fontFamily: "Neuron-Bold",
						fontSize: 16,
						color: "#B8B8B8",
						marginBottom: 10,
						marginTop: 15,
					}}
				>
					В прошлом месяце
				</Text>
				<View>
					{month
						? month.map((id) => {
								const item = items[id];
								return (
									<HistoryListItem
										key={id}
										id={id}
										address={item.address}
										price={item.price}
										count={item.products.length}
										img={item.img}
										date={item.date}
										status={item.status}
										canceled={item.canceled}
										products={item.products}
										desc={item.desc}
										payData={item.payData}
									/>
								);
						  })
						: null}
				</View>
				<Text
					style={{
						fontFamily: "Neuron-Bold",
						fontSize: 16,
						color: "#B8B8B8",
						marginBottom: 10,
						marginTop: 15,
					}}
				>
					В прошлом году
				</Text>
				<View>
					{year
						? year.map((id) => {
								const item = items[id];
								return (
									<HistoryListItem
										key={id}
										id={id}
										address={item.address}
										price={item.price}
										count={item.products.length}
										img={item.img}
										date={item.date}
										status={item.status}
										canceled={item.canceled}
										products={item.products}
										desc={item.desc}
										payData={item.payData}
									/>
								);
						  })
						: null}
				</View>
			</View>
		</ScrollView>
	);
};
const Stack = createNativeStackNavigator();

interface _Props {}

export const OrderHistoryNav = (_props: _Props) => {
	return (
		<>
			<Stack.Navigator>
				<Stack.Screen
					name="main"
					options={{ headerShown: false }}
					component={SidebarCatalog}
				/>
				<Stack.Screen
					name="HistoryDetail"
					options={{ headerTitle: "Заказ", headerShown: false }}
					component={HistoryDetail}
				/>
			</Stack.Navigator>
		</>
	);
};
export default OrderHistoryNav;
