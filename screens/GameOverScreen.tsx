import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function GameOverScreen({ route, navigation }: any) {
    const { score } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Game Over</Text>
            <Text style={styles.score}>Your Score: {score}</Text>
            <View style={styles.boton}>
                <Button
                    title="Play Again"
                    onPress={() => navigation.navigate('Game')}
                />
            </View>
            <View style={styles.boton}>
                <Button
                    title="High Scores"
                    onPress={() => navigation.navigate('Scores')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    score: {
        fontSize: 24,
        marginBottom: 20,
    },
    boton: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
    }
});
