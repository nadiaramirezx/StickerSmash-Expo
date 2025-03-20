import { StyleSheet, View } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import ImageViewer from '../../components/ImageViewer';
import Button from '../../components/Button';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import IconButton from '../../components/IconButton';
import CircleButton from '../../components/CircleButton';
import EmojiPicker from '../../components/EmojiPicker';
import EmojiList from '../../components/EmojiList';
import EmojiSticker from '../../components/EmojiSticker';
import { captureRef } from 'react-native-view-shot';

const PlaceholderImage = require('../../assets/images/background-image.png');

export default function Index() {
  const imageRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(undefined);
  const [isEditing, setIsEditing] = useState(false); // Nuevo estado para controlar la edición

 // Solicitar permisos al cargar el componente
 useEffect(() => {
  (async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos necesarios', 'Se necesitan permisos para guardar imágenes en la galería.');
    }
  })();
}, []);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, // Permite editar la imagen
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
      setIsEditing(true); // Activa el modo de edición
    } else {
      alert('No se seleccionó una imagen');
    }
  };

  const onCancelEdit = () => {
    setSelectedImage(undefined); // Restablece la imagen seleccionada
    setIsEditing(false); // Desactiva el modo de edición
  };

  const onConfirmEdit = () => {
    setIsEditing(false); // Desactiva el modo de edición
    setShowAppOptions(true); // Muestra las opciones de la aplicación
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert('Saved!');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View ref={imageRef}  style={{flex: 1}}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        )}
      </View>

      {isEditing ? ( // Si está en modo de edición
        <View style={styles.footerContainer}>
          <Button
            label="Cancelar"
            theme="secondary"
            onPress={onCancelEdit}
          />
          <Button
            label="Escoger foto"
            theme="primary"
            onPress={onConfirmEdit}
          />
        </View>
      ) : showAppOptions ? ( // Si no está en modo de edición y las opciones están visibles
        <View style={styles.optionContainer}>
          <View style={styles.optionRow}>
            <IconButton icon="refresh" label="Reiniciar" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Guardar" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : ( // Si no está en modo de edición y las opciones no están visibles
        <View style={styles.footerContainer}>
          <Button
            label="Escoje una foto"
            theme="primary"
            onPress={pickImageAsync}
          />
          <Button
            label="Usar esta foto"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
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
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 0.33,
  },
  optionContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  
});