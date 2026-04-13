import { View, Text, StyleSheet } from 'react-native';
import { useGame } from '../../context/GameContext';

export default function HomeScreen() {
  const { campaignName, currentTurn, changeLog } = useGame();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{campaignName}</Text>
      <Text style={styles.subtitle}>Campaign Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Turn</Text>
        <Text style={styles.cardValue}>{currentTurn}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Scene</Text>
        <Text style={styles.cardText}>
          The party has entered a ruined chamber. A goblin is visible near the east pillar.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Summary</Text>
        {changeLog.slice(0, 5).map((entry, index) => (
          <Text key={index} style={styles.cardText}>• {entry}</Text>
        ))}
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
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    marginTop: 4,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  cardTitle: {
    color: '#facc15',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  cardValue: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '800',
  },
  cardText: {
    color: '#e5e7eb',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
  },
});