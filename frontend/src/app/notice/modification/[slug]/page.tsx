'use client';

import Modify from "../Modify";

export default async function ModifyPage({
  params,
}: {
  params: { slug: string };
}) {
  
  return <Modify postingNo={params.slug} />;
}
