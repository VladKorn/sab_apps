import React from "react";
import { View, Text , ScrollView} from "react-native";
import Colors from "../constants/Colors.js";
import appStyles from "./appStyles";
import HistoryListItem from "./HistoryListItem";
import Loading from "./Loading";

interface State {
	items: object;
	active: Array<number>;
	week: Array<number>;
	month: Array<number>;
    year: Array<number>;
    isLoading: boolean;
}
export default class SidebarCatalog extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			items: {},
			active: [],
			week: [],
			month: [],
            year: [],
            isLoading: true,
		};
	}
	static navigationOptions = {
		title: "Заказы"
	};
	componentDidMount() {
		fetch(`https://subexpress.ru/apps_api/?get=orders&user=${this.props.screenProps.user.id}`)
			.then(res => res.json())
			.then(res => {
				this.setState({
					items: res.orders.all,
					active: res.orders.active,
					week: res.orders.week,
					month: res.orders.month,
                    year: res.orders.year,
                    isLoading: false
				});
				// console.log("news", res);
			});
    }
	render() {
        if(this.state.isLoading){
            return <Loading></Loading>
        }
		return (
			<ScrollView>
                <View style={{
                    backgroundColor: Colors.lightgray,
                    ...appStyles.paddings
                }}>
				    <Text style={appStyles.sectTitle}>Активные заказы</Text>
                    <View>
                        {this.state.active ? this.state.active.map(id=>{
                            const item = this.state.items[id];
                            return(
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
                                    navigation={this.props.navigation}
                                    basketApi={this.props.screenProps.basketApi}
                                    
                                />
                           )
                        }): null}
                    </View>
                </View>
                <View style={{...appStyles.paddings}}>
				    <Text style={appStyles.sectTitle}>История заказов</Text>
				    <Text style={{fontFamily: 'Neuron-Bold', fontSize: 16 ,color: '#B8B8B8', marginBottom: 10, marginTop: 15}}>На прошлой неделе</Text>
                    <View>
                        {this.state.week ? this.state.week.map(id=>{
                            const item = this.state.items[id];
                            return(
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
                                    navigation={this.props.navigation}
                                    basketApi={this.props.screenProps.basketApi}
                                    
                                />
                           )
                        }): null}
                    </View>
                    <Text style={{fontFamily: 'Neuron-Bold', fontSize: 16 ,color: '#B8B8B8', marginBottom: 10, marginTop: 15}}>В прошлом месяце</Text>
                    <View>
                        {this.state.month ? this.state.month.map(id=>{
                            const item = this.state.items[id];
                            return(
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

                                    navigation={this.props.navigation}
                                    basketApi={this.props.screenProps.basketApi}

                                    
                                />
                           )
                        }):null}
                    </View>
                    <Text style={{fontFamily: 'Neuron-Bold', fontSize: 16 ,color: '#B8B8B8', marginBottom: 10, marginTop: 15}}>В прошлом году</Text>
                    <View>
                        {this.state.year? this.state.year.map(id=>{
                            const item = this.state.items[id];
                            return(
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
                                    navigation={this.props.navigation}
                                    basketApi={this.props.screenProps.basketApi}
                                    
                                />
                           )
                        }): null}
                    </View>
                   
                </View>
               
			</ScrollView>
		);
	}
}
