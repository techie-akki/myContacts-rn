import { StyleSheet } from "react-native";
import colors from "../../assets/theme/colors";

export default StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: colors.white,
    },
    imageView: {
        width:150,
        height:150,
        alignSelf: 'center',
        borderRadius: 100,   
    },
    chooseText: {
        color: colors.primary,
        textAlign: 'center',
    },
    switchText: { 
        flexDirection:'row',
        paddingVertical:10,
        justifyContent:'space-between',
        alignItems:'center',
    },
})