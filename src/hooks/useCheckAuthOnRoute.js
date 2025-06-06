import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useCheckAuthOnRoute = () => {
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("isUserLoggedIn") || "false");
    setIsUserLoggedIn(data);
    if (!data) {
      router.replace("/");
    }
  }, [router]);

  return isUserLoggedIn;
};

export default useCheckAuthOnRoute;
