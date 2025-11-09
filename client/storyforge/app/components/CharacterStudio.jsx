import { Edit, Loader2, Trash2, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import useCharacter from "../store/useCharacter";
import Link from "next/link";

const CharacterStudio = ({ storyId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userInput, setUserInput] = useState({
    characterName: "",
    backstory: "",
    personality: "",
    traits: "",
  });
  const [submitError, setSubmitError] = useState();
  const [characterData, setCharacterData] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCharacterId, setEditingCharacterId] = useState(null);

  const {
    error,
    loading,
    characterSaved,
    savedDataMessage,
    postCharacterToDB,
    fetchCharacterFromDB,
    updateCharacterInfo,
    receivedData,
  } = useCharacter();

  useEffect(() => {
    const fetchCharacterData = async () => {
      const result = await fetchCharacterFromDB(storyId);

      if (result.success) {
        setCharacterData((prev) => ({
          ...prev,
          result: result.data.characterData,
        }));
      }
    };

    fetchCharacterData();
  }, [characterSaved, postCharacterToDB, savedDataMessage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmitCharacter = async (e) => {
    e.preventDefault();

    console.log("Submitting data:", userInput);

    if (editingCharacterId) {
      const result = await updateCharacterInfo(storyId, editingCharacterId, {
        characterName: userInput.characterName,
        backstory: userInput.backstory,
        personality: userInput.personality,
        traits: userInput.traits,
      });
      if (result && result.success) {
        setModalIsOpen(false);
        setEditingCharacterId(null);
        setUserInput({
          characterName: "",
          backstory: "",
          personality: "",
          traits: "",
        });
        setSuccessMessage(true);
        console.log("Information updated successfully.");

        setTimeout(() => {
          setSuccessMessage(false);
        }, 5000);
      }
    } else {
      const result = await postCharacterToDB(
        userInput.characterName,
        userInput.backstory,
        userInput.personality,
        userInput.traits,
        storyId
      );

      if (result && result.success) {
        setModalIsOpen(false);
        setUserInput({
          characterName: "",
          backstory: "",
          personality: "",
          traits: "",
        });
        setSuccessMessage(true);

        setTimeout(() => {
          setSuccessMessage(false);
        }, 5000);
      }
    }
    if (error) {
      setSubmitError(error);
    }
  };

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (charData) => {
    setModalIsOpen(true);
    setEditingCharacterId(charData._id);
    setUserInput((prev) => ({
      ...prev,
      characterName: charData.characterName,
      backstory: charData.backstory,
      personality: Array.isArray(charData.personality)
        ? charData.personality.join(", ")
        : charData.personality,
      traits: Array.isArray(charData.traits)
        ? charData.traits.join(", ")
        : charData.traits,
    }));
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setEditingCharacterId(null);
    setUserInput(() => ({
      characterName: "",
      backstory: "",
      personality: "",
      traits: "",
    }));
  };

  if (isLoading || loading) {
    return (
      <div className="pt-20 min-h-screen w-screen flex bg-custom-gray-100 items-center justify-center flex-col gap-4">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
        <p className="text-white">
          {loading ? "Fetching Character Data..." : "Loading Characters..."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="">
        <div className="mt-4 p-4 lg:max-w-7xl lg:mx-auto">
          {/*Header*/}
          <div className="flex items-center gap-1">
            <User className="text-slate-500" />
            <p className="text-white font-bold text-2xl">Character Studio</p>
          </div>

          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
              >
                <div className="bg-green-600 border border-green-500 rounded-lg shadow-lg p-4 flex items-center gap-3">
                  {/* Success Icon */}
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  {/* Message Text */}
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm sm:text-base">
                      Character Created! Kindly refresh the page.
                    </p>
                    <p className="text-green-100 text-xs sm:text-sm">
                      Your character has been saved successfully.
                    </p>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setSuccessMessage(false)}
                    className="flex-shrink-0 text-white hover:text-green-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!characterData.result && (
            <div className="text-center py-12">
              <User size={48} className="text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg mb-2">No characters yet</p>
              <p className="text-slate-500 text-sm">
                Create your first character to get started
              </p>
            </div>
          )}
          <div className="mt-6 space-y-4 lg:grid lg:grid-cols-2 lg:gap-4">
            {/*Character Card*/}
            {characterData.result ? (
              characterData.result.map((charData) => (
                <div key={charData._id}>
                  <div className="bg-custom-gray-500 p-4 border border-slate-800 rounded shadow-md shadow-slate-800 mb-5">
                    <div className="flex items-start gap-2 justify-between">
                      <Link
                        href={`/stories/${storyId}/character/${charData.characterId}`}
                      >
                        <p className="text-white font-semibold text-lg hover:text-white/80">
                          {charData.characterName}
                        </p>
                        <div className="flex items-center gap-2">
                          {charData.personality.map((char, index) => (
                            <p key={index} className="text-slate-400 text-sm">
                              {char},
                            </p>
                          ))}
                        </div>
                      </Link>
                      <div className="flex items-center gap-2">
                        <Edit
                          onClick={() => handleUpdate(charData)}
                          className="text-purple-400 hover:scale-110 duration-200 ease-in cursor-pointer"
                        />
                        <Trash2 className="text-red-400 hover:scale-110 duration-200 ease-in cursor-pointer" />
                      </div>
                    </div>
                    <div className="mt-5">
                      <div>
                        <div>
                          <p className="text-slate-300 text-sm">
                            {charData.backstory}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          {charData.traits.map((trait, index) => (
                            <div
                              key={index}
                              className="bg-white/20 p-2 rounded-full"
                            >
                              <p className="text-white/70 text-sm">{trait}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white">No characters found</div>
            )}
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
                              onClick={handleCloseModal}
                              className="text-slate-500 hover:text-slate-400 cursor-pointer"
                            />
                          </div>
                        </div>
                        <div className="p-5">
                          <div>
                            <form onSubmit={handleSubmitCharacter}>
                              <div>
                                <label className="text-slate-400 font-semibold">
                                  Character Name
                                </label>
                                <input
                                  name="characterName"
                                  value={userInput.characterName}
                                  onChange={handleUserInput}
                                  className="bg-custom-gray-300 w-full p-2 placeholder:text-slate-400 rounded-md border border-slate-800 focus:outline-none focus:border-gray-700 transition-colors text-white mt-2"
                                  placeholder="e.g Marcus the Wise..."
                                  required
                                />
                              </div>

                              <div className="mt-4">
                                <label className="text-slate-400 font-semibold">
                                  Backstory
                                </label>
                                <textarea
                                  name="backstory"
                                  value={userInput.backstory}
                                  onChange={handleUserInput}
                                  className="bg-custom-gray-300 w-full p-2 placeholder:text-slate-400 rounded-md border border-slate-800 focus:outline-none focus:border-gray-700 transition-colors text-white mt-2  resize-none"
                                  placeholder="Describe the history and motivations..."
                                  required
                                />
                              </div>

                              <div>
                                <label className="text-slate-400 font-semibold">
                                  Personality
                                </label>
                                <input
                                  name="personality"
                                  value={userInput.personality}
                                  onChange={handleUserInput}
                                  className="bg-custom-gray-300 w-full p-2 placeholder:text-slate-400 rounded-md border border-slate-800 focus:outline-none focus:border-gray-700 transition-colors text-white mt-2"
                                  placeholder="e.g wise, cautious, mysterious..."
                                  required
                                />
                              </div>

                              <div>
                                <label className="text-slate-400 font-semibold">
                                  Traits (comma-separated)
                                </label>
                                <input
                                  name="traits"
                                  value={userInput.traits}
                                  onChange={handleUserInput}
                                  className="bg-custom-gray-300 w-full p-2 placeholder:text-slate-400 rounded-md border border-slate-800 focus:outline-none focus:border-gray-700 transition-colors text-white mt-2"
                                  placeholder="e.g wise, patient, mysterious..."
                                  required
                                />
                              </div>

                              <div className="mt-4">
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <button
                                      type="button"
                                      onClick={handleCloseModal}
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
