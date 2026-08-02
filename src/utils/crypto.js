// Convert hex string to Uint8Array
function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i/2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

// Convert Uint8Array to hex string
function bytesToHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

// SHA‑256 as hex (async)
export async function sha256hex(data) {
  const enc = new TextEncoder();
  const hash = await crypto.subtle.digest('SHA-256', enc.encode(data));
  return bytesToHex(new Uint8Array(hash));
}

// PBKDF2 (async)
export async function pbkdf2(password, salt, iterations, keyLen) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    password,
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: enc.encode(salt),
      iterations: iterations,
      hash: 'SHA-256',
    },
    keyMaterial,
    keyLen * 8 // bits
  );
  return new Uint8Array(bits);
}

// AES‑CBC decryption (async)
export async function decryptAES(keyBytes, ivBytes, ciphertext) {
  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'AES-CBC' },
    false,
    ['decrypt']
  );
  const plaintext = await crypto.subtle.decrypt(
    { name: 'AES-CBC', iv: ivBytes },
    key,
    ciphertext
  );
  return new Uint8Array(plaintext);
}