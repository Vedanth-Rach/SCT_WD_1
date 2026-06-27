export interface NavStylePreset {
  id: string;
  name: string;
  description: string;
}

export interface HoverStylePreset {
  id: 'pill' | 'underline' | 'dot' | 'scale';
  name: string;
  description: string;
}

export interface ScrollStylePreset {
  id: 'glassmorphism' | 'gradient' | 'minimal' | 'neon';
  name: string;
  description: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string; // lucide-react icon name representation
}

export interface AppSection {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  bgColor: string;
  accentColor: string;
}
