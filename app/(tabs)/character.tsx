import { StyleSheet, Text, View } from 'react-native';

export default function CharacterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Character</Text>

      <View style={styles.card}>
        <Text style={styles.name}>Aric Stormblade</Text>
        <Text style={styles.subtitle}>Level 3 Paladin</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Stats</Text>
        <Text style={styles.text}>HP: 21 / 24</Text>
        <Text style={styles.text}>AC: 17</Text>
        <Text style={styles.text}>Strength: 16</Text>
        <Text style={styles.text}>Dexterity: 12</Text>
        <Text style={styles.text}>Constitution: 14</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Inventory</Text>
        <Text style={styles.text}>• Longsword</Text>
        <Text style={styles.text}>• Shield</Text>
        <Text style={styles.text}>• Healing Potion</Text>
        <Text style={styles.text}>• Torch</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <Text style={styles.text}>
          You heard movement near the east side of the chamber.
        </Text>
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
  name: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    marginTop: 4,
  },
  sectionTitle: {
    color: '#facc15',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  text: {
    color: '#e5e7eb',
    fontSize: 15,
    lineHeight: 24,
  },
});