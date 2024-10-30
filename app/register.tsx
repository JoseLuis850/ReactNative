import React, { useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { useRouter } from "expo-router";


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

const MainContainer = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 20px;
    `;

    export default function Register() {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [username, setUsername] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const router = useRouter();
      
        const validatePassword = (password: string) => {
          const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
          return regex.test(password);
        };
      
        const validateEmail = (email: string) => {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(email);
        };
      
        const handleLogin = () => {
            if (username === '' || email === '' || password === '' || confirmPassword === '') {
              console.warn('Todos los campos son obligatorios');
              Alert.alert('Error', 'Todos los campos son obligatorios');
            } else if (!validateEmail(email)) {
              console.warn('Correo inválido:', email);
              Alert.alert('Error', 'Por favor ingrese un correo electrónico válido');
            } else if (!validatePassword(password)) {
              console.warn('Contraseña no válida:', password);
              Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial');
            } else if (password !== confirmPassword) {
              console.warn('Las contraseñas no coinciden');
              Alert.alert('Error', 'Las contraseñas no coinciden');
            } else {
              console.log('Login exitoso');
              router.push({
                pathname: '/',
              });
            }
          };
          
        return (
            <MainContainer>
                <Label>Registro</Label>

                <Label>Correo electrónico</Label>
                <Input
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Correo electrónico"
                />
                <Label>Nombre de usuario</Label>
                <Input
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Nombre de usuario"
                />
                <Label>Contraseña</Label>
                <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Contraseña"
                    secureTextEntry
                />
                <Label>Confirmar Contraseña</Label>
                <Input
                    placeholder="Confirme su contraseña"
                    secureTextEntry
                    value={confirmPassword}
                        onChangeText={setConfirmPassword}
                />
                <ButtonContainer>
                    <Button
                        title="Registrarse"
                        onPress={handleLogin}
                    />
                </ButtonContainer>
            </MainContainer>
        );
    }