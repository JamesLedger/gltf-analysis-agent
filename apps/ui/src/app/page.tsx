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
import { getUploadUrl } from "./actions";

export default function Home() {
  const [files, setFiles] = useState<File[] | undefined>();
  const [isUploading, setIsUploading] = useState(false);

  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const file = files[0];
      const { url, key } = await getUploadUrl(file.name);

      // Upload the file to S3 using the presigned URL
      const response = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.ok) {
        console.log("Upload successful! Key:", key);
        // TODO: Trigger analysis or navigate to results
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen w-full p-6 flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            gLTF Analysis Agent
          </CardTitle>
          <CardDescription>
            Upload a GLTF or GLB file to analyze its structure, materials, and
            performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Dropzone
            accept={{
              "model/gltf-binary": [".glb"],
              "model/gltf+json": [".gltf"],
            }}
            maxFiles={1}
            onDrop={handleDrop}
            onError={console.error}
            src={files}
            disabled={isUploading}
          >
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            disabled={!files || isUploading}
            onClick={handleUpload}
            className="w-full"
            size="lg"
          >
            {isUploading ? "Uploading..." : "Analyze File"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
