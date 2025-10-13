import { BookOpen } from "lucide-react";
import React from "react";

const NoResultFound = () => {
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
              Try with a different search term.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoResultFound;
