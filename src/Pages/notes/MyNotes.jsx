import transition from "@/transition";
import React, { useEffect, useState } from "react";
import Note from "./Note";
import api from "../../../services/api.js";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const getNotes = async () => {
    try {
      const response = await api.get("/notes");
      const parsedNote = response.data.map((note) => ({
        ...note,
        parsedNote: JSON.parse(note.content).content,
      }));
      setNotes(parsedNote);
      console.log(parsedNote);
    } catch (error) {
      setError(error.response.data.message);
      toast.error("Something went wrong", error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      {notes.length === 0 ? (
        <div className="min-h-screen flex flex-col justify-center items-center ">
          <div className=" flex flex-col justify-center items-center gap-5 p-8 border border-border rounded-xl ">
            <h1 className="text-3xl container mx-auto text-center ">
              You didn't create any note yet
            </h1>
            <Link to="/create-note">
              <Button variant="outline" className="px-8">
                Create Note
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col min-h-screen">
            <h1 className="text-3xl container mx-auto text-center ">
              My Notes
            </h1>
            <div className="grid grid-cols-4 gap-8 container mx-auto mt-8 justify-center items-center ">
              {notes.map((item) => (
                <Note key={item.id} id={item.id} content={item.parsedNote} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default transition(MyNotes);
