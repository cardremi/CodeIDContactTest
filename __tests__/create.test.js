import React from 'react';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import CreateContact from '../src/pages/create';

describe('Create', () => {
  jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  }));

  it('should render header correctly', () => {
    const {getByText} = render(
      <NavigationContainer>
        <CreateContact />
      </NavigationContainer>,
    );

    expect(getByText('X')).toBeTruthy();
    expect(getByText('Create Contacts')).toBeTruthy();
  });
});
