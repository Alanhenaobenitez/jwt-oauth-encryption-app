export function encryptText(text: string): string {
  if (!text) return "";
  // Cifrado “falso” usando Base64 + rotación de caracteres
  const base64 = btoa(text);
  return base64.split("").reverse().join("");
}

export function decryptText(cipher: string): string {
  if (!cipher) return "";
  try {
    const reversed = cipher.split("").reverse().join("");
    return atob(reversed);
  } catch {
    return "Error al descifrar texto";
  }
}