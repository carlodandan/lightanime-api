function bytesToHex(bytes) {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function sha256hex(data) {
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(data)
  );

  return bytesToHex(new Uint8Array(hash));
}

export async function pbkdf2(password, salt, iterations, keyLen) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    password,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: new TextEncoder().encode(salt),
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    keyLen * 8
  );

  return new Uint8Array(bits);
}

export async function decryptAES(keyBytes, ivBytes, ciphertext) {
  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );

  const plaintext = await crypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv: ivBytes,
    },
    key,
    ciphertext
  );

  return new Uint8Array(plaintext);
}