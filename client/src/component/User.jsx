import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputDefault from "./FileInput";
import InputFileDefault from "./FileInput";
import uploadSingleImageToCloudinary from "../utils/upImage";
import { updateUser } from "../api/auth";
import { notify } from "../utils/toastify";

function AddUser() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const storedState = JSON.parse(localStorage.getItem("dat"));
  const id = storedState?.state?.current;
  const img = storedState?.state?.img;
  const [file, setFiles] = useState(img);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const uploadedImage = await uploadSingleImageToCloudinary(file);
      formData.avatar = uploadedImage;
      formData.UserId = id;
      delete formData.Avatar;
      await updateUser(formData);
      notify("update susscess");
      setModal(false);
    } catch (error) {
      console.log(formData);
      notify(error.response.data.message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileUrl = URL.createObjectURL(selectedFile);
    setFiles(fileUrl);
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 "
        onClick={() => setModal(true)}
      >
        Update user
      </button>
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg relative">
            <button
              onClick={() => setModal(false)}
              className="text-gray-500 hover:text-gray-700 text-lg font-bold"
            >
              &times;
            </button>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-3 grid-rows-3 gap-2"
            >
              <InputDefault
                label="name"
                placeholder="Enter your name"
                type="text"
                validate={{ required: "Name is required" }}
                register={register}
                error={errors}
              />
              <InputDefault
                label="password"
                placeholder="Enter your new password if you want to change"
                type="password"
                validate={{}}
                register={register}
                error={errors}
              />
              <InputDefault
                label="oldPassword"
                placeholder="Enter your password"
                type="password"
                validate={{ required: "Password is required" }}
                register={register}
                error={errors}
              />{" "}
              <InputDefault
                label="phone"
                placeholder="Enter your phone"
                type="text"
                validate={{
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{4}[0-9]{3}[0-9]{3}$/,
                    message: "Invalid phone",
                  },
                }}
                register={register}
                error={errors}
              />
              <InputDefault
                label="email"
                placeholder="Enter your email"
                type="text"
                validate={{ required: "Email is required" }}
                register={register}
                error={errors}
              />
              <InputFileDefault
                label="Avatar"
                type="file"
                validate={{}}
                register={(name, options) =>
                  register(name, { ...options, onChange: handleImageChange })
                }
                multiple={false}
                error={errors}
              />
              <div className="flex gap-2">
                {file && (
                  <img
                    src={file}
                    alt="Preview"
                    className="object-cover"
                    style={{ width: "25%", maxHeight: "auto" }}
                  />
                )}
              </div>
              {loading && <p>Loading...</p>}
              <button
                type="submit"
                className="col-start-1 col-end-5 mt-4 bg-blue-500 text-white py-2 px-4 w-full rounded hover:bg-blue-600"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddUser;
