export function logRequest(ip, node) {
  const timestamp = new Date().toISOString();

  console.log(`
[${timestamp}]
Incoming IP: ${ip}
Routed To : ${node}
`);
}