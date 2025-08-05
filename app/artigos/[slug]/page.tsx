import { getArtigoBySlug, getArtigos } from "@/lib/artigos";
import { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const artigos = await getArtigos();
  return artigos.map((artigo) => ({
    slug: artigo.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const artigo = await getArtigoBySlug(params.slug);
  return {
    title: artigo?.titulo || "Artigo",
    description: artigo?.conteudo.slice(0, 150) || "Conteúdo do artigo",
  };
}

export default async function ArtigoPage({ params }: { params: { slug: string } }) {
  const artigo = await getArtigoBySlug(params.slug);

  if (!artigo) return <p>Artigo não encontrado.</p>;

  return (
    <article className="p-6">
      <h1 className="text-3xl font-bold">{artigo.titulo}</h1>
      <p className="text-sm text-gray-600">{artigo.autor} - {artigo.data}</p>
      <div className="mt-4">{artigo.conteudo}</div>
    </article>
  );
}
