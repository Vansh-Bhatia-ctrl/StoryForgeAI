"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthentication from "../store/useAuthentication";

const page = () => {
  const router = useRouter();
  const [isSignUpSelected, setIsSignupSelected] = useState(false);
  const [isLoading, setIssLoading] = useState(true);
  const [passwordIsShowing, setPasswordIsShowing] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { signUp, login, error, loading, loggedIn } = useAuthentication();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIssLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (!isLoading && loggedIn) {
      router.push("/stories");
    }
  }, [loggedIn, isLoading, router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUpSelected) {
      signUp(userInput.name, userInput.email, userInput.password);
    } else {
      login(userInput.email, userInput.password);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen w-screen flex bg-custom-gray-100 items-center justify-center">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen min-w-screen bg-custom-gray-100 overflow-x-auto">
        <div className=" pt-20 p-4 md:max-w-3xl md:mx-auto lg:mt-7 xl:mt-10">
          <div className="bg-custom-gray-300  p-5 lg:p-10 mt-7 border border-slate-800 rounded-lg">
            <div className="bg-custom-gray-600 rounded-lg">
              <div>
                <div className="bg-custom-gray-500 p-2 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div
                      onClick={() => setIsSignupSelected(false)}
                      className={`w-[50%] ${
                        !isSignUpSelected ? "bg-blue-700" : "bg-transparent"
                      } p-2 rounded-lg flex items-center justify-center`}
                    >
                      <button className="text-white font-semibold">
                        Login
                      </button>
                    </div>
                    <div
                      onClick={() => setIsSignupSelected(true)}
                      className={`w-[50%] ${
                        isSignUpSelected ? "bg-blue-700" : "bg-transparent"
                      } p-2 rounded-lg flex items-center justify-center`}
                    >
                      <button className="text-white font-semibold">
                        Sign up
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-5 realtive">
              <AnimatePresence>
                {isSignUpSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        name="name"
                        value={userInput.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full pl-11 pr-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all border-gray-700 focus:ring-blue-500/50 placeholder:text-slate-400 text-white"
                        required
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8">
                <label className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={userInput.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all border-gray-700 focus:ring-blue-500/50 placeholder:text-slate-400 text-white"
                    required
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={passwordIsShowing ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={userInput.password}
                    onChange={handleInputChange}
                    className=" w-full pl-11 pr-12 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all border-gray-700 focus:ring-blue-500/50 placeholder:text-slate-400 text-white"
                    required
                  />
                  <button
                    onClick={() => setPasswordIsShowing(!passwordIsShowing)}
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {passwordIsShowing ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="text-white font-semibold bg-blue-700 p-2 w-full rounded-lg text-lg hover:bg-blue-800 transition-all duration-300 hover:scale-103"
                >
                  {isSignUpSelected
                    ? loading
                      ? "Creating Account..."
                      : "Create Account"
                    : loading
                    ? "Signing In ..."
                    : "Sign In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
