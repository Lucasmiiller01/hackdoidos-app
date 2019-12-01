import React from 'react'
import { Image } from 'react-native'
import PhotoUpload from 'react-native-photo-upload'

export default ({ }) => {

    return (
        <PhotoUpload
            photoPickerTitle="Escolha uma opção"
            onPhotoSelect={avatar => {
                if (avatar) {
                    console.log('Image base64 string: ', avatar)
                }
            }}
            quality={50}
        >
            <Image
                style={{
                    paddingVertical: 30,
                    width: 150,
                    height: 150,
                    borderRadius: 75
                }}
                resizeMode='cover'
                source={{
                    uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                }}
            />
        </PhotoUpload>

    );
};
