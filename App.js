import { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StartGameScreen from './Screens/StartGameScreen';
import GameScreen from './Screens/GameScreen';
import GameOverScreen from './Screens/GameOverScreen';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require ('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if(!fontsLoaded){
    return <AppLoading/>;
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds){
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler(){
    setUserNumber(null);
    setGuessRounds(0);
  }


  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />; // Render only once

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver ={gameOverHandler}/>;
  }

  if (gameIsOver && userNumber){
    screen = <GameOverScreen 
    userNumber = {userNumber} 
    rounds ={guessRounds} 
    onStartNewGame ={startNewGameHandler}/>
  }



  return (
    <LinearGradient colors={['pink', 'purple']} style={styles.MainScreen}>
      <ImageBackground
        source={require('./assets/bubbles.jpg')}
        resizeMode='cover'
        style={styles.MainScreen}
        imageStyle={styles.backgroundImage}
      >

        <SafeAreaView style ={styles.MainScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  MainScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.35,
  },
});
