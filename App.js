import { StatusBar } from 'expo-status-bar';
import React, { useContext } from "react";
import { StyleSheet, Text, View } from 'react-native';
import Context, { NewsContext } from './API/Context';
import NewsTab from './components/NewsTab';

function App() {
   const {darkTheme} = useContext(NewsContext)
  return (
    <View style={{ ...styles.container, backgroundColor: darkTheme ? "#282c35" : "#fff" }}>
      <StatusBar />
      <NewsTab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   marginTop:StatusBar.currentHeight
  },
});

export default () => {
  return (
      <Context>
          <App />
      </Context>
  );
}