import { StyleSheet , Platform} from "react-native";
import Colors from "../constants/Colors.js";


const appStyles = StyleSheet.create({
    page:{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    text:{
        fontSize: 20,
        fontFamily: 'Neuron',
        color: "#666774"
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
        borderBottomColor: '#E2E2E2',
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%',
        maxWidth: 230,
        height: 40,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666774',
        marginTop: 5,
        marginBottom: 15,
        borderColor: Colors.assent,
        // borderBottomWidth: 5,
        borderBottomWidth: 3
    },
    inputFocus:{
        borderBottomColor: Colors.assent,
        borderBottomWidth: 5

    },
    inputError:{
        borderBottomColor: 'red',

    },
    hr:{
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 1,
        width: '100%',
        maxWidth: 336,
        marginTop: 15,
        marginBottom: 15

    },
    button:{
        backgroundColor: Colors.assent,
        height: 60, 
        minWidth: 290,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,

    },
    buttonText:{
        color: "#666774",
        fontSize: 20,
        fontFamily: 'Segoe'
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
