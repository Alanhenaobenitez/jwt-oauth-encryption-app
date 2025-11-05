export function decodeJwt(token: string) {
  try {
    const [header, payload, signature] = token.split(".");
    return {
      header: JSON.stringify(JSON.parse(atob(header)), null, 2),
      payload: JSON.stringify(JSON.parse(atob(payload)), null, 2),
      signature,
    };
  } catch (error) {
    return {
      header: "Error al decodificar",
      payload: "Token inválido",
      signature: "",
    };
  }
}
