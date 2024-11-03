"use client";

import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import React from "react";

interface ImageUploadButtonProps {
  onUpload: (result: CloudinaryUploadWidgetResults) => void;
}

const ImageUploadButton = ({ onUpload }: ImageUploadButtonProps) => {
  return (
    <CldUploadWidget
      uploadPreset="o383zzon"
      onSuccess={(result) => {
        onUpload(result);
      }}
    >
      {({ open }) => {
        return (
          <button
            className="w-full justify-start text-left font-normal"
            onClick={() => open?.()}
          >
            Upload
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUploadButton;
