export function shadeColor(color: string, percent: number): string {
  // Validate hex color format
  if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
    throw new Error("Invalid hex color format. Use #RRGGBB");
  }

  // Validate percent range
  if (percent < -100 || percent > 100) {
    throw new Error("Percent must be between -100 and 100");
  }

  // Convert hex to RGB
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  // Convert RGB to HSL
  R /= 255;
  G /= 255;
  B /= 255;
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  let H = 0,
    S = 0,
    L = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    S = L > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case R:
        H = (G - B) / d + (G < B ? 6 : 0);
        break;
      case G:
        H = (B - R) / d + 2;
        break;
      case B:
        H = (R - G) / d + 4;
        break;
    }
    H /= 6;
  }

  // Adjust lightness for better contrast
  L = Math.min(1, Math.max(0, L + (percent / 100) * 0.5)); // Scale percent for controlled contrast
  if (percent < 0 && L < 0.2) L = 0.2; // Prevent overly dark colors
  if (percent > 0 && L > 0.8) L = 0.8; // Prevent overly light colors

  // Convert HSL back to RGB
  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let newR, newG, newB;
  if (S === 0) {
    newR = newG = newB = L; // Achromatic
  } else {
    const q = L < 0.5 ? L * (1 + S) : L + S - L * S;
    const p = 2 * L - q;
    newR = hue2rgb(p, q, H + 1 / 3);
    newG = hue2rgb(p, q, H);
    newB = hue2rgb(p, q, H - 1 / 3);
  }

  // Convert back to hex
  return (
    "#" +
    [newR, newG, newB]
      .map((c) => {
        const hex = Math.round(c * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}
