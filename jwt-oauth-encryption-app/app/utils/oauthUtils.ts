// Simulación de un flujo OAuth básico para fines educativos

type OAuthResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export async function simulateOAuthLogin(): Promise<OAuthResponse> {
  // simulamos una llamada asíncrona
  await new Promise((r) => setTimeout(r, 1000));

  return {
    accessToken: "abc123-fake-oauth-token",
    refreshToken: "refresh-token-xyz789",
    expiresIn: 3600, // segundos
  };
}

export function validateAccessToken(token: string): boolean {
  // en la realidad verificarías firma, expiración, etc.
  return token.startsWith("abc123");
}
