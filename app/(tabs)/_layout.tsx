import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

  return (
     <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="doctors" options={{ title: 'Doctors' }} />
      <Tabs.Screen name="chat" options={{ title: 'Chat' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
