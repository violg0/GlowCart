import { notFound } from "next/navigation";
import { productService } from "@/services/productService";
import { collectionService } from "@/services/collectionService";
import ProductDetail from "./productDetail";

interface Props {
  params: { id: string };
}

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: Props) {
  const product = await productService.getById(params.id);
  if (!product) notFound();

  const collection = product.collectionSlug
  ? collectionService.getBySlug(product.collectionSlug) ?? null
  : null;

  const similarRaw = await productService.getByCategory(product.categorySlug);
  const similar = similarRaw
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return <ProductDetail product={product} collection={collection} similar={similar} />;
}