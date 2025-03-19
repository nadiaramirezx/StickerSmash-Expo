import { StyleSheet,  View } from 'react-native';
import { useState } from 'react';
import ImageViewer from '../../components/ImageViewer';
import Button from '../../components/Button';
import * as ImagePicker from 'expo-image-picker';

const PlaceholderImage = require('../../assets/images/background-image.png');


export default function Index() {
  const[selectedImage, setSelectedImage] = useState(undefined);
  const pickImageAsync = async () => {  //funcion que se ejecuta cuando se presiona el boton
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:['images'],
      allowsEditing: true,  //true si se quiere editar la imagen
      quality: 1, //1 es la mejor calidad
    });

    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
    } else{
      alert('No se selecciono una imagen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage || PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button 
        label='Escoje una foto' 
        theme='primary'
        onPress={pickImageAsync}
        />
        <Button label='Usa una foto'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer:{
    flex:1,
  },
  footerContainer:{
    flex:0.33,
  }
});
