export default function response(data, connection) {
  const payload = JSON.stringify({
    error: false,
    ...data,
  });

  connection.write(payload);
}
