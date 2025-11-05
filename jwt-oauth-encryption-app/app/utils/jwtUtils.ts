export function decodeJwt(token: string) {
  const [header, payload, signature] = token.split(".");
  const decodePart = (part: string) =>
    JSON.parse(
      Buffer.from(part.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString()
    );
  return {
    header: decodePart(header),
    payload: decodePart(payload),
    signature,
  };
}