// app/(flow)/_layout.tsx
import { Stack } from 'expo-router';

export default function FlowLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    />
  );
}
