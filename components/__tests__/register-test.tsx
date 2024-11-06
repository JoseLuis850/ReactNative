import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Register from '../../app/register';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('Register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<Register />);
    
    expect(screen.getByPlaceholderText('Correo electrónico')).toBeTruthy();
    expect(screen.getByPlaceholderText('Nombre de usuario')).toBeTruthy();
    expect(screen.getByPlaceholderText('Contraseña')).toBeTruthy();
    expect(screen.getByPlaceholderText('Confirme su contraseña')).toBeTruthy();
    expect(screen.getByText('Registrarse')).toBeTruthy();
  });

  it('validates required fields', () => {
    render(<Register />);
    
    const registerButton = screen.getByText('Registrarse');
    fireEvent.press(registerButton);
    
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Todos los campos son obligatorios');
  });

  it('validates email format', () => {
    render(<Register />);
    
    fireEvent.changeText(screen.getByPlaceholderText('Correo electrónico'), 'correoInvalido');
    fireEvent.changeText(screen.getByPlaceholderText('Nombre de usuario'), 'usuario');
    fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'Password1!');
    fireEvent.changeText(screen.getByPlaceholderText('Confirme su contraseña'), 'Password1!');
    fireEvent.press(screen.getByText('Registrarse'));
    
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Por favor ingrese un correo electrónico válido');
  });

  it('validates password strength', () => {
    render(<Register />);
    
    fireEvent.changeText(screen.getByPlaceholderText('Correo electrónico'), 'correo@valido.com');
    fireEvent.changeText(screen.getByPlaceholderText('Nombre de usuario'), 'usuario');
    fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'contraseña');
    fireEvent.changeText(screen.getByPlaceholderText('Confirme su contraseña'), 'contraseña');
    fireEvent.press(screen.getByText('Registrarse'));
    
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial');
  });

  it('validates matching passwords', () => {
    render(<Register />);
    
    fireEvent.changeText(screen.getByPlaceholderText('Correo electrónico'), 'correo@valido.com');
    fireEvent.changeText(screen.getByPlaceholderText('Nombre de usuario'), 'usuario');
    fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'Password1!');
    fireEvent.changeText(screen.getByPlaceholderText('Confirme su contraseña'), 'Password2!');
    fireEvent.press(screen.getByText('Registrarse'));
    
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Las contraseñas no coinciden');
  });

  it('submits the form successfully', () => {
    render(<Register />);
    
    fireEvent.changeText(screen.getByPlaceholderText('Correo electrónico'), 'correo@valido.com');
    fireEvent.changeText(screen.getByPlaceholderText('Nombre de usuario'), 'usuario');
    fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'Password1!');
    fireEvent.changeText(screen.getByPlaceholderText('Confirme su contraseña'), 'Password1!');
    fireEvent.press(screen.getByText('Registrarse'));
    
    expect(Alert.alert).not.toHaveBeenCalled();
    console.log('Login exitoso');
  });
});
