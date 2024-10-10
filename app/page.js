import Image from "next/image";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div>
      page
      <Link href="/about">about</Link>
      <Image src="/vercel.svg" width={72} height={16} alt="Vercel Logo" />
    </div>
  );
}

export default page;
