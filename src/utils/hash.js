import crypto from "crypto";

const generateHash = (value) => {
  const hash = crypto
    .createHash("sha256")
    .update(value)
    .digest("hex");

  return BigInt(`0x${hash.substring(0, 16)}`);
}

export { generateHash };