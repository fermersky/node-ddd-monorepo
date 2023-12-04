import type { GetDriversResponseBody } from '@shared/http/driver.dto';

export async function getDrivers(): Promise<GetDriversResponseBody> {
  const res = await fetch('http://localhost:8000/drivers', {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZHJld0BtYWlsLmNvbSIsImlkIjoiOTQ5NWYzYjUtNDA3NS00YzQ3LTk5MTktZTdiYzQ1ZGExNzFkIiwiaWF0IjoxNjg5NTM0MzE5LCJleHAiOjE2OTEyMjQ3NTMzNTJ9.F0EXS6XAj6UZy-8dX_AuUipjtq8vWA3qpie5t9klgmo',
    },
    next: {
      tags: ['drivers'],
    },
    cache: 'no-store',
  });

  return res.json();
}
