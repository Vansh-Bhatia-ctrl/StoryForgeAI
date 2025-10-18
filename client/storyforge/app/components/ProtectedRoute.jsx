"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthentication from "../store/useAuthentication";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children, fallback = null }) => {
  const router = useRouter();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const { accessToken, isInitialized, initializeAuth, loading } =
    useAuthentication();

  useEffect(() => {
    if (!isInitialized) {
      console.log("📦 Initializing authentication...");
      initializeAuth();
    }
  }, []);

  useEffect(() => {
    if (isInitialized && !loading && !hasCheckedAuth) {
      console.log("🔍 Checking authentication status...");
      console.log("Access Token Present:", !!accessToken);

      if (!accessToken) {
        console.log("🚪 No valid session, redirecting to login...");
        router.push("/authentication");
      } else {
        console.log("✅ Valid session found");
      }

      setHasCheckedAuth(true);
    }
  }, [isInitialized, loading, accessToken, hasCheckedAuth, router]);

  if (!isInitialized || loading || !hasCheckedAuth) {
    return (
      <div className="pt-20 min-h-screen w-screen flex bg-custom-gray-100 items-center justify-center">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
      </div>
    );
  }

  if (!accessToken) {
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
