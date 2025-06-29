import { useQuery } from '@tanstack/react-query';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const fetchTest = async () => {
  const response = await fetch(`${API_URL}/api/test`);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

const fetchHealth = async () => {
  const response = await fetch(`${API_URL}/health`);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

export default function Page() {
  const {
    data: testData,
    isLoading: testLoading,
    error: testError,
  } = useQuery({
    queryKey: ['test'],
    queryFn: fetchTest,
  });

  const { data: healthData, isLoading: healthLoading } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold font-primary text-purple-400">
        Frontend ↔ Backend Test
      </h1>

      <div className="mt-4 space-y-4">
        <div>
          <h2 className="font-semibold">API Test:</h2>
          {testLoading && <p>Loading...</p>}
          {testError && (
            <p className="text-red-500">❌ Error: {testError.message}</p>
          )}
          {testData && <p className="text-green-500">✅ {testData.message}</p>}
        </div>

        <div>
          <h2 className="font-semibold">Health Check:</h2>
          {healthLoading && <p>Loading...</p>}
          {healthData && (
            <div className="text-green-500">
              <p>✅ Status: {healthData.status}</p>
              <p>📅 Time: {healthData.timestamp}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
