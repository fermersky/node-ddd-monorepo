export async function driverLogin({ email, password }: { email: string; password: string }) {
  const res = await fetch('http://localhost:8000/driver/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'content-type': 'application/json',
    },
  });

  const json = await res.json();

  return json;
}
