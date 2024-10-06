import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

const Note = ({ parsedNote, id, content }) => {
  return (
    <div>
      <div className="border p-4 rounded-xl min-h-[20rem] max-h-[20rem] transition-all hover:shadow-lg hover:-translate-y-1">
        <p dangerouslySetInnerHTML={{ __html: content }}></p>
      </div>
    </div>
  );
};

export default Note;
