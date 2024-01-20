"use client";
import React, { useState } from "react";
import { useEdgeStore } from "@/utils/edgestore/edgestore";
import { SingleImageDropzone } from "@/app/components/Edgestore";
import { Button, Progress } from "@nextui-org/react";

export default function DashboardProductImage({
  setImageUrl,
}: {
  setImageUrl: (url: string) => void;
}) {
  const [file, setFile] = React.useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const { edgestore } = useEdgeStore();

  return (
    <div className="w-fit flex flex-col gap-y-2 mb-5">
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 1,
          accept: {
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
          },
        }}
        onChange={(file) => {
          setFile(file);
        }}
      />
      <div>
        <Progress
          aria-label="Upload..."
          value={progress}
          color={progress == 100 ? "success" : "primary"}
        />
      </div>
      <Button
        color="primary"
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                setProgress(progress);
              },
            });
            setImageUrl(res.url);
          }
        }}
      >
        Bild bestätigen
      </Button>
    </div>
  );
}
