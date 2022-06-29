import { View, Text, Image, TouchableHighlight } from "react-native";
import Colors from "../../constants/colors";
import appStyles from "./../appStyles";
interface Props {
	user: any;
	address: any;
	setAddress: (x: any) => void;
}
export const Addresses = (props: Props) => {
	const addresses = props.user.addresses || [];
	const addressesItems = addresses.map((item) => {
		const isCurrent = item.address === props.address.address;
		return (
			<TouchableHighlight
				key={item.address}
				underlayColor="white"
				onPress={() => {
					props.setAddress(item);
				}}
			>
				<View
					style={{
						height: 80,
						borderWidth: isCurrent ? 3 : 1,
						flex: 1,
						flexDirection: "row",
						borderColor: isCurrent ? Colors.assent : "#D6D6D6",
						marginBottom: 10,
						borderRadius: 10,
						alignItems: "center",
						padding: 15,
					}}
				>
					<Image
						style={{ marginRight: 20 }}
						source={
							isCurrent
								? require("../../img/ico-address-active.png")
								: require("../../img/ico-address.png")
						}
					/>
					<View>
						<Text
							style={{
								fontFamily: "Neuron-Bold",
								color: "#000000",
							}}
						>
							{item.address}
							{/* заголовок */}
						</Text>
						{/* <Text>
                        {item.address}
                        </Text> */}
					</View>
					{isCurrent ? (
						<Image
							style={{
								marginRight: 20,
								marginLeft: "auto",
								width: 19,
								height: 22,
							}}
							source={require("../../img/ico-ok.png")}
						/>
					) : null}
				</View>
			</TouchableHighlight>
		);
	});
	return (
		<View>
			{addressesItems.length > 0 ? (
				addressesItems
			) : (
				<Text style={appStyles.sectTitle}>
					Для изменения адреса, обратитесь к вашему менеджеру.
				</Text>
			)}
		</View>
	);
};
export default Addresses;
