import React from 'react';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import UpdateDetail from '../src/pages/update';

describe('Update', () => {
  jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  }));
  const mockRoute = {
    params: {
      listData: {
        firstName: 'x',
        lastName: 'x',
        age: 33,
        photo:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    },
  };

  it('should render header correctly', () => {
    const {getByText} = render(
      <NavigationContainer>
        <UpdateDetail route={mockRoute} />
      </NavigationContainer>,
    );

    expect(getByText('X')).toBeTruthy();
    expect(getByText('Change Contacts')).toBeTruthy();
  });
});
