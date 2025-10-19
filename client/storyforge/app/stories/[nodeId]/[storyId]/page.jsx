import {
  Calendar,
  Eye,
  MessageSquare,
  PencilIcon,
  Save,
  Sparkles,
  Tag,
} from "lucide-react";
import React from "react";

const page = async ({ params }) => {
  const storyId = await params;
  console.log("StoryId: ", storyId);
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

            <div className="mt-5">
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
                          className="w-full bg-custom-gray-800 border border-slate-700 rounded focus:outline-none focus:border-purple-500 transition-colors px-4 py-2 placeholder:text-slate-600 text-white"
                          placeholder="Enter Title..."
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2">
                        <label className="text-slate-400 text-sm">
                          Node Type
                        </label>
                      </div>
                      <select className=" bg-custom-gray-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors text-white w-full">
                        <option value="story">Story</option>
                        <option value="choice">Choice</option>
                        <option value="ending">Ending</option>
                        <option value="character">Character</option>
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
                          className="w-full bg-custom-gray-800 border border-slate-700 rounded focus:outline-none focus:border-purple-500 transition-colors px-4 py-2 placeholder:text-slate-600 text-white"
                          placeholder="Enter Tags..."
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2">
                        <label className="text-slate-400 text-sm">
                          Emotional Tone
                        </label>
                      </div>
                      <select className=" bg-custom-gray-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors text-white w-full">
                        <option value="mysterious">Mysterious</option>
                        <option value="tense">Tense</option>
                        <option value="hopeful">Hopeful</option>
                        <option value="dark">Dark</option>
                        <option value="peaceful">Peaceful</option>
                        <option value="action">Action</option>
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
                      className="bg-custom-gray-800 border border-slate-700 rounded focus:outline-none focus:border-purple-500 transition-colors px-4 py-2 placeholder:text-slate-600 text-white w-full resize-y min-h-[200px]"
                      placeholder="Write your story content here..."
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

              <div className="mt-5">
                <div className="bg-custom-gray-700 p-4 rounded border border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold text-lg">
                        Player Choice
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
                              className="w-full bg-custom-gray-800 border border-slate-700 rounded focus:outline-none focus:border-purple-500 transition-colors px-4 py-2 placeholder:text-green-700 placeholder:font-semibold text-white"
                              placeholder="Enter Text..."
                            />
                          </div>
                        </div>

                        <div>
                          <div className="mb-2">
                            <label className="text-slate-400 text-sm">
                              Node Type
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

              <div className="mt-5 flex items-center justify-end">
                <button className="px-4 py-2 rounded-lg transition-all flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Save className="text-white w-4 h-4" />
                  Save Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
