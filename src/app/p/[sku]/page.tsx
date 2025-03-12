import { Suspense } from "react";
import ProductDetails from "@/components/ProductDetails";

export const dynamicParams = true;
export const revalidate = 300; // Enable ISR with 300 seconds revalidation
export const dynamic = "force-static"; // Ensure ISR instead of full static generation

async function fetchFastData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  return res.json();
}

async function fetchSlowData() {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate slow fetch
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/2");
  return res.json();
}

async function fetchMediumData() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  return res.json();
}

async function fetchVerySlowData() {
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate very slow fetch
  const res = await fetch("https://dog.ceo/api/breeds/image/random");
  return res.json();
}

export default async function Page({ params }: { params: { sku: string } }) {
  const fastData = await fetchFastData();
  const slowData = await fetchSlowData();
  const mediumData = await fetchMediumData();
  const verySlowData = await fetchVerySlowData();

  return (
    <div>
      <h1>Product SKU: {params.sku}</h1>
      <Suspense fallback={<p>Loading product details...</p>}>
        <ProductDetails fastData={fastData} slowData={slowData} mediumData={mediumData} verySlowData={verySlowData} />
      </Suspense>
    </div>
  );
}