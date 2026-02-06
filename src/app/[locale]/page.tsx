"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const PageLocal = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/th/auth/sign-in");
  }, [router]);

  return null;
};

export default PageLocal;
