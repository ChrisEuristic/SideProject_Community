export default function NoticePostingPage({
  params,
}: {
  params: { slug: string };
}) {
  return <h1>{params.slug}</h1>;
}
