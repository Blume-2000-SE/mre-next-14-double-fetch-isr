export default function ProductDetails({ fastData, slowData, mediumData, verySlowData }: { fastData: unknown; slowData: unknown; mediumData: unknown; verySlowData: unknown }) {
  return (
    <div>
      <h2>Fast Data:</h2>
      <pre>{JSON.stringify(fastData, null, 2)}</pre>
      <h2>Slow Data:</h2>
      <pre>{JSON.stringify(slowData, null, 2)}</pre>
      <h2>Medium Data:</h2>
      <pre>{JSON.stringify(mediumData, null, 2)}</pre>
      <h2>Very Slow Data:</h2>
      <pre>{JSON.stringify(verySlowData, null, 2)}</pre>
    </div>
  );
}