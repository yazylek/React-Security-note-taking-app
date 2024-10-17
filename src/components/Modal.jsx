import React from "react";
import api from "../../services/api";
import { Button } from "./ui/button";
import { Card, CardHeader } from "./ui/card";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";

const Modal = ({ id, setModalOpen }) => {
  const navigate = useNavigate();
  const deleteNoteHandler = async () => {
    try {
      await api.delete(`/notes/${id}`);
      console.log(response);
      navigate("/notes");
    } catch (error) {
      console.log(error);
      navigate("/notes");
    }
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center relative">
      <Card className="flex flex-col justify-center items-center bg-gray-200 w-[30vw] h-[25vh] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <CardHeader className="font-bold text-xl">
          Do you want to delete your note?
        </CardHeader>
        <div className="flex gap-4">
          <Button onClick={deleteNoteHandler}>Delete</Button>
          <Button onClick={closeModalHandler}>Cancel</Button>
        </div>
      </Card>
    </div>
  );
};

export default Modal;
