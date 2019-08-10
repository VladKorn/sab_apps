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
    breadCrumbs:{

    }
});

export default appStyles ;
