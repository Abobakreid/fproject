import React, { useState } from "react";

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState({});
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
      console.log(reader.result, "sssloa");
    };
  }
  return (
    <div>
      <img style={{ width: "300px", objectFit: "fill" }} src={preview} alt="" />
    </div>
  );
};

export default PreviewImage;
