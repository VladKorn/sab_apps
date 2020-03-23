import React from "react";
import {
    View,
    Text,
    Button,
    Image,
    AppRegistry,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet
} from "react-native";
import Counter from "./Counter";
import Colors from "../constants/Colors.js";

interface State {
    count: number;
}

export default class ProductItemOrder extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        this.onChange = this.onChange.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }
    deleteProduct() {
        this.props.basketApi({
            action: "setProduct",
            params: {
                productId: this.props.id,
                count: 0
            }
        });
    }
    onChange(number, type) {
        // console.log('number, type' ,number, type)
        this.props.basketApi({
            action: "setProduct",
            params: {
                productId: this.props.id,
                count: number
            }
        });
    }
    render() {
        return (
            <View style={styles.box}>
                <TouchableOpacity
                    style={{
                        // flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        width: 25,
                        height: "100%",
                        marginRight: 10
                    }}
                    onPress={this.deleteProduct}
                >
                    <Image
                        style={{

                        }}
                        source={require("../img/ico-delete.png")}
                    />
                </TouchableOpacity>
                <Image
                    style={styles.img}
                    source={{ uri: "https://subexpress.ru/" + this.props.img }}
                />
                <View
                    style={{
                        flex: 1,
                        height: 80,
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        // flexDirection: "row"
                        // backgroundColor: "red",
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            flexDirection: "row",
                            

                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: "Neuron-Bold",
                                color: "#666774",
                                maxWidth: 150
                            }}
                        >
                            {this.props.name}
                        </Text>
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
                        <Text
                            style={{
                                color: "#666774",
                                fontFamily: "Neuron-Heavy",
                                fontSize: 18,
                                flexGrow: 1
                            }}
                        >
                            {this.props.price} руб.
                        </Text>
                        <Counter
                            mode="v"
                            onChange={this.onChange}
                            InitialValue={this.props.count}
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
        backgroundColor: "#ffffff",
        paddingBottom: 15,
        paddingTop: 15,
        borderBottomColor: "#E2E2E2",
        borderBottomWidth: 1
    },
    img: {
        width: 100,
        borderRadius: 10,
        height: 100,
        marginRight: 15,
        alignSelf: 'center',
    },
    countContainer: {
        alignItems: "center",
        padding: 10
    },
    countText: {
        color: "#FF00FF"
    }
});
AppRegistry.registerComponent("Subexpress", () => ProductItemOrder);
