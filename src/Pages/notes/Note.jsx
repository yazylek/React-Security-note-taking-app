import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";

const Note = ({ parsedNote, id, content }) => {
  return (
    <div>
      <div className=" relative border p-4 rounded-xl min-h-[20rem] max-h-[20rem] transition-all hover:shadow-lg hover:-translate-y-1">
        <p dangerouslySetInnerHTML={{ __html: content }}></p>

        <Link to={`/notes/${id}`}>
          <Pencil className="absolute right-4 bottom-4 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default Note;
