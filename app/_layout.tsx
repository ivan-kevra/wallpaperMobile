import {Stack} from 'expo-router';
import React from 'react';

const Layout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="home/index" options={{headerShown: false}} />
    </Stack>
  );
};

export default Layout;
