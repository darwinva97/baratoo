import { component$, Resource } from "@builder.io/qwik";
import { builder } from '@builder.io/sdk'
import { useEndpoint } from '@builder.io/qwik-city';
import type { DocumentHead, RequestHandler } from '@builder.io/qwik-city'

interface IProduct {
  name: string;
  size: any[];
  offer?: number;
  description?: string;
  images: [];
}

export default component$(() => {
  const products = useEndpoint<IProduct[]>();

  return (
    <section class="px-6 sm:px-6 py-12 sm:py-16 lg:py-20 mx-auto max-w-3xl">
      <header>
        <h1 class="text-center text-4xl md:text-5xl font-bold leading-tighter tracking-tighter mb-8 md:mb-16 font-heading">
          Blog
        </h1>
      </header>
      <Resource
        value={products}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Error</div>}
        onResolved={(products) =>
          <ul>
            {products?.map(({ name, description, images, offer }) => (
              <li>
                <strong>{name}</strong>
                <p>{description}</p>
                <span>{offer}</span>
                <ul>{images?.map(image => JSON.stringify(image))}</ul>
              </li>
            ))}
          </ul>}
      />
    </section>
  );
});


export const onGet: RequestHandler<IProduct[]> = async () => {
  // put your DB access here (hard coding data for simplicity)
  builder.init("577141249080480d96bd42f1ac28d421")

  const data: IProduct[] = (await builder.getAll('product'))
    .map(({ data }) => data as unknown as IProduct)

  return data
};

export const head: DocumentHead = {
  title: "Blog — Qwind",
  meta: [
    {
      name: "description",
    },
  ],
};
