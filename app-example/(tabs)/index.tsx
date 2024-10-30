import React, { useState } from "react";
import { Alert } from "react-native";
import styled from 'styled-components/native';
import { useRouter } from "expo-router";


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const StyledImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const Label = styled.Text`
  align-self: flex-start;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  border: 2px solid gray;
  border-radius: 5px;
  margin-bottom: 10px;
  padding-left: 10px;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
`;

const Button = styled.Button`
`;

export default function Index() {
  const router = useRouter();
  const onPressLearnMore = () => {
    router.push({
      pathname: './register',
    })
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return regex.test(password);
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Todos los campos son obligatorios');
    } else if (!validateEmail(email)) {
      Alert.alert('Error', 'Por favor ingrese un correo electrónico válido');
    } else if (!validatePassword(password)) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial');
    } else {
      Alert.alert('Éxito', 'Login exitoso');
    }
  };

  return (
    <Container>
      <StyledImage source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }} />
      <Label>Correo electrónico</Label>
      <Input
        placeholder="Ingrese su correo"
        value={email}
        onChangeText={setEmail}
      />
      <Label>Contraseña</Label>
      <Input
        placeholder="Ingrese su contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
       <ButtonContainer>
        <Button title="Iniciar sesión" onPress={handleLogin} />
      </ButtonContainer>

      <ButtonContainer>
        <Button title="Registrarse" onPress={onPressLearnMore} color="#841584" accessibilityLabel="Register button"/>
      </ButtonContainer>
    </Container>
  );
}