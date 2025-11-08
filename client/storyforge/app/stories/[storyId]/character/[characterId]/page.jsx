"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import useChatStore from "@/app/store/useChatStore";

const page = () => {
  const { storyId, characterId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [characterData, setCharacterData] = useState([]);
  const { fetchCharacterFronDB, receivedData, error, loading } = useChatStore();

  useEffect(() => {
    const fetchFromDb = async () => {
      const response = await fetchCharacterFronDB(storyId, characterId);
      setCharacterData(response.data.characterData);
    };

    fetchFromDb();
  }, [receivedData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || loading) {
    return (
      <div className="pt-20 min-h-screen w-screen flex bg-custom-gray-100 items-center justify-center flex-col gap-4">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
        <p className="text-white">
          {loading ? "Loading Character..." : "Loading..."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="pt-20">
        {/*Header Section*/}
        <div className="min-w-screen bg-custom-gray-500 h-20 p-4">
          <div className="lg:max-w-7xl lg:mx-auto">
            <div className="flex items-center gap-4">
              <div>
                <ArrowLeft color="#fff" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg">
                  {characterData[0].characterName}
                </p>
                <p className="text-slate-300 text-sm">
                  {characterData[0].personality.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*Chat Window Section*/}
        <div className="h-[64vh] overflow-y-auto w-screen mt-5">
          <div className="lg:max-w-7xl lg:mx-auto">
            <div className="flex justify-start p-2">
              <div className="bg-[#0f1f3a] text-gray-100 rounded-bl-sm rounded-lg p-4 max-w-[80%] md:max-w-[70%] lg:max-w-[60%]">
                Hello! I'm Elena the Wise. How can I assist you today?
                <div className="flex justify-start text-[13px] text-slate-500 mt-3">
                  12:59 AM
                </div>
              </div>
            </div>

            <div className="flex justify-end p-2">
              <div className="bg-[#3b82f6] text-white rounded-br-sm rounded-lg p-4 max-w-[80%] md:max-w-[70%] lg:max-w-[60%]">
                Hi, how are you?
                <div className="flex justify-end text-[13px] text-slate-300 mt-3">
                  12:59 AM
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Message Bar Section*/}
        <div className="bg-custom-gray-700 w-screen h-full p-2 border-t border-slate-800">
          <div className="lg:max-w-7xl lg:mx-auto flex items-center gap-2">
            <input
              className=" bg-[#0a1628] text-white border border-gray-700 focus:outline-none focus:border-[#3b82f6] placeholder-gray-500 transition-colors flex-1 px-4 py-3 rounded-xl"
              placeholder="Chat with Elena The Wise..."
            />

            <button className="px-6 py-3 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
              <Send className="w-5 h-5 text-white" />
              <span className="hidden sm:inline text-white font-medium">
                Send
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
