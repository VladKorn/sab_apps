import React from "react";
import {
    View,
    Text,
    Image,
    AppRegistry,
    SafeAreaView,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    Animated,
    Platform,
    Easing,
    StyleSheet
} from "react-native";
import Counter from "./Counter";
import Colors from "../constants/Colors.js";
import appStyles from "./appStyles";
import SwiperComponent from "./SwiperComponent";

interface State {
    currentProduct: number;
    currentIndex: number;
    catId: number;
    isZoom: boolean;
    slides: Array<object>;
    catName: string;
    size: object;
    count: number;
    isContentHidden: boolean;
    aminImg: any;
    opacityAnim: any;
    animTranslateY: any;
    isAnimationEnded: boolean;
}
const { width, height } = Dimensions.get("window");
const ANIMTIME = 200;


const IMGMIN = 333;
const IMGMAX = 500;
export default class CategorySliderItem extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            currentProduct: parseInt(this.props.navigation.state.params.id),
            currentIndex: 0,
            count: 0,
            isZoom: this.props.isZoom,
            size: { width, height },
            catId: 0,
            slides: [],
            catName: "",
            isAnimationEnded: true,
            isContentHidden: false,
            aminImg: new Animated.Value(200),
            opacityAnim: new Animated.Value(1),
            animTranslateY: new Animated.Value(200),
        };
        this.onChange = this.onChange.bind(this);
        this.onPositionChanged = this.onPositionChanged.bind(this);
        this.zoomToggle = this.zoomToggle.bind(this);
    }
    zoomToggle() {
       
        this.setState({
            isZoom: !this.state.isZoom,
            isContentHidden: false,
            isAnimationEnded: false
        });
        if (this.props.isZoom) {

            // this.props.zoom(false);

            Animated.timing(this.state.aminImg, {
                toValue: IMGMIN,
                duration: ANIMTIME
                // useNativeDriver: true,
            }).start();
            Animated.timing(this.state.opacityAnim, {
                useNativeDriver: true,
                toValue: 1,
                duration: ANIMTIME
            }).start();
            Animated.timing(this.state.animTranslateY, {
                useNativeDriver: true,
                toValue: 200,
                duration: ANIMTIME
            }).start( ()=>{
                this.setState({isAnimationEnded: true});
                this.props.zoom(false);
        } );
       
        } else {
            // this.props.zoom(true);

            Animated.timing(this.state.aminImg, {
                // useNativeDriver: true,
                toValue: IMGMAX,
                duration: ANIMTIME
            }).start();
            Animated.timing(this.state.opacityAnim, {
                useNativeDriver: true,
                toValue: 0,
                duration: ANIMTIME
            }).start();
            Animated.timing(this.state.animTranslateY, {
                useNativeDriver: true,
                toValue: 0,
                duration: ANIMTIME
            }).start(() => {
                this.setState({
                    isContentHidden: true,
                    isAnimationEnded: true
                });
                this.props.zoom(true);
            });
           
        }
    }

    onChange(number, type) {
        // console.log('number, type' ,number, type);
        this.setState({count: number});
        this.props.basketApi({
            action: "setProduct",
            params: {
                productId: this.state.currentProduct,
                count: number
            }
        });
    }
    onPositionChanged(index) {
        // console.log('onPositionChanged' , index);
        this.setState({ currentIndex: index });
    }
    render() {
        return (
            <View style={[this.state.size ,
                 this.state.isZoom ? { backgroundColor: "#F2F2F2" } : {}
            ]}>
                <TouchableWithoutFeedback onPress={this.zoomToggle}>
                    <Animated.Image
                        source={{
                            uri: "https://subexpress.ru" + this.props.item.img
                        }}
                        style={[
                            styles.customImage,
                            {
                                height: this.state.isAnimationEnded ? this.props.isZoom ? IMGMAX: IMGMIN : this.state.aminImg
                                  
                            }
                        ]}
                    />
                </TouchableWithoutFeedback>

                <Animated.View
                    style={[
                        { flex: 1, width: "100%" },
                        {
                            opacity: this.state.isAnimationEnded ? this.props.isZoom ? 0 : 1 : this.state.opacityAnim
                                
                        }
                    ]}
                >
                    <View
                        style={[
                            Platform.OS === 'ios' ? appStyles.shadow : this.state.isAnimationEnded ? appStyles.shadow : {},
                            styles.box
                        ]}
                    >
                        <Text
                            style={{
                                fontFamily: "Neuron-Heavy",
                                fontSize: 26,
                                color: Colors.gray
                            }}
                        >
                            {/* {this.props.item.id} */}
                            {this.props.item.name
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
                                {this.props.item.price} руб.
                            </Text>
                                <Counter
                                    onChange={this.onChange}
                                    InitialValue={this.state.count}
                                />
                            
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
                            {this.props.item.text
                                .replace("&quot;", '"')
                                .replace("&quot;", '"')
                                .replace("<br />", "")}
                        </Text>
                        <Text>
                            Вес НЕТТО: {this.props.item.weight} (+/- 5 гр.)
                        </Text>
                    </View>
                </Animated.View>

                <View
                    style={{
                        height: 150,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: "100%"
                    }}
                >
                    <Animated.View
                        style={{
                            // position: 'fixed',
                            bottom: 50,
                            transform: [
                                {
                                    translateY: this.state.isAnimationEnded ? this.props.isZoom ? 0 : 200: this.state.animTranslateY
                                }
                            ]
                        }}
                    >
                        <Counter onChange={this.onChange} InitialValue={this.state.count}  />
                    </Animated.View>
                </View>
            </View>
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
        minHeight: IMGMIN
    },
    topBar: {
        // flex: 1,
        // justifyContent: 'center',
        position: "absolute",
        width: "100%",
        zIndex: 3,
        top: 25,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
        alignItems: "center",
        // justifyContent: 'center',
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
AppRegistry.registerComponent("subexpress", () => CategorySliderItem);
