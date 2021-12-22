import { StyleSheet } from "react-native";
import colors from "../../assets/theme/colors";

export default StyleSheet.create({
    item: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 17,
    },
    subtitle: {
        fontSize: 14,
        color: colors.grey,
        paddingTop: 5,
    }
})