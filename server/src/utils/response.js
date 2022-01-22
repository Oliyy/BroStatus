export default function response(data, connection) {
    const payload = JSON.stringify({
      ...data
    })

    connection.write(payload);
}
