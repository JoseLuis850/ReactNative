import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Index from '../../app/index';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('Index', () => {
  it('renders correctly', () => {
    render(<Index />);
    
    expect(screen.getByPlaceholderText('Ingrese su correo')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingrese su contraseña')).toBeTruthy();
    expect(screen.getByText('Iniciar sesión')).toBeTruthy();
    expect(screen.getByText('Registrarse')).toBeTruthy();
    expect(screen.getByTestId('icon-image')).toBeTruthy();
  });

  it('validates email', () => {
    render(<Index />);
    
    const emailInput = screen.getByPlaceholderText('Ingrese su correo');
    const passwordInput = screen.getByPlaceholderText('Ingrese su contraseña');
    const loginButton = screen.getByText('Iniciar sesión');
    
    fireEvent.changeText(passwordInput, 'Password1!');
    fireEvent.changeText(emailInput, 'emailInvalido');
    fireEvent.press(loginButton);
    
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Por favor ingrese un correo electrónico válido'
    );
  });

  it('validates password', () => {
    render(<Index />);
    
    const emailInput = screen.getByPlaceholderText('Ingrese su correo');
    const passwordInput = screen.getByPlaceholderText('Ingrese su contraseña');
    const loginButton = screen.getByText('Iniciar sesión');
    
    fireEvent.changeText(emailInput, 'correo@valido.com');
    fireEvent.changeText(passwordInput, 'pass');
    fireEvent.press(loginButton);
    
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial'
    );
  });

  it('submit the form', () => {
    render(<Index />);
    
    const emailInput = screen.getByPlaceholderText('Ingrese su correo');
    const passwordInput = screen.getByPlaceholderText('Ingrese su contraseña');
    const loginButton = screen.getByText('Iniciar sesión');
    
    fireEvent.changeText(emailInput, 'correo@valido.com');
    fireEvent.changeText(passwordInput, 'Password1!');
    fireEvent.press(loginButton);
    
    expect(Alert.alert).toHaveBeenCalledWith('Éxito', 'Login exitoso');
  });
});
