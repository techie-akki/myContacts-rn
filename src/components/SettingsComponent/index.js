import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import colors from '../../assets/theme/colors';
import styles from './styles';
import AppModal from '../Common/AppModal';
import Icon from '../Common/Icon';

const SettingsComponent = ({
    settingsOptions,
    setModalVisible,
    modalVisible,
    preferenceArray,
}) => {
    return (
        <>
        <AppModal
            modalVisible={modalVisible}
            closeOnTouchOutside={false}
            modalBody={
                <View>
                    {preferenceArray.map(({name, selected, onPress}) => (
                        <View>
                            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',paddingVertical:5}} onPress={onPress}>
                                {selected && <Icon name='check' size={17}/> }
                                <Text style={{paddingLeft: selected ? 15 : 30,fontSize:17}}>{name}</Text>
                            </TouchableOpacity>
                        </View>
                        
                    ))}
                </View>
            }
            modalFooter={<></>}
            title='Sort by'
            setModalVisible={setModalVisible}
        />

        <ScrollView style={{backgroundColor: colors.white}}>
            {settingsOptions.map(({title, subtitle, onPress}) => (
                <TouchableOpacity key={title} onPress={onPress}>
                    <View style={styles.item}>
                        <Text style={styles.title}>{title}</Text>
                        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                    </View>
                    <View style={{height: 0.5, backgroundColor: colors.grey}}/>
                </TouchableOpacity>
        ) )}
        </ScrollView>
        </>
    )
}

export default SettingsComponent;
