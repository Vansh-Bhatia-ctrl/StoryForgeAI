import { Edit, Trash2, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const TRAITS = [
  {
    id: 1,
    label: "brave",
  },
  {
    id: 2,
    label: "loyal",
  },
  {
    id: 3,
    label: "hot-headed",
  },
];

const CharacterStudio = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <div className="">
        <div className="mt-4 p-4 lg:max-w-7xl lg:mx-auto">
          {/*Header*/}
          <div className="flex items-center gap-1">
            <User className="text-slate-500" />
            <p className="text-white font-bold text-2xl">Character Studio</p>
          </div>

          <div className="mt-6 space-y-4 lg:grid lg:grid-cols-2 lg:gap-4">
            {/*Character Card*/}
            <div className="bg-custom-gray-500 p-4 border border-slate-800 rounded hover:scale-102 duration-300 ease-in cursor-pointer shadow-md shadow-slate-800">
              <div className="flex items-start gap-2 justify-between">
                <div>
                  <p className="text-white font-semibold text-lg">
                    Elena the Brave
                  </p>
                  <p className="text-slate-400 text-sm">
                    Couregeous, Determined, Sometimes Reckless
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Edit className="text-purple-400" />
                  <Trash2 className="text-red-400" />
                </div>
              </div>
              <div className="mt-5">
                <div>
                  <div>
                    <p className="text-slate-300 text-sm">
                      A fearless Knight who lost her family due to a dragon
                      attack.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    {TRAITS.map((trait) => (
                      <div
                        key={trait.id}
                        className="bg-white/20 p-2 rounded-full"
                      >
                        <p className="text-white/70 text-sm">{trait.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <button
              onClick={() => setModalIsOpen(true)}
              className="bg-blue-800 p-4 rounded text-white hover:bg-blue-700 transition-all duration-300 ease-in cursor-pointer"
            >
              + New Character
            </button>
          </div>
        </div>

        <AnimatePresence>
          {modalIsOpen && (
            <div className="fixed inset-0 bg-black/50 min-h-screen w-screen">
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-h-screen w-screen bg-black/50 fixed inset-0 flex items-center justify-center p-6"
                >
                  <div className="w-screen lg:max-w-2xl lg:mx-auto">
                    <div className="bg-custom-gray-500 w-full rounded">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-700">
                          <div className="p-5">
                            <p className="text-white font-semibold text-lg">
                              Create New Character
                            </p>
                          </div>
                          <div className="p-5">
                            <X
                              onClick={() => setModalIsOpen(false)}
                              className="text-slate-500 hover:text-slate-400 cursor-pointer"
                            />
                          </div>
                        </div>
                        <div className="p-5">
                          <div>
                            <form>
                              <div>
                                <label className="text-slate-400 font-semibold">
                                  Character Name
                                </label>
                                <input
                                  name="title"
                                  className="bg-custom-gray-300 w-full p-2 placeholder:text-slate-400 rounded-md border border-slate-800 focus:outline-none focus:border-gray-700 transition-colors text-white mt-2"
                                  placeholder="e.g Marcus the Wise..."
                                />
                              </div>

                              <div className="mt-4">
                                <label className="text-slate-400 font-semibold">
                                  Backstory
                                </label>
                                <textarea
                                  name="description"
                                  className="bg-custom-gray-300 w-full p-2 placeholder:text-slate-400 rounded-md border border-slate-800 focus:outline-none focus:border-gray-700 transition-colors text-white mt-2  resize-none"
                                  placeholder="Describe the history and motivations..."
                                />
                              </div>

                              <div>
                                <label className="text-slate-400 font-semibold">
                                  Personality
                                </label>
                                <input
                                  name="title"
                                  className="bg-custom-gray-300 w-full p-2 placeholder:text-slate-400 rounded-md border border-slate-800 focus:outline-none focus:border-gray-700 transition-colors text-white mt-2"
                                  placeholder="e.g wise, cautious, mysterious..."
                                />
                              </div>

                              <div>
                                <label className="text-slate-400 font-semibold">
                                  Traits (comma-separated)
                                </label>
                                <input
                                  name="title"
                                  className="bg-custom-gray-300 w-full p-2 placeholder:text-slate-400 rounded-md border border-slate-800 focus:outline-none focus:border-gray-700 transition-colors text-white mt-2"
                                  placeholder="e.g wise, patient, mysterious..."
                                />
                              </div>

                              <div className="mt-4">
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <button
                                      type="button"
                                      className="text-slate-300 bg-slate-600 p-4 rounded w-full hover:bg-slate-700 duration-200 transition-colors"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                  <div>
                                    <button
                                      type="submit"
                                      className="bg-blue-700 text-white p-4 rounded w-full hover:bg-blue-800 duration-200 transition-colors whitespace-nowrap"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CharacterStudio;
