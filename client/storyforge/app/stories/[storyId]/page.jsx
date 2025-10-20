import ProtectedRoute from "@/app/components/ProtectedRoute";
import StoryEditorNavbar from "@/app/components/StoryEditor";
import React from "react";

const page = async ({ params }) => {
  const { storyId } = await params;

  return (
    <>
      <ProtectedRoute>
        <StoryEditorNavbar storyId={storyId} />
      </ProtectedRoute>
    </>
  );
};

export default page;
