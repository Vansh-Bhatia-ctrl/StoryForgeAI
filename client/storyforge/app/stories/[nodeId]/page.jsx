import ProtectedRoute from "@/app/components/ProtectedRoute";
import StoryEditor from "@/app/components/StoryEditor";
import React from "react";

const page = async ({ params }) => {
  const { nodeId } = await params;

  return (
    <>
      <ProtectedRoute>
        <StoryEditor storyId={nodeId} />
      </ProtectedRoute>
    </>
  );
};

export default page;
