import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import InputDefault from "./InputDefault";
import InputFileDefault from "./FileInput";
import RadioDefault from "./RadioDefault";
import uploadimagesToCloudinary from "../utils/uploadimages";
import { addProperty, updateProperty } from "../api/auth";
import { notify } from "../utils/toastify";
function Add({ data, type, refeshFunction }) {
  const [loading, setLoading] = useState(false);
  const [file, setFiles] = useState(type === "update" ? data.images : []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const storedState = JSON.parse(localStorage.getItem("dat"));
      const id = storedState?.state?.current;
      const uploadedimages = await uploadimagesToCloudinary(file);
      formData.images = uploadedimages;
      if (type === "update") {
        formData.PropertyId = data.id;
        const res = await updateProperty(formData);
        notify(res.data.message);
        refeshFunction();
      } else {
        formData.agentId = id;
        const res = await addProperty(formData);
        notify(res.data.message);
        refeshFunction();
      }
    } catch (error) {
      notify(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    return () => {
      file.forEach((image) => {
        URL.revokeObjectURL(image);
      });
    };
  }, [file]);

  const handleImageChange = (e) => {
    const fileArray = Array.from(e.target.files);
    const fileUrls = fileArray.map((file) => URL.createObjectURL(file));
    setFiles(fileUrls);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-4 grid-rows-4"
    >
      <InputDefault
        defaultInput={type == "update" ? data.size : ""}
        label="size"
        placeholder="Enter your size"
        type="number"
        validate={{ required: "size is required" }}
        register={register}
        error={errors}
      />
      <InputDefault
        defaultInput={type == "update" ? data.price : ""}
        label="price"
        placeholder="Enter your price"
        type="number"
        validate={{ required: "price is required" }}
        register={register}
        error={errors}
      />
      <InputDefault
        defaultInput={
          type == "update"
            ? new Date(data.LaterUpdate).toISOString().split("T")[0]
            : ""
        }
        label="LaterUpdate"
        placeholder="Enter your LaterUpdate"
        type="date"
        validate={{ required: "LaterUpdate is required" }}
        register={register}
        error={errors}
      />
      <InputDefault
        defaultInput={type == "update" ? data.name : ""}
        label="name"
        placeholder="Enter your name"
        type="text"
        validate={{ required: "name is required" }}
        register={register}
        error={errors}
      />
      <InputDefault
        defaultInput={type == "update" ? data.description : ""}
        label="description"
        placeholder="Enter your description"
        type="text"
        validate={{ required: "description is required" }}
        register={register}
        error={errors}
      />
      <RadioDefault
        label="status"
        validate={{ required: "status is required" }}
        register={register}
        error={errors}
        option={[
          { label: "Already", value: "already" },
          { label: "Pending", value: "pending" },
          { label: "Updating", value: "updating" },
        ]}
      />
      <InputDefault
        defaultInput={type == "update" ? data.address : ""}
        label="address"
        placeholder="Enter your address"
        type="text"
        validate={{ required: "address is required" }}
        register={register}
        error={errors}
      />
      <InputFileDefault
        label="images"
        type="file"
        validate={""}
        register={(name, options) =>
          register(name, { ...options, onChange: handleImageChange })
        }
        multiple={true}
        error={errors}
      />
      <div className="col-start-1 col-end-5 flex gap-2">
        {file.length > 0 &&
          file.map((item, index) => (
            <img
              key={index}
              src={item}
              altInput={`preview-${index}`}
              style={{ width: "5%", maxHeight: "auto", objectFit: "cover" }}
            />
          ))}
      </div>
      {loading && <p>Loading...</p>}
      <button
        type="submit"
        className="col-start-1 col-end-5 mt-4 bg-blue-500 text-white py-2 px-4 w-full rounded hover:bg-blue-600"
      >
        {type === "update" ? "update" : "add"}
      </button>
    </form>
  );
}

export default Add;
