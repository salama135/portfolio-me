import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FlagshipDemo'>;

const COLS = 3;
const ROWS = 4;

export function FlagshipDemoScreen({ route }: Props) {
  const { slug } = route.params;
  const [taps, setTaps] = useState(0);
  const pulse = useRef(new Animated.Value(1)).current;
  const width = Dimensions.get('window').width;
  const tile = useMemo(() => Math.min(88, Math.floor((Math.min(width, 360) - 40) / COLS) - 6), [width]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.06, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const cells = useMemo(() => Array.from({ length: COLS * ROWS }, (_, i) => i), []);

  return (
    <View style={styles.screen}>
      <Text style={styles.kicker}>Flagship · {slug}</Text>
      <Text style={styles.head}>Touch grid</Text>
      <Text style={styles.sub}>Tap tiles. Counter is in-memory only. Motion uses native driver (opacity-safe scale).</Text>

      <Animated.View style={[styles.signal, { transform: [{ scale: pulse }] }]}>
        <Text style={styles.signalLabel}>{taps}</Text>
        <Text style={styles.signalHint}>taps</Text>
      </Animated.View>

      <View style={[styles.grid, { width: tile * COLS + (COLS - 1) * 8 }]}>
        {cells.map((i) => (
          <Pressable
            key={i}
            accessibilityRole="button"
            accessibilityLabel={`Tile ${i + 1}`}
            onPress={() => setTaps((n) => n + 1)}
            style={({ pressed }) => [
              styles.tile,
              { width: tile, height: tile },
              pressed && styles.tilePressed,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
    alignItems: 'center',
    backgroundColor: '#f5f5f7',
  },
  kicker: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#6e6e73',
    textTransform: 'uppercase',
  },
  head: {
    marginTop: 8,
    alignSelf: 'flex-start',
    fontSize: 24,
    fontWeight: '600',
    color: '#1d1d1f',
    letterSpacing: -0.3,
  },
  sub: {
    marginTop: 8,
    alignSelf: 'flex-start',
    fontSize: 15,
    lineHeight: 21,
    color: '#424245',
    maxWidth: 340,
  },
  signal: {
    marginTop: 22,
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#0071e3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signalLabel: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  signalHint: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 0.5,
  },
  grid: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  tile: {
    borderRadius: 12,
    backgroundColor: '#1d1d1f',
  },
  tilePressed: {
    backgroundColor: '#2997ff',
  },
});
