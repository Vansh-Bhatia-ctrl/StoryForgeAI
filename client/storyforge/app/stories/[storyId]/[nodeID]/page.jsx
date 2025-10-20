"use client";
import useStoryEditor from "@/app/store/useStoryEditor";
import {
  Calendar,
  Eye,
  Loader2,
  MessageSquare,
  PencilIcon,
  Save,
  Sparkles,
  Tag,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { storyId, nodeID } = useParams();
  console.log("nodeID: ", nodeID, "storyId: ", storyId);
  const [userInput, setUserInput] = useState({
    nodeTitle: "",
    nodeType: "",
    tags: "",
    emotionalTone: "",
    storyContent: "",
    choices: [],
    positions: { x: 0, y: 0 },
  });
  const [isLoading, setIssLoading] = useState(true);
  const { postDataToDb, error, loading, storySaved, operationStatus } =
    useStoryEditor();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIssLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("📤 Submitting data:", {
      nodeID,
      storyId,
      ...userInput,
    });

    const result = await postDataToDb(
      nodeID,
      storyId,
      userInput.nodeTitle,
      userInput.nodeType,
      userInput.emotionalTone,
      userInput.tags,
      userInput.storyContent,
      userInput.choices,
      userInput.positions
    );

    console.log("📥 Result:", result);
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
      <div>
        <div className="bg-custom-gray-500 w-full p-3 pt-24 overflow-x-auto">
          <div className="lg:max-w-7xl lg:mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <PencilIcon className="w-4 h-4 text-purple-500 lg:w-6 lg:h-6" />
                </div>
                <div>
                  <p className="text-white font-semibold lg:text-lg">
                    Story Editor
                  </p>
                  <p className="text-slate-400 text-sm lg:text-sm">
                    ID: node_170934
                  </p>
                </div>
              </div>

              <div>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all flex items-ce gap-2">
                  <Sparkles className="text-white" />
                  <p className="text-white font-semibold">AI Assist</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:max-w-7xl lg:mx-auto">
          <div className="p-5">
            <div>
              <button
                className="px-4 py-2 rounded-lg transition-all flex items-center gap-2  
                   bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5">
              <div className="bg-custom-gray-700 p-4 rounded border border-slate-800">
                <div className="flex items-center gap-3">
                  <div>
                    <Tag className="w-4 h-4 text-purple-500 lg:w-6 lg:h-6" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">
                      Node Configuration
                    </p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="grid grid-cols-2  gap-4">
                    <div>
                      <div className="mb-2">
                        <label className="text-slate-400 text-sm">
                          Node Title
                        </label>
                      </div>
                      <div>
                        <input
                          name="nodeTitle"
                          value={userInput.nodeTitle}
                          onChange={handleUserInput}
                          className="w-full bg-custom-gray-800 border border-slate-700 rounded focus:outline-none focus:border-purple-500 transition-colors px-4 py-2 placeholder:text-slate-600 text-white"
                          placeholder="Enter Title..."
                          disabled={storySaved}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2">
                        <label className="text-slate-400 text-sm">
                          Node Type
                        </label>
                      </div>
                      <select
                        name="nodeType"
                        value={userInput.nodeType}
                        onChange={handleUserInput}
                        disabled={storySaved}
                        className=" bg-custom-gray-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors text-white w-full"
                      >
                        <option value="Story">Story</option>
                        <option value="Choice">Choice</option>
                        <option value="Ending">Ending</option>
                        <option value="Character">Character</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <div className="mb-2">
                        <label className="text-slate-400 text-sm">Tags</label>
                      </div>
                      <div>
                        <input
                          name="tags"
                          value={userInput.tags}
                          onChange={handleUserInput}
                          className="w-full bg-custom-gray-800 border border-slate-700 rounded focus:outline-none focus:border-purple-500 transition-colors px-4 py-2 placeholder:text-slate-600 text-white"
                          placeholder="Enter Tags..."
                          disabled={storySaved}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2">
                        <label className="text-slate-400 text-sm">
                          Emotional Tone
                        </label>
                      </div>
                      <select
                        name="emotionalTone"
                        value={userInput.emotionalTone}
                        onChange={handleUserInput}
                        disabled={storySaved}
                        className=" bg-custom-gray-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors text-white w-full"
                      >
                        <option value="Mysterious">Mysterious</option>
                        <option value="Tense">Tense</option>
                        <option value="Hopeful">Hopeful</option>
                        <option value="Dark">Dark</option>
                        <option value="Peaceful">Peaceful</option>
                        <option value="Action">Action</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="bg-custom-gray-700 p-4 rounded border border-slate-800">
                  <div>
                    <div className="flex items-center gap-3">
                      <div>
                        <MessageSquare className="w-4 h-4 text-purple-500 lg:w-6 lg:h-6" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-lg">
                          Story Content
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <textarea
                      name="storyContent"
                      value={userInput.storyContent}
                      onChange={handleUserInput}
                      className="bg-custom-gray-800 border border-slate-700 rounded focus:outline-none focus:border-purple-500 transition-colors px-4 py-2 placeholder:text-slate-600 text-white w-full resize-y min-h-[200px]"
                      placeholder="Write your story content here..."
                      disabled={storySaved}
                    />
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <div>
                      <Calendar className="text-slate-400 w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[12px] text-slate-400 font-semibold">
                        Last edited: 2 minutes ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {userInput.nodeType === "Choice" && (
                <div className="mt-5">
                  <div className="bg-custom-gray-700 p-4 rounded border border-slate-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold text-lg">
                          Player Choices
                        </p>
                      </div>
                      <div>
                        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all flex items-center gap-2 text-sm text-white">
                          + Add Choice
                        </button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="bg-emerald-500/20 border-emerald-500 text-emerald-300 p-4 rounded border-2">
                        <div className="grid grid-cols-2  gap-4">
                          <div>
                            <div className="mb-2">
                              <label className="text-slate-400 text-sm">
                                Choice Text
                              </label>
                            </div>
                            <div>
                              <input
                                name="choices"
                                value={userInput.choices}
                                onChange={handleUserInput}
                                className="w-full bg-custom-gray-800 border border-slate-700 rounded focus:outline-none focus:border-purple-500 transition-colors px-4 py-2 placeholder:text-green-700 placeholder:font-semibold text-white"
                                placeholder="Enter Text..."
                              />
                            </div>
                          </div>

                          <div>
                            <div className="mb-2">
                              <label className="text-slate-400 text-sm">
                                Color
                              </label>
                            </div>
                            <select className=" bg-custom-gray-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors text-green-700 font-semibold w-full">
                              <option value="green">Green</option>
                              <option value="red">Red</option>
                              <option value="blue">Blue</option>
                              <option value="purple">Purple</option>
                              <option value="yellow">Yellow</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2  gap-4">
                          <div>
                            <div className="mb-2">
                              <label className="text-slate-400 text-sm">
                                Consequences
                              </label>
                            </div>
                            <div>
                              <input
                                className="w-full bg-custom-gray-800 border border-slate-700 rounded focus:outline-none focus:border-purple-500 transition-colors px-4 py-2 placeholder:text-green-700 placeholder:font-semibold text-white"
                                placeholder="Brief Description..."
                              />
                            </div>
                          </div>

                          <div>
                            <div className="mb-2">
                              <label className="text-slate-400 text-sm">
                                Target NodeID
                              </label>
                            </div>
                            <div>
                              <input
                                className="w-full bg-custom-gray-800 border border-slate-700 rounded focus:outline-none focus:border-purple-500 transition-colors px-4 py-2 placeholder:text-green-700 placeholder:font-semibold text-white"
                                placeholder="Enter NodeID..."
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-5 flex items-center justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg transition-all flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Save className="text-white w-4 h-4" />
                  Save Story
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
