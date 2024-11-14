import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, Linking, AsyncStorage } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [openCommand, setOpenCommand] = useState('1234GON##');
  const [holdOpenCommand, setHoldOpenCommand] = useState('1234GOT999#');
  const [closeCommand, setCloseCommand] = useState('1234GOFF##');

  useEffect(() => {
    const loadPhoneNumber = async () => {
      const savedPhoneNumber = await AsyncStorage.getItem('gsmPhoneNumber');
      if (savedPhoneNumber) {
        setPhoneNumber(savedPhoneNumber);
      }
    };
    loadPhoneNumber();
  }, []);

  const savePhoneNumber = async (number) => {
    await AsyncStorage.setItem('gsmPhoneNumber', number);
    setPhoneNumber(number);
  };

  const sendSMS = (command) => {
    if (!phoneNumber) {
      Alert.alert('Please enter the GSM module phone number.');
      return;
    }
    const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(command)}`;
    Linking.openURL(smsUrl);
  };

  return (
    <View>
      <Text>GSM Module Phone Number:</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={savePhoneNumber}
        placeholder="Enter GSM Module Phone Number"
      />
      <Button title="Open" onPress={() => sendSMS(openCommand)} />
      <Button title="Hold Open" onPress={() => sendSMS(holdOpenCommand)} />
      <Button title="Close" onPress={() => sendSMS(closeCommand)} />
    </View>
  );
};

const TemplateScreen = () => {
  const [openCommand, setOpenCommand] = useState('1234GON##');
  const [holdOpenCommand, setHoldOpenCommand] = useState('1234GOT999#');
  const [closeCommand, setCloseCommand] = useState('1234GOFF##');

  const saveTemplates = async () => {
    await AsyncStorage.setItem('openCommand', openCommand);
    await AsyncStorage.setItem('holdOpenCommand', holdOpenCommand);
    await AsyncStorage.setItem('closeCommand', closeCommand);
    Alert.alert('Templates saved successfully!');
  };

  return (
    <View>
      <Text>Edit Command Templates</Text>
      <Text>Open Command:</Text>
      <TextInput
        value={openCommand}
        onChangeText={setOpenCommand}
        placeholder="Enter Open Command"
      />
      <Text>Hold Open Command:</Text>
      <TextInput
        value={holdOpenCommand}
        onChangeText={setHoldOpenCommand}
        placeholder="Enter Hold Open Command"
      />
      <Text>Close Command:</Text>
      <TextInput
        value={closeCommand}
        onChangeText={setCloseCommand}
        placeholder="Enter Close Command"
      />
      <Button title="Save Templates" onPress={saveTemplates} />
    </View>
  );
};

const StatusScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const loadPhoneNumber = async () => {
      const savedPhoneNumber = await AsyncStorage.getItem('gsmPhoneNumber');
      if (savedPhoneNumber) {
        setPhoneNumber(savedPhoneNumber);
      }
    };
    loadPhoneNumber();
  }, []);

  const sendStatusRequest = (command) => {
    if (!phoneNumber) {
      Alert.alert('Please enter the GSM module phone number.');
      return;
    }
    const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(command)}`;
    Linking.openURL(smsUrl);
  };

  return (
    <View>
      <Text>Status Options</Text>
      <Button title="Relay Status" onPress={() => sendStatusRequest('1234T#')} />
      <Button title="Signal Level" onPress={() => sendStatusRequest('1234L#')} />
      <Button title="Stored Numbers" onPress={() => sendStatusRequest('1234N#')} />
      <Button title="Event Logs" onPress={() => sendStatusRequest('1234E#')} />
    </View>
  );
};

const SettingsScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      const savedPhoneNumber = await AsyncStorage.getItem('gsmPhoneNumber');
      const savedAdminPassword = await AsyncStorage.getItem('adminPassword');
      if (savedPhoneNumber) {
        setPhoneNumber(savedPhoneNumber);
      }
      if (savedAdminPassword) {
        setAdminPassword(savedAdminPassword);
      }
    };
    loadSettings();
  }, []);

  const saveSettings = async () => {
    await AsyncStorage.setItem('gsmPhoneNumber', phoneNumber);
    await AsyncStorage.setItem('adminPassword', adminPassword);
    Alert.alert('Settings saved successfully!');
  };

  return (
    <View>
      <Text>Manage GSM Module Phone Number</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter GSM Module Phone Number"
      />
      <Text>Change Admin Password</Text>
      <TextInput
        value={adminPassword}
        onChangeText={setAdminPassword}
        placeholder="Enter Admin Password"
      />
      <Button title="Save Settings" onPress={saveSettings} />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Templates" component={TemplateScreen} />
        <Tab.Screen name="Status" component={StatusScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
