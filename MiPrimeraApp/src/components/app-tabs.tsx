import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor="#FFFFFF"
      indicatorColor="#EEEEEE"
      labelStyle={{
        selected: {
          color: colors.text,
        },
      }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>
          inicio
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/paw.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="citas">
        <NativeTabs.Trigger.Label>
          Citas
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/Formularios.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}