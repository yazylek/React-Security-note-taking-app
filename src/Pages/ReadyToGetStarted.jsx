import { Button } from "@/components/ui/button";
import React from "react";

export default function ReadyToGetStarted() {
  return (
    <section className="bg-darkerWhite container mx-auto py-11 pb-20">
      <div className=" flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Ready to get started?</h1>
        <p className="text-md max-w-[65ch] text-gray-500 text-center">
          Join thousands of users who have already transformed their note-taking
          experience with NoteWorthy.
        </p>

        <Button variant="outline" className="px-8">
          Sign Up Now
        </Button>
      </div>
    </section>
  );
}
