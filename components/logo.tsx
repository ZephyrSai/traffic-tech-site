import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo-original.png";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Traffic Tech home">
      <Image
        src={logo}
        alt="Traffic Tech (Gulf)"
        className="h-9 w-auto"
        priority
        sizes="180px"
      />
    </Link>
  );
}
