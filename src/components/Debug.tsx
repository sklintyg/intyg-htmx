export function Debug({ data }: { data: unknown }) {
  return (
    <pre class="overflow-auto bg-slate-800 text-green-400 max-h-96 p-4 rounded mb-4">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
