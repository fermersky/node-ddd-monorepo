import { getDrivers } from '@/app/actions';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const drivers = await getDrivers();

  return (
    <ul>
      {drivers.map((d) => (
        <li key={d.id}>{[d.firstName, d.lastName].join(' ')}</li>
      ))}
    </ul>
  );
}
