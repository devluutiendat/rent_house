import axios from "axios";

export const convertBlobUrlToFile = async (blobUrl, filename) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type || 'image/png'});
  };
 const uploadSingleImageToCloudinary = async (file) => {
    const formData = new FormData();
    const newFile = await convertBlobUrlToFile(file,"avatar.png")
    formData.append('file', newFile);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  
    try {
      // Upload the image to Cloudinary
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      
      return cloudinaryResponse.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };
  
  export default uploadSingleImageToCloudinary