import React from "react";
import {
    View,
    Text,
    Image,
    AppRegistry,
    SafeAreaView,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import Counter from "./Counter";
import Colors from "../constants/Colors.js";
import appStyles from "./appStyles";
import ImageSlider from "react-native-image-slider";

interface State {
    currentProduct: number;
    currentIndex: number;
    slides: Array<object>;
    catName: string;
}

export default class CategorySlider extends React.Component<any, State> {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            currentProduct: this.props.navigation.state.params.id,
            currentIndex: 0,
            slides: [],
            catName: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onPositionChanged = this.onPositionChanged.bind(this);
    }

    addToFavorite = () => {
        this.setState({
            // count: this.state.count + 1
        });
    };
    onChange(number, type) {
        // console.log('number, type' ,number, type)
        this.props.screenProps.basketApi({
            action: "setProduct",
            params: {
                productId: this.state.currentProduct,
                count: number
            }
        });
    }
    onPositionChanged(index) {
        console.log("onPositionChanged", index);

        this.setState({ currentIndex: index });
    }
    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{ item.title }</Text>
            </View>
        );
    }
    componentDidMount() {
        const catId = this.props.screenProps.products[this.state.currentProduct]
            .categoryId;
        const catName = this.props.screenProps.catalog[catId].name;
        const slides = [];

        console.log("this.props.screenProps.products", catId);
        this.props.screenProps.catalog[catId].products.map(key => {
            const item = this.props.screenProps.products[key];
            slides.push(item);
        });
        this.setState({ slides: slides, catName: catName });
    }
    render() {
        // console.log('navigation' ,JSON.stringify( this.props.navigation  ))
        // console.log(this.props.screenProps.catalog.cats[this.props.screenProps.products[this.state.currentProduct].categoryId] )

        const isFavorite = true;
        return (
            <SafeAreaView>
                <View style={styles.topBar}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                    >
                        <Image
                            source={require("../img/ico-close.png")}
                            style={{ width: 20.91, height: 18.98 }}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: "Neuron", fontSize: 24 }}>
                        {this.state.catName} {this.state.currentIndex + 1} /
                        {this.state.slides.length + 1}
                    </Text>
                    <TouchableHighlight
                        onPress={this.addToFavorite}
                        underlayColor="white"
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: 30,
                            height: 30,
                            marginLeft: "auto"
                        }}
                    >
                        <Image
                            style={{ width: 20, height: 17.67 }}
                            source={
                                isFavorite
                                    ? require("../img/favorite-active.png")
                                    : require("../img/favorite.png")
                            }
                        />
                    </TouchableHighlight>
                </View>
                <View style={styles.sliderWrap}>
                    <ImageSlider
                        images={this.state.slides}
                        // position={4}
                        onPositionChanged={this.onPositionChanged}
                        customSlide={({ index, item, style, width }) => (
                            // It's important to put style here because it's got offset inside
                            <View
                                key={index}
                                style={[style, styles.customSlide]}
                            >
                                <Image
                                    source={{
                                        uri: "https://subexpress.ru" + item.img
                                    }}
                                    style={styles.customImage}
                                />
                                <View style={{ flex: 1, width: "100%" }}>
                                    <View
                                        style={[appStyles.shadow, styles.box]}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: "Neuron-Heavy",
                                                fontSize: 26,
                                                color: Colors.gray
                                            }}
                                        >
                                            {item.name.replace('&quot;' , "\"").replace('&quot;' , "\"")}
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                paddingTop: 7
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: "Neuron-Heavy",
                                                    fontSize: 28,
                                                    color: Colors.assent
                                                }}
                                            >
                                                {item.price} руб.
                                            </Text>
                                            <Counter
                                                onChange={this.onChange}
                                                value={0}
                                            />
                                        </View>
                                    </View>
                                    <View style={{width: '70%' , alignSelf: 'center',marginTop: 20}}>
                                        <Text>Состав: {item.text.replace('&quot;' , "\"").replace('&quot;' , "\"").replace('<br />' , "")}</Text> 
                                        <Text>Вес НЕТТО: {item.weight} (+/- 5 гр.)</Text>
                                    </View>
                                    
                                </View>
                            </View>  
                        )}
                        customButtons={(position, move) => <View />}
                    />
                </View> 
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    customSlide: {
        backgroundColor: "white",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    customImage: {
        width: "100%",
        height: 270
    },
    topBar: {
        // flex: 1,
        // justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15,
        alignItems: "center",
        height: 72,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E2E2"
    },
    sliderWrap: {
        height: "100%"

        // flex: 1
    },
    box: {
        // flex: 1,
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: -35,
        padding: 20,
        // marginLeft: 35,
        // marginRight: 35,
        alignSelf: "center"
    }
});
AppRegistry.registerComponent("subexpress", () => CategorySlider);
