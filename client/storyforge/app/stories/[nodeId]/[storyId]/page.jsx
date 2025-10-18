import React from "react";

const page = async ({ params }) => {
  const storyId = await params;
  console.log("StoryId: ", storyId);
  return <></>;
};

export default page;
