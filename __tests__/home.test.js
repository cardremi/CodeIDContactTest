import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Home from '../src/pages/home';
import {NavigationContainer} from '@react-navigation/native';

describe('Home', () => {
  jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  }));

  it('should render list of categories', () => {
    const {getByText} = render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>,
    );
    expect(getByText('Contacts')).not.toBeNull();
  });

  it('should close modal when Close button is pressed', () => {
    const {getByText, getByTestId} = render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>,
    );
    const floatingButton = getByTestId('floating-button');
    fireEvent.press(floatingButton);
  });
});
