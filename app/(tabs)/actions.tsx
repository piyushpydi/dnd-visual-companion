import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useGame } from '../../context/GameContext';

export default function ActionsScreen() {
  const { resultText, setResultText, changeLog, addLogEntry } = useGame();
  const [action, setAction] = useState('');
  const [roll, setRoll] = useState('');

  const handleSubmit = () => {
    const cleanedAction = action.trim();
    const cleanedRoll = roll.trim();

    if (!cleanedAction || !cleanedRoll) return;

    const numericRoll = Number(cleanedRoll);

    let newResult = `You attempted "${cleanedAction}" with a roll of ${cleanedRoll}.`;

    if (!Number.isNaN(numericRoll)) {
      if (numericRoll >= 18) {
        newResult = `Strong success. Your action "${cleanedAction}" works extremely well.`;
      } else if (numericRoll >= 12) {
        newResult = `Success. Your action "${cleanedAction}" works.`;
      } else if (numericRoll >= 7) {
        newResult = `Partial success. Your action "${cleanedAction}" works, but with a complication.`;
      } else {
        newResult = `Failure. Your action "${cleanedAction}" does not go as planned.`;
      }
    }

    setResultText(newResult);
    addLogEntry(`Action submitted: ${cleanedAction} (${cleanedRoll})`);

    setAction('');
    setRoll('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actions</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Action</Text>
        <TextInput
          style={styles.input}
          placeholder="Attack goblin"
          placeholderTextColor="#94a3b8"
          value={action}
          onChangeText={setAction}
        />

        <Text style={[styles.label, { marginTop: 14 }]}>Dice Roll</Text>
        <TextInput
          style={styles.input}
          placeholder="16"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
          value={roll}
          onChangeText={setRoll}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Action</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Result</Text>
        <Text style={styles.resultText}>{resultText}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>What Changed</Text>
        <ScrollView>
          {changeLog.map((entry, index) => (
            <Text key={index} style={styles.logText}>• {entry}</Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    color: '#facc15',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  label: {
    color: '#cbd5e1',
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 15,
  },
  input: {
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: '#facc15',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '800',
  },
  cardTitle: {
    color: '#facc15',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  resultText: {
    color: '#e5e7eb',
    fontSize: 16,
    lineHeight: 24,
  },
  logText: {
    color: '#e5e7eb',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 6,
  },
});