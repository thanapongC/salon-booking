"use client";

import AuthForm from "@/components/forms/auth/AuthForm";
import LineLogin from "@/components/forms/auth/LineLogin";
import { checkShopLoginCallbackUrl } from "@/utils/utils";
import { usePathname, useSearchParams } from "next/navigation";

const LoginPage = () => {
  
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const isShop = checkShopLoginCallbackUrl(callbackUrl);

  console.log(isShop)

  return <>{isShop ? <LineLogin /> : <AuthForm />};</>;
};

export default LoginPage;
