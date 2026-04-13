import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  LayoutChangeEvent,
  GestureResponderEvent,
} from 'react-native';
import { useGame } from '../../context/GameContext';

export default function MapScreen() {
  const { tokens, selectedTokenId, selectToken, moveToken } = useGame();
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });

  const handleMapLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setMapSize({ width, height });
  };

  const handleMapPress = (event: GestureResponderEvent) => {
    if (!selectedTokenId || mapSize.width === 0 || mapSize.height === 0) return;

    const { locationX, locationY } = event.nativeEvent;
    const tokenSize = 42;
    const half = tokenSize / 2;

    const clampedX = Math.max(0, Math.min(locationX - half, mapSize.width - tokenSize));
    const clampedY = Math.max(0, Math.min(locationY - half, mapSize.height - tokenSize));

    moveToken(selectedTokenId, clampedX, clampedY);
  };

  const selectedToken = tokens.find((token) => token.id === selectedTokenId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battle Map</Text>

      <View style={styles.infoBar}>
        <Text style={styles.infoText}>
          Selected: {selectedToken?.label ?? 'None'} • Tap the map to move
        </Text>
      </View>

      <Pressable style={styles.mapBox} onLayout={handleMapLayout} onPress={handleMapPress}>
        <View style={styles.gridOverlay} />

        {tokens.map((token) => {
          const isSelected = token.id === selectedTokenId;
          const tokenStyle = token.type === 'player' ? styles.playerToken : styles.enemyToken;

          return (
            <TouchableOpacity
              key={token.id}
              activeOpacity={0.85}
              onPress={() => selectToken(token.id)}
              style={[
                tokenStyle,
                { top: token.y, left: token.x },
                isSelected && styles.selectedToken,
              ]}
            >
              <Text style={styles.tokenText}>{token.label}</Text>
            </TouchableOpacity>
          );
        })}
      </Pressable>
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
    marginBottom: 14,
  },
  infoBar: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  infoText: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '600',
  },
  mapBox: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#334155',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 16,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.25,
    backgroundColor: 'transparent',
  },
  playerToken: {
    position: 'absolute',
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3b82f6',
    shadowOpacity: 0.9,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  enemyToken: {
    position: 'absolute',
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ef4444',
    shadowOpacity: 0.9,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  selectedToken: {
    borderWidth: 3,
    borderColor: '#facc15',
  },
  tokenText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 18,
  },
});