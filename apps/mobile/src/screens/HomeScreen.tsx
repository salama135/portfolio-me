import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Portfolio mobile</Text>
      <Text style={styles.body}>
        Touch-first companion for the web demo hub. No accounts, no sync, local UI state only.
      </Text>
      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
        onPress={() => navigation.navigate('FlagshipDemo', { slug: 'hello' })}
      >
        <Text style={styles.ctaLabel}>Open flagship demo</Text>
      </Pressable>
      <Text style={styles.hint}>Deep link shape: portfolio://demo/&lt;slug&gt; (matches web registry slugs).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    maxWidth: 420,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    letterSpacing: -0.4,
    color: '#1d1d1f',
  },
  body: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 22,
    color: '#424245',
  },
  cta: {
    marginTop: 28,
    alignSelf: 'flex-start',
    backgroundColor: '#0071e3',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 999,
  },
  ctaPressed: {
    opacity: 0.88,
  },
  ctaLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  hint: {
    marginTop: 28,
    fontSize: 13,
    lineHeight: 18,
    color: '#6e6e73',
  },
});
