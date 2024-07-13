import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../config/config';
import { ref, query, orderByChild, get } from 'firebase/database';
import { FlatList } from 'react-native-gesture-handler';

export default function HighScoreScreen({ navigation }: any) {
  const [highScores, setHighScores] = useState<{ id: string, userId: any, score: any }[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      const scoresRef = ref(db, 'scores');
      const scoresQuery = query(scoresRef, orderByChild('score'));

      try {
        const snapshot = await get(scoresQuery);
        if (snapshot.exists()) {
          const scoresData = snapshot.val();
          const scoresList = Object.keys(scoresData).map(key => ({
            id: key,
            userId: scoresData[key].userId,
            score: scoresData[key].score,
          })).sort((a, b) => b.score - a.score);
          setHighScores(scoresList);
        } else {
          console.log('No se encontraron scores.');
        }
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, []);

  const handleGoBack = () => {
    navigation.navigate('GameOver', { score: 0 }); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>High Scores</Text>
      <FlatList
        data={highScores}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.scoreItem}>
            <Text style={styles.email}>{item.userId}</Text>
            <Text style={styles.score}>{item.score}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  scoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  goBackButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
