import React from "react";
import { View, Text, Button } from "react-native";

export default class News extends React.Component<any> {
    static navigationOptions = {
        title: "Новости"
    };
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text>News {this.props.screenProps.asd}</Text>
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate("Home")}
                />
            </View>
        );
    }
}
