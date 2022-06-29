import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet , TextInput} from "react-native";
import PropTypes from "prop-types";
import Colors from "../constants/colors"

export default class Counter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number: parseInt(this.props.InitialValue),
            isInitial: this.props.mode === 'v' || parseInt(this.props.InitialValue)>0 ? false : true
            // isInitial: false 
        };

        // bind functions..
        this.onPressMinus = this.onPressMinus.bind(this);
        this.onPressPlus = this.onPressPlus.bind(this);
        this.setValue = this.setValue.bind(this);
	}
    setValue(value){
        this.setState({number: value});
    }
    onPressMinus() {
        const { number } = this.state;
        const minusNumber = number - 1;

        if (number == this.props.min) {
            return;
        }

        return this.setState({ number: minusNumber }, () =>
            this.props.onChange(minusNumber, "-")
        );
    }

    onPressPlus() {
        const { number } = this.state;
        const plusNumber = number + 1;

        if (number == this.props.max) {
            return;
        }

        return this.setState({ number: plusNumber }, () =>{

            this.props.onChange(plusNumber, "+")
        }
        );
    }

    renderMinusButton() {
        const {
            min,
            touchableDisabledColor,
            touchableColor,
            minusIcon
        } = this.props;
        const isMinusDisabled = min == this.state.number;
        const buttonStyle = {
            borderColor: isMinusDisabled ? touchableDisabledColor : touchableColor
        };

        return (
            <TouchableOpacity
                style={[this.props.mode === 'v' ? Styles.touchable_v : Styles.touchable_minus, buttonStyle ]}
                onPress={this.onPressMinus}
                activeOpacity={isMinusDisabled ? 0.9 : 0.2}
            >
                {this.props.minusIcon ? (
                    this.props.minusIcon(
                        isMinusDisabled,
                        touchableDisabledColor,
                        touchableColor
                    )
                ) : (
                    <Text
                    
                        style={[
                            Styles.iconText,
                            {
                                color: this.props.mode === 'v' ? Colors.gray : '#DCDCDC'
                            }
                        ]}
                    >
                        -
                    </Text>
                )}
            </TouchableOpacity>
        );
    }

    renderPlusButton() {
        const {
            max,
            touchableDisabledColor,
            touchableColor,
            plusIcon
        } = this.props;
        const isPlusDisabled = max == this.state.number;
       

        return (
            <TouchableOpacity
                style={[this.props.mode === 'v' ? Styles.touchable_v : this.state.number > 0 ? Styles.touchable_active : Styles.touchable]}
                onPress={this.onPressPlus}
                activeOpacity={isPlusDisabled ? 0.9 : 0.2}
            >
                {this.props.plusIcon ? (
                    this.props.plusIcon(
                        isPlusDisabled,
                        touchableDisabledColor,
                        touchableColor
                    )
                ) : (
                    <Text
                        style={[
                            Styles.iconText,
                            {
                                color: this.props.mode === 'v'|| !this.state.number > 0 ? Colors.gray : '#ffffff'
                            }
                        ]}
                    >
                        +
                    </Text>
                )}
            </TouchableOpacity>
        );
    }
    render() {
        const { number } = this.state;
        // console.log('render');
        return (
            <View style={this.props.mode === 'v' ? Styles.container_v : Styles.container}>
                <View>{!this.state.isInitial ? this.renderMinusButton() : null}</View>
                {!this.state.isInitial ? 
                <View style={Styles.number}>

                    <TextInput
                        style={this.props.mode === 'v' ? Styles.text_v: Styles.text }
                        keyboardType="numeric"
                        onChangeText={(number) => { 
                            let value = parseInt(number) || 0;
                            if(value>999){value = 999}
                            this.setState({number: value});
                                if(value !== 0){
                                    this.props.onChange(value, "+");
                                }
                            }
                        }
                        value={`${this.state.number}`}
                    />
                </View> : null }
                <View>{this.renderPlusButton()}</View>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    container_v: {
        flexDirection: "column",
        borderColor: Colors.gray,
        borderRadius: 50,
        borderWidth: 1,
        height: 78

    },

    text: {
        height: 30, width: 30, textAlign: "center", fontFamily: 'Neuron-Heavy', fontSize: 18, color: '#666774'
    },
    text_v: {
        height: 25, width: 30, textAlign: "center", fontFamily: 'Neuron-Heavy', fontSize: 18, color: '#666774'
    },

    iconText: {
        fontSize: 22,
        marginTop: -3,
    },

    number: {
        minWidth: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    touchable_minus:{
        width: 40,
        height: 40,
        borderRadius: 100,
        borderWidth: 1,
        backgroundColor: 'white',
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    touchable: {
        width: 40,
        height: 40,
        borderRadius: 100,
        borderColor: '#DCDCDC',
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center"
    },

    touchable_v: {
        width: 40,
        height: 26,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    touchable_active: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: Colors.assent,
        alignItems: "center",
        justifyContent: "center"
    },
});

Counter.propTypes = {
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func,

    textColor: PropTypes.string,
    touchableColor: PropTypes.string,
    touchableDisabledColor: PropTypes.string,


    minusIcon: PropTypes.func,
    plusIcon: PropTypes.func
};

Counter.defaultProps = {
    value: 0,
    min: 0,
    max: 999,
    onChange(number, type) {
        // Number, - or +
    },

    textColor: "#196583",
    touchableColor: "#ffffff",
    touchableDisabledColor: "#ffffff",

    minusIcon: null,
    plusIcon: null
};