import React from "react";
import {
    View,
    Text,
    Button,
    Image,
    AppRegistry,
    TouchableHighlight,
    StyleSheet
} from "react-native";
import Counter from "./Counter";
import Colors from "../constants/Colors.js"

interface State {
    count: number;
}

export default class CategorySlider extends React.Component<any , State> {
    constructor(props) {
        super(props);
        this.state = { 
            count: 0 
        };
        this.onChange = this.onChange.bind(this);
        this.addToFavorite = this.addToFavorite.bind(this);
    }

    addToFavorite = () => {
        this.setState({
            // count: this.state.count + 1
        });
    };
    onChange(number, type){
        // console.log('number, type' ,number, type)
        this.props.basketApi( {
            action: 'setProduct' , 
            params: { 
                productId : this.props.id,
                count: number 
            }
        });
        
        
    }
    render() {
        return (
            <View style={styles.box}>
                <Image
                    style={styles.img}
                    source={{ uri: "https://subexpress.ru/" + this.props.img }}
                />
                <View
                    style={{
                        flex: 1,
                        alignItems: "flex-start",
                        justifyContent: "flex-start"
                        // flexDirection: "row"
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            flexDirection: "row"
                        }}
                    >
                        <Text style={{flexGrow: 1}}>{this.props.name}</Text>
                        <TouchableHighlight onPress={this.addToFavorite}>
                            <Image
                                style={{ width: 20, height: 17.67 }}
                                source={require("../img/favorite-active.png")}
                            />
                        </TouchableHighlight>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexGrow: 1,

                            alignItems: "flex-end",
                            justifyContent: "flex-end",
                            flexDirection: "row"
                        }}
                    >
                        <Text style={{color: Colors.assent , fontWeight: 'bold', flexGrow: 1,}}>{this.props.price} руб. </Text>  
                        <Counter
                            onChange={this.onChange}
                            value={this.state.count}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "row",
        backgroundColor: "red",
        marginLeft: 40,
        paddingBottom: 5,
        paddingTop: 5,
        position: 'absolute',
        top: 0,
        zIndex: 22,
        // paddingLeft: 15,
        // paddingRight: 15,
        // width: '100%',


        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        marginTop: 5
    },
    img: {
        width: 100,
        borderRadius: 10,
        height: 100,
        marginLeft: -40
    },
    countContainer: {
        alignItems: "center",
        padding: 10
    },
    countText: {
        color: "#FF00FF"
    }
});
AppRegistry.registerComponent("subexpress", () => CategorySlider);
