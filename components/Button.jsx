import { StyleSheet, View, Pressable, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Button({ label, theme , onPress}) {
  const isPrimary = theme === 'primary';

  return (
    <View style={styles.buttonContainer}>
      <Pressable 
        style={[
          styles.button,
          isPrimary ? styles.primaryButton : styles.defaultButton,
        ]}
        onPress={onPress} 
      >
        {isPrimary && (
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
        )}
        <Text style={[styles.buttonLabel, isPrimary && styles.primaryButtonLabel]}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: '#3d79d1', //azul para boton primario
  },
  defaultButton: {
    backgroundColor: '#a9cba6', // Color por defecto
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  primaryButtonLabel: {
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: 8,
  },
});
