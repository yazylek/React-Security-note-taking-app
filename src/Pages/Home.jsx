import transition from "../transition.jsx";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <section className="bg-darkerWhite container mx-auto py-32 pb-28">
        <div className=" flex flex-col items-center gap-4">
          <h1 className="text-5xl font-bold">Welcome to Notees</h1>
          <p className="text-md max-w-[65ch] text-center">
            Your personal space for capturing ideas, organizing thoughts, and
            boosting productivity.
          </p>
          <Link to="/signup">
            <Button variant="outline" className="px-8">
              Get started
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default transition(Home);
