"use client";
import { GitBranch, User, Users, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import Flow from "./Flow";
import CharacterStudio from "./CharacterStudio";

const OPTIONS = [
  {
    id: 1,
    label: "Visual Flow",
    icon: GitBranch,
  },
  {
    id: 2,
    label: "Collaboration",
    icon: Users,
  },
  {
    id: 3,
    label: "Character Studio",
    icon: User,
  },
  {
    id: 4,
    label: "AI Character Chat",
    icon: MessageSquare,
  },
];

const StoryEditorNavbar = ({ storyId }) => {
  const [selectedOption, setSelectedOption] = useState(1);

  return (
    <>
      <div className="bg-custom-gray-500 w-full p-3 pt-24 overflow-x-auto">
        <div className="flex gap-6">
          {OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                onClick={() => setSelectedOption(opt.id)}
                key={opt.id}
                className={`flex items-center gap-2 min-w-fit cursor-pointer ${
                  selectedOption === opt.id ? "text-blue-500" : "text-white"
                }`}
              >
                <Icon className="w-6 h-6" />
                <p className="font-semibold whitespace-nowrap">{opt.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {selectedOption === 1 && (
        <div>
          <Flow storyId={storyId} />
        </div>
      )}

      {selectedOption === 3 && (
        <div>
          <CharacterStudio storyId={storyId} />
        </div>
      )}
    </>
  );
};

export default StoryEditorNavbar;
