import React from "react";
import {
	View,
	Text,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	Image
} from "react-native";
import Colors from "../constants/Colors.js";
import appStyles from "./appStyles";
import Images from "../constants/Images";
import { DrawerActions } from "react-navigation-drawer";

interface State {
	data: object;
	isLoading: boolean;
}
export default class SidebarCatalog extends React.Component<any, State> {
	render() {
		// console.log(JSON.stringify(this.props.navigation ) );

		const routes = Object.keys(this.props.screenProps.catalog).filter(
			item => {
				return (
					item !== "Home" &&
					item !== "Order" &&
					item !== "CategorySlider"
				);
			}
		);
		const menu = routes.map((key, index) => {
			const item = this.props.screenProps.catalog[key];
			// console.log(item.cats);
			return (
				<View key={key}>
                    <TouchableOpacity 
                    onPress={()=>{
                        this.props.navigation.navigate("Catalog", {
                            catId: key,
                        });
                    }}
                    style={{ flexDirection: "row" , paddingLeft: 10}}>
                        <View style={{justifyContent: 'center' , alignItems: 'center' ,width: 20  , height: 45}}>
                        {Images[key]}
                        </View>
                        <View style={{borderBottomWidth: 1, borderBottomColor: Colors.gray , marginLeft: 30, height: 45, marginBottom: 15 , width: 120 , justifyContent: 'center'}}>
                            <Text style={{fontFamily: 'Neuron-Heavy' , fontSize: 18, color: Colors.text  }}>{item.name}</Text>
                        </View>
						<Text style={{ marginLeft: "auto" , fontFamily: 'Segoe', color: '#DCDCDC' , fontSize: 18 }}>
							{item.products.length}
						</Text>
					</TouchableOpacity>
                    <View style={{flexWrap: 'wrap' , flexDirection: 'row'}}>
					{item.cats
						? Object.keys(item.cats).map(key2 => {
                            // console.log(item.cats[key2]);

								return (
                                    <TouchableOpacity 
                                    onPress={()=>{
                                        this.props.navigation.navigate("Catalog", {
                                            catId: key,
                                            innerCatId: key2
                                        });
                                    }}
                                    key={key2}
                                    style={{width: 'auto'}}>
										<Text
											style={{
												fontFamily: "Neuron-Bold",
												fontSize: 16,
												color: Colors.text,
												borderWidth: 2,
                                                borderColor: "#DCDCDC",
                                                borderRadius: 15,
                                                margin: 2,
                                                // justifyContent: 'center',
                                                lineHeight: 27,
                                                marginBottom: 10,
                                                paddingLeft: 5,
                                                paddingRight: 5,
                                                height: 30
                                                
											}}
										>
											{item.cats[key2].name.toUpperCase()}
										</Text>
									</TouchableOpacity>
								);
						  })
                        : null}
                    </View>
				</View>
			);
		});

		return (
			<SafeAreaView style={appStyles.page}>
				<View
					style={{
						paddingLeft: 25,
						paddingRight: 25,
                        paddingTop: 30,
                       
					}}
				>
					<TouchableOpacity
                        style={{ marginLeft: 'auto' , marginBottom: 30}}
						onPress={() => {
							this.props.navigation.dispatch(
								DrawerActions.closeDrawer()
							);
						}}
					>
						<Image
							style={{ width: 20.91, height: 18.98 }}
							source={require("../img/ico-menu-close.png")}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate("Catalog", {
								catId: 123
							});
						}}
					></TouchableOpacity>
                    {/*  */}
                    <ScrollView>
                    {menu}
                    </ScrollView>
				</View>
			</SafeAreaView>
		);
	}
}
