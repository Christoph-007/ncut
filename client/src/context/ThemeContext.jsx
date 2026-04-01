import { createContext, useContext, useEffect, useState } from 'react';
import defaultSettings from '../config/themeSettings.json';

const ThemeContext = createContext({
  settings: defaultSettings,
  updateSetting: () => {}
});

export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Inject CSS Variables dynamically on boot based on settings config
  useEffect(() => {
    const root = document.documentElement;
    
    // Inject active color schemes into root (simulating Shopify's settings.colors mapping)
    // Shopify color schemes are accessed via class names like .color-scheme-1, but can also inform base root
    if (settings.color_schemes) {
      Object.entries(settings.color_schemes).forEach(([schemeKey, schemeData]) => {
        const schemeVars = schemeData.settings;
        // Inject prefix css vars for that specific scheme if needed
        // For the globally active scheme, we enforce it on the body
        if (schemeKey === 'scheme-1') {
          root.style.setProperty('--color-background', schemeVars.background);
          root.style.setProperty('--color-foreground', schemeVars.foreground);
          root.style.setProperty('--color-button-bg', schemeVars.primary_button_background);
          root.style.setProperty('--color-button-text', schemeVars.primary_button_text);
        }
      });
    }

    // Inject radii and general variables
    root.style.setProperty('--border-radius-base', `${settings.button_border_radius_primary}px`);
    root.style.setProperty('--border-radius-secondary', `${settings.button_border_radius_secondary}px`);
    root.style.setProperty('--border-radius-card', `${settings.card_corner_radius}px`);
    root.style.setProperty('--input-border-width', `${settings.input_border_width}px`);
    
  }, [settings]);

  return (
    <ThemeContext.Provider value={{ settings, updateSetting }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeSettings() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeSettings must be used within a ThemeProvider');
  }
  return context.settings;
}
