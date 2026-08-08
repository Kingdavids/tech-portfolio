function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function coverHue(seed: string): number {
  return hashString(seed) % 360;
}

export function coverGradient(seed: string): string {
  const hue = coverHue(seed);
  const hue2 = (hue + 55) % 360;
  return `radial-gradient(circle at 20% 20%, hsl(${hue} 80% 62% / 0.55), transparent 55%), ` +
    `radial-gradient(circle at 85% 75%, hsl(${hue2} 85% 55% / 0.5), transparent 55%), ` +
    `linear-gradient(135deg, hsl(${hue} 40% 14%), hsl(${hue2} 35% 10%))`;
}

export function coverMonogram(seed: string): string {
  const words = seed.trim().split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return seed.slice(0, 2).toUpperCase();
}
