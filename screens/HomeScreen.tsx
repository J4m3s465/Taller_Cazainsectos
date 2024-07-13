import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Insect from '../components/Insect';
import { auth, firestore } from '../config/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function HomeScreen({ navigation }: any) {
  const generateInsects = () => {
    let newInsects = [];
    for (let i = 0; i < 1; i++) {
      newInsects.push({
        id: Math.random().toString(),
        x: Math.random() * 300,
        y: Math.random() * 600,
      });
    }
    return newInsects;
  };

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [insects, setInsects] = useState(generateInsects());

  useEffect(() => {
    if (timeLeft === 0) {
      saveScore();
      navigation.navigate('GameOver', { score });
    } else {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleInsectPress = (id: string) => {
    setScore(score + 1);
    setInsects(prevInsects => prevInsects.filter(insect => insect.id !== id).concat(generateInsects()));
  };

  const saveScore = async () => {
    const user = auth.currentUser;
    if (user) {
      const scoresRef = collection(firestore, 'scores');
      await addDoc(scoresRef, {
        userId: user.uid,
        score,
        createdAt: serverTimestamp(),
      });
    }
  };
  const restartGame = () => {
    setScore(0);
    setTimeLeft(10);
    setInsects(generateInsects());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      restartGame();
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
      </View>
      {insects.map(insect => (
        <TouchableOpacity
          key={insect.id}
          style={[styles.insect, { left: insect.x, top: insect.y }]}
          onPress={() => handleInsectPress(insect.id)}
        >
          <Insect />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 40,
    right: 20,
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 20,
    marginTop: 10,
  },
  insect: {
    position: 'absolute',
  },
});
