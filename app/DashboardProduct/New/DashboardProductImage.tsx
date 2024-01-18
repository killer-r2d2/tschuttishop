"use client";
import React from "react";
import { useEdgeStore } from "@/utils/edgestore/edgestore";

export default function DashboardProductImage({
  setImageUrl,
}: {
  setImageUrl: (url: string) => void;
}) {
  const [file, setFile] = React.useState<File>();
  const { edgestore } = useEdgeStore();

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <button
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                // you can use this to show a progress bar
                console.log(progress);
              },
            });
            // you can run some server action or api here
            // to add the necessary data to your database
            console.log(res.url);
            setImageUrl(res.url);
          }
        }}
      >
        Upload
      </button>
    </div>
  );
}
