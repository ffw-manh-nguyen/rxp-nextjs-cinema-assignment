import { useRouter } from "next/navigation";

export const RedirectToHome = () => {
  const router = useRouter();
  router.push("/");
};
