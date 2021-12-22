import React, { forwardRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import colors from '../../../assets/theme/colors';
import Icon from '../Icon';
import styles from './styles';
import ImagePickerCropper from 'react-native-image-crop-picker';

const ImagePicker = forwardRef(({onFileSelected}, ref) => {
    const options = [
        {
            name: "Capture from Camera",
            icon: <Icon name="camera" size={20} color={colors.grey}/>,
            onPress: ()=>{
                ImagePickerCropper.openCamera({
                    width: 300,
                    height: 300,
                    cropping: true,
                    freeStyleCropEnabled: true,
                })
                .then((images) => {
                    onFileSelected(images);
                })
                .catch((error) => {
                    console.log('error >> ',error);
                })
            },
        },
        {
            name: "Select from Gallery",
            icon: <Icon name="image" size={20} color={colors.grey}/>,
            onPress: () => {
                ImagePickerCropper.openPicker({
                    width: 300,
                    height: 300,
                    cropping: true,
                    freeStyleCropEnabled: true,
                })
                .then((images) => {
                    onFileSelected(images);
                })
                .catch((error) => {
                    console.log('error >> ',error);
                })
            },
        },
    ]
    return (
        <View>
        <RBSheet
            ref={ref}
            height={200}
            openDuration={250}
            dragFromTopOnly
            closeOnDragDown
            customStyles={{
                container: {
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                },
            }}
        >
            
            <View style={styles.optionsWrapper}>
                {options.map(({name, icon, onPress}) => (
                    <TouchableOpacity style={styles.pickerOption} key={name} onPress={onPress}>
                        {icon}
                        <Text style={styles.text}>{name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </RBSheet>
        </View>
        
    );
});

export default ImagePicker;
