import React, { useState, useRef } from 'react';

function ProfilePictureUploader({
  initialImageUrl = null,
  onFileSelect = () => {},
  onImageRemove = () => {},
  className = '',
}) {
  const [imagePreview, setImagePreview] = useState(initialImageUrl);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      onFileSelect(file);
    } else {
      setImagePreview(initialImageUrl);
      onFileSelect(null);
    }
  };

  const handleContainerClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveClick = (event) => {
    event.stopPropagation(); // Prevent triggering file input click
    setImagePreview(initialImageUrl);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input
    }
    onImageRemove();
    onFileSelect(null); // Also signal that no file is selected
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center cursor-pointer group hover:opacity-75 transition-opacity duration-200"
        onClick={handleContainerClick}
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Profile Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            className="w-16 h-16 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M24 20.993V24H0v-2.996h1.537A8.25 8.25 0 0112 16.5a8.25 8.25 0 0110.463 4.493H24zM12 13a6 6 0 100-12 6 6 0 000 12z"
            />
          </svg>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        {imagePreview && (
          <button
            type="button"
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={handleRemoveClick}
            aria-label="Remove image"
          >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
      </div>
      <p className="mt-2 text-sm text-gray-600">Click to upload</p>
    </div>
  );
}

export default ProfilePictureUploader; 