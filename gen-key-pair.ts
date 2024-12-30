import * as jose from "jose";
import fs from "fs/promises";

const { privateKey, publicKey } = await jose.generateKeyPair("RS256", {
  extractable: true,
});

const privateJWK = await jose.exportJWK(privateKey);
const publicJWK = await jose.exportJWK(publicKey);

await fs.writeFile("src/private-key.json", JSON.stringify(privateJWK, null, 2));
await fs.writeFile("src/public-key.json", JSON.stringify(publicJWK, null, 2));
