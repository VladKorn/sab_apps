import React from "react";
import {
    View,
    Text,
    Image,
    AppRegistry,
    SafeAreaView,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from "react-native";
import Counter from "./Counter";
import Colors from "../constants/Colors.js";
import appStyles from "./appStyles";
import ImageSlider from "react-native-image-slider";
import Carousel from "react-native-looped-carousel";

interface State {
    currentProduct: number;
    currentIndex: number;
    catId: number;
    
    slides: Array<object>;
    catName: string;
    size: object;
}
const { width, height } = Dimensions.get("window");
export default class CategorySlider extends React.Component<any, State> {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            currentProduct: parseInt(this.props.navigation.state.params.id),
            currentIndex: 0,
            catId: 0,
            slides: [],
            catName: "",
            size: { width, height }
        };
        this.onChange = this.onChange.bind(this);
        this.onPositionChanged = this.onPositionChanged.bind(this);
        this._renderSlides = this._renderSlides.bind(this);
    }
    _onLayoutDidChange = e => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    };
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


        // this.setState({ currentIndex: index });
    }
    componentWillMount(){
        const catId = this.props.screenProps.products[this.state.currentProduct]
            .categoryId;
        const productIndex = this.props.screenProps.catalog[catId].products.indexOf(this.state.currentProduct);
        // .indexOf(this.state.currentProduct)
        this.setState({ currentIndex: productIndex , catId : catId});
        const catName = this.props.screenProps.catalog[catId].name;
        const slides = [];

        console.log("this.props.screenProps.products", catId);
        this.props.screenProps.catalog[catId].products.map(key => {
            const item = this.props.screenProps.products[key];
            slides.push(item);
        });
        this.setState({ slides: slides, catName: catName });
    }
    componentDidMount() {
    }
    _renderSlides() {
        return this.state.slides.map((item, index) => {
            return (
                <View key={index} style={this.state.size}>
                    <Image
                        source={{
                            uri: "https://subexpress.ru" + item.img
                        }}
                        style={styles.customImage}
                    />
                    <View style={{ flex: 1, width: "100%" }}>
                        <View style={[appStyles.shadow, styles.box]}>
                            <Text
                                style={{
                                    fontFamily: "Neuron-Heavy",
                                    fontSize: 26,
                                    color: Colors.gray
                                }}
                            >
                                {item.name
                                    .replace("&quot;", '"')
                                    .replace("&quot;", '"')}
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
                                <Counter onChange={this.onChange} value={0} />
                            </View>
                        </View>
                        <View
                            style={{
                                width: "70%",
                                alignSelf: "center",
                                marginTop: 20
                            }}
                        >
                            <Text>
                                Состав:{" "}
                                {item.text
                                    .replace("&quot;", '"')
                                    .replace("&quot;", '"')
                                    .replace("<br />", "")}
                            </Text>
                            <Text>Вес НЕТТО: {item.weight} (+/- 5 гр.)</Text>
                        </View>
                    </View>
                </View>
            );
        });
    }

    render() {
        // console.log('navigation' ,JSON.stringify( this.props.navigation  ))
        // console.log(this.props.screenProps.catalog.cats[this.props.screenProps.products[this.state.currentProduct].categoryId] )
        console.log('render')
        const isFavorite = true;
        return (
            <SafeAreaView>
                {/* <View style={styles.topBar}>
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
                </View> */}
                <View style={styles.sliderWrap}>
                    <View
                        style={{ flex: 1 }}
                        onLayout={this._onLayoutDidChange}
                    >
                        {this.state.slides ? (
                            <Carousel
                                //   delay={2000}
                                style={this.state.size}
                                autoplay={false}
                                pageInfo={true}
                                isLooped={false}
                                // currentPage={this.state.currentIndex}
                                // onAnimateNextPage={p => this.onPositionChanged(p)}
                            >
                                {this._renderSlides()}
                                {/* <View></View> */}
                            </Carousel>
                        ) : null}
                    </View>
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
