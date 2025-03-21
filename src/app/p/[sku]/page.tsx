import ProductDetails from "@/components/ProductDetails";

export const dynamicParams = true;
export const revalidate = 300; // Enable ISR with 300 seconds revalidation
export const dynamic = "force-static"; // Ensure ISR instead of full static generation

async function fetchFastData(sku: string) {
  console.log("fetchFastData called with sku", sku);
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1?sku=${sku}`, {
    next: { revalidate: false }
  });
  return res.json();
}

async function fetchTodo(sku: string) {
  console.log("fetchTodo called with sku", sku);
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/2?sku=${sku}`, {
    next: { revalidate: false }
  });
  return res.json();
}


async function fetchPokemon() {
  console.log("fetchPokemon called");
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto", {
    next: { revalidate: false }
  });
  return res.json();
}

async function fetchVerySlowData() {
  console.log("fetchVerySlowData called");
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate very slow fetch
  const res = await fetch("https://dog.ceo/api/breeds/image/random", {
    next: { revalidate: false }
  });
  return res.json();
}

export default async function Page({ params }: { params: { sku: string } }) {
  const { sku } = params;
  const fastData = await fetchFastData(sku);
  const slowData = await fetchTodo(sku);
  const mediumData = await fetchPokemon();
  const verySlowData = await fetchVerySlowData();

  return (
    <div>
      <h1>Product SKU: {params.sku}</h1>
      <ProductDetails fastData={fastData} slowData={slowData} mediumData={mediumData} verySlowData={verySlowData} />
    </div>
  );
}