import axios from 'axios';
import {convertBlobUrlToFile} from './upImage'

const uploadImagesToCloudinary = async (files) => {
    let imageList = []
    const uploadPromises = files.map(async (file, index) => {
      const formData = new FormData();
      const fileBlob = await convertBlobUrlToFile(file, `image${index}.png`);
      formData.append('file', fileBlob);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  
      try {
        const cloudinaryResponse = await axios.post(  
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return cloudinaryResponse.data;
      } catch (error) {
        console.error('Error uploading image:', error);
        return null;
      }
    });
  
    const responses = await Promise.all(uploadPromises);
  
    responses.forEach((res,index) =>{
      if (res === null) {
        imageError += `Image ${index} encountered an error.\n`
      }else{
      imageList.push(res.secure_url)}
  })
  
    return imageList;
  };
export default uploadImagesToCloudinary