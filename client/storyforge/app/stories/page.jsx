"use client";
import React, { useEffect, useState } from "react";
import NoResultFound from "../components/NoResultFound";
import { BookOpen, Calendar, Timer, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";

import ProtectedRoute from "../components/ProtectedRoute";
import useStoryCards from "../store/useStoryCards";
import Link from "next/link";

const page = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    genre: "Fantasy",
  });
  const {
    createdStoryCard,
    loading,
    error,
    postStoryCards,
    fetchStoryCards,
    fetchedStories,
  } = useStoryCards();
  useEffect(() => {
    fetchStoryCards();
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

    if (!userInput.title.trim()) {
      alert("Please enter a story title");
      return;
    }

    if (!userInput.description.trim()) {
      alert("Please enter a description");
      return;
    }

    try {
      await postStoryCards(
        userInput.title,
        userInput.description,
        userInput.genre
      );

      setModalIsOpen(false);
      setUserInput({
        title: "",
        description: "",
        genre: "Fantasy",
      });

      await fetchStoryCards();

      alert("Story created successfully!");
    } catch (error) {
      alert(error.message || "Failed to create story");
    }
  };

  console.log("fetched stories: ", fetchedStories);
  return (
    <>
      <ProtectedRoute>
        <div className="pt-20">
          <div className="bg-custom-gray-300 border-b border-slate-800 p-4">
            <div className="lg:max-w-7xl lg:mx-auto">
              <div className="px-4 space-y-1 ">
                <p className="text-white font-semibold text-2xl">My Stories</p>
                <p className="text-slate-400 text-sm">
                  Create and manage your story projects
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 lg:max-w-7xl lg:mx-auto">
            <div className="flex items-center gap-2">
              <input
                className="bg-custom-gray-300 w-full p-4 placeholder:text-slate-400 rounded-md border border-slate-800 focus:outline-none focus:border-gray-700 transition-colors text-white"
                placeholder="Search Stories..."
              />

              <div>
                <button
                  onClick={() => setModalIsOpen(true)}
                  className="bg-blue-700 text-white font-semibold md:text-lg p-4 lg:p-3 rounded whitespace-nowrap hover:bg-blue-800 transition-colors duration-300"
                >
                  + New Story
                </button>
              </div>
            </div>

            {fetchedStories.length === 0 && !loading && <NoResultFound />}

            {/*Story Cards */}
            <div className="mt-7 space-y-5 md:grid md:grid-cols-2 lg:grid md:gap-3 lg:grid-cols-3 lg:gap-4">
              {fetchedStories.map((story, index) => (
                <Link href={`/stories/${story._id}`} key={story._id || index}>
                  <div className="bg-custom-gray-300 border border-slate-800 p-4 rounded-md lg:p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-600/20 rounded flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        {" "}
                        <p className="text-white font-semibold">
                          {story.title}
                        </p>
                        <p className="text-slate-400 line-clamp-2 text-sm mt-1">
                          {story.description}
                        </p>
                        <div className="mt-2">
                          <span className="inline-block px-2 py-1 text-xs rounded bg-blue-600/20 text-blue-400">
                            {story.genre}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Nodes Section */}
                    <div className="mt-3 p-2">
                      <div className="border-b border-slate-800">
                        <p className="text-slate-500 text-[13px] mb-3">
                          12 nodes
                        </p>
                      </div>
                    </div>

                    {/* Timestamps */}
                    <div className="mt-2 px-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Timer className="text-slate-600 w-4 h-4" />
                          <p className="text-slate-600 text-[13px]">
                            {formatDistanceToNow(new Date(story.createdAt), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="text-slate-600 w-4 h-4" />
                          <p className="text-slate-600 text-[13px]">
                            {format(new Date(story.createdAt), "do MMMM yy")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {modalIsOpen && (
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
                            Create New Story
                          </p>
                        </div>
                        <div className="p-5">
                          <X
                            onClick={() => setModalIsOpen(false)}
                            className="text-slate-500 hover:text-slate-400"
                          />
                        </div>
                      </div>
                      <div className="p-5">
                        <div>
                          <form onSubmit={handleSubmit}>
                            <div>
                              <label className="text-slate-400 font-semibold">
                                Story Title
                              </label>
                              <input
                                name="title"
                                value={userInput.title}
                                onChange={handleUserInput}
                                className="bg-custom-gray-300 w-full p-2 placeholder:text-slate-400 rounded-md border border-slate-800 focus:outline-none focus:border-gray-700 transition-colors text-white mt-2"
                                placeholder="Enter story title..."
                              />
                            </div>

                            <div className="mt-4">
                              <label className="text-slate-400 font-semibold">
                                Description
                              </label>
                              <textarea
                                name="description"
                                value={userInput.description}
                                onChange={handleUserInput}
                                className="bg-custom-gray-300 w-full p-2 placeholder:text-slate-400 rounded-md border border-slate-800 focus:outline-none focus:border-gray-700 transition-colors text-white mt-2  resize-none"
                                placeholder="Brief description of story..."
                              />
                            </div>

                            <div className="mt-4">
                              <label className="block text-sm text-gray-400 mb-2">
                                Genre
                              </label>
                              <select
                                name="genre"
                                value={userInput.genre}
                                onChange={handleUserInput}
                                className="w-full px-3 py-2 bg-[#0d1b2a] border border-gray-800 rounded text-gray-300 focus:outline-none focus:border-gray-700 transition-colors"
                              >
                                <option>Fantasy</option>
                                <option>Sci-Fi</option>
                                <option>Horror</option>
                                <option>Romance</option>
                                <option>Mystery</option>
                                <option>Adventure</option>
                                <option>Thriller</option>
                                <option>Historical</option>
                              </select>
                            </div>

                            <div className="mt-4">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <button
                                    type="button"
                                    onClick={() => setModalIsOpen(false)}
                                    className="text-slate-300 bg-slate-600 p-4 rounded w-full hover:bg-slate-700 duration-200 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                                <div>
                                  <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-700 text-white p-4 rounded w-full hover:bg-blue-800 duration-200 transition-colors"
                                  >
                                    {loading ? "Creating..." : "Create Story"}
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
            )}
          </AnimatePresence>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default page;
