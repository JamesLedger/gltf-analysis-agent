"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { useState } from "react";

export default function Home() {
  const [files, setFiles] = useState<File[] | undefined>();
  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
  };

  return (
    <div className="w-full p-6 flex justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>gLTF Analysis Agent</CardTitle>
          <CardDescription>Upload a GLTF file to analyze</CardDescription>
        </CardHeader>
        <CardContent>
          <Dropzone
            accept={{ ".glb": [], ".gltf": [] }}
            maxFiles={1}
            onDrop={handleDrop}
            onError={console.error}
            src={files}
          >
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button disabled={!files}>Upload File</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
