import { Button } from "@/components/ui/button";
import transition from "@/transition";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../../../services/api.js";
import { useNavigate } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function CreateNote() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSave = async () => {
    if (value === "") {
      setError("Please enter a note");
      return toast.error("Please enter a note", error);
    }

    try {
      setLoading(true);
      const createdAt = new Date();
      const noteData = { content: value };
      console.log(noteData);

      await api.post("/notes", noteData);

      toast.success("Note has been created");
      navigate("/notes");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center mt-12 gap-8">
      <h1 className="text-3xl font-bold">Create a note</h1>
      <ReactQuill
        className="container mx-auto h-[25rem] "
        theme="snow"
        value={value}
        onChange={setValue}
      />
      <Button
        {...(loading ? "disabled" : "Loading...")}
        onClick={handleSave}
        variant="outline"
        size="lg"
        className="mt-8"
      >
        {loading ? (
          <span className="flex justify-center items-center">
            {" "}
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please Wait
          </span>
        ) : (
          "Save"
        )}
      </Button>
    </div>
  );
}
