import React, { useCallback, useEffect } from "react";
import ReactQuill from "react-quill";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import "quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Trash2 } from "lucide-react";
import Modal from "@/components/Modal";

const EditNotes = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState(null);
  const [content, setContent] = useState(note?.parsedNote);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  // const handleSave = async () => {
  //   if (value === "") {
  //     setError("Please enter a note");
  //     return toast.error("Please enter a note", error);
  //   }

  //   try {
  //     setLoading(true);
  //     const createdAt = new Date();
  //     const noteData = { content: value };
  //     console.log(noteData);

  //     await api.post("/notes", noteData);

  //     toast.success("Note has been created");
  //     navigate("/notes");
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchNote = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/notes");
      const singleNote = response.data.find((n) => n.id.toString() === id);
      if (singleNote) {
        singleNote.parsedNote = JSON.parse(singleNote.content).content;
        setNote(singleNote);
      } else {
        setError("Note not found");
      }
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const changeNoteHandler = async () => {
    // if (content.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
    //   return toast.error("Please enter a note");
    // }

    try {
      console.log(content);
      setLoading(true);
      const noteData = JSON.stringify({ content: content });
      await api.put(`/notes/${id}`, noteData);
      toast.success("Note has been updated");
      navigate(-1);
      fetchNote();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const onNoteChange = (con) => {
    setContent(con);
  };

  useEffect(() => {
    if (note?.parsedNote) {
      setContent(note.parsedNote);
    }
  }, [note?.parsedNote]);

  useEffect(() => {
    if (id) {
      fetchNote();
    }
  }, [fetchNote]);

  return (
    <>
      <div className="h-screen flex flex-col items-center mt-12 gap-8">
        <h1 className="text-3xl font-bold">Update your note</h1>

        <ReactQuill
          className="container mx-auto h-[25rem] "
          theme="snow"
          value={content}
          onChange={onNoteChange}
        />
        <div className="flex justify-between items-center w-full container mx-auto ">
          <Button
            {...(loading ? "disabled" : "Loading...")}
            onClick={changeNoteHandler}
            variant="outline"
            size="lg"
            className="mt-8 self-center ml-12"
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
          <button
            onClick={openModalHandler}
            className="hover:translate-y-[-2px] transition-all"
          >
            <Trash2 size={30} className="mr-12 mt-4 cursor-pointer " />
          </button>
        </div>
      </div>

      {modalOpen && <Modal id={id} setModalOpen={setModalOpen} />}
    </>
  );
};

export default EditNotes;
