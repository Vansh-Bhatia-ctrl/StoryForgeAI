"use client";
import { BookOpen } from "lucide-react";
import React from "react";
import useStoryCards from "../store/useStoryCards";

const NoResultFound = () => {
  const { fetchedStories } = useStoryCards();
  return (
    <>
      <div>
        <div className="mt-30 space-y-3">
          <div className="flex items-center justify-center">
            <BookOpen className="text-slate-600 w-17 h-17" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-slate-400 font-semibold text-xl lg:text-2xl">
              No stories found
            </p>
            <p className="text-slate-400 text-sm lg:text-lg">
              {fetchedStories.length === 0
                ? "Create your first story."
                : "Try with a different search term."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoResultFound;
