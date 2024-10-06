import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Book, Calendar, Feather } from "lucide-react";

export default function Features() {
  return (
    <section className="container mx-auto">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-3xl font-bold">Key Features</h1>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-12">
        <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <Feather className="h-10 w-10" />
            <CardTitle>Easy Note-Taking</CardTitle>
            <CardDescription>
              Quickly jot down your thoughts and ideas with our intuitive
              interface.
            </CardDescription>
          </CardHeader>
          <CardContent>
            Create, edit, and organize your notes effortlessly. Our
            user-friendly design ensures a smooth note-taking experience.
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <Book className="h-10 w-10" />
            <CardTitle>Smart Organization</CardTitle>
            <CardDescription>
              Keep your notes organized with tags, folders, and smart search.
            </CardDescription>
          </CardHeader>
          <CardContent>
            Never lose track of your ideas. Our powerful organization tools help
            you categorize and find your notes instantly.
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <Calendar className="h-10 w-10" />
            <CardTitle>Sync Across Devices</CardTitle>
            <CardDescription>
              Access your notes anytime, anywhere, on any device.
            </CardDescription>
          </CardHeader>
          <CardContent>
            Seamlessly sync your notes across all your devices. Start on your
            phone and continue on your computer without missing a beat.
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
