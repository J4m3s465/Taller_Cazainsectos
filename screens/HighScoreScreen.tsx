import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth, firestore } from '../config/config';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

export default function HighScoreScreen() {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const fetchScores = async () => {
      const user = auth.currentUser;
      if (user) {
        const scoresRef = collection(firestore, 'scores');
        const q = query(scoresRef, where('userId', '==', user.uid), orderBy('score', 'desc'), limit(1));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          setHighScore(snapshot.docs[0].data().score);
        }
      }
    };

    fetchScores();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>High Score</Text>
      <Text style={styles.score}>{highScore}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
