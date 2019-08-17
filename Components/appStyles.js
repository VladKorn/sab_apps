import { StyleSheet , Platform} from "react-native";
import Colors from "../constants/Colors.js";


const appStyles = StyleSheet.create({
    page:{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    sectTitle:{
        fontFamily: 'Neuron-Heavy',
        fontSize: 22,
        color: Colors.gray,
        // color: '#666774',
        marginTop: 25, 
        marginBottom: 5,
    },
    input:{
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
        paddingTop: 10,
        paddingBottom: 10,
    },
    buttonBottom:{
        backgroundColor: Colors.assent,
        color: 'white',
        width: '100%',
        height: 57,
        justifyContent: 'center',
        alignItems: 'center'

    },
    shadow:{
        marginTop: 100,
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
    breadCrumbs:{

    }
});

export default appStyles ;
