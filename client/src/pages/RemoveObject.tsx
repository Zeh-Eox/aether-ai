import { Scissors, Sparkles } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const RemoveObject: React.FunctionComponent = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [object, setObject] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [processedImage, setProcessedImage] = React.useState<string>("");

  const { getToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!file) {
        toast.error("Please upload an image file");
        setLoading(false);
        return;
      }

      if (object.split(" ").length > 1) {
        toast.error("Please provide a single object name");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", file);
      formData.append("object", object);

      const { data } = await axios.post("/ai/remove-image-object", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        setProcessedImage(data.content);
      } else {
        toast.error(data.message || "Failed to process image");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "API error");
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      <form
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#DD2476]" />
          <h1 className="text-xl font-semibold">AI Object Remover</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <input
          type="file"
          accept="image/*"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFile(e.target.files ? e.target.files[0] : null)
          }
          required
        />
        <p className="text-xs text-gray-500 font-light mt-1">
          Support JPG, PNG and others image formats
        </p>

        <p className="mt-6 text-sm font-medium">
          Object name to Remove (A very specific name is recommended)
        </p>

        <textarea
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 resize-none"
          placeholder="e.g. Watch or Spoon, Only a sigle object name"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setObject(e.target.value)
          }
          value={object}
          rows={4}
          required
        />

        <br />
        <motion.button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#DD2476] to-[#FF512F] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              Removing Object...
            </>
          ) : (
            <>
              <Scissors className="w-5" /> Remove Object
            </>
          )}
        </motion.button>
      </form>
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-[392px]">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#DD2476]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        {!processedImage ? (
          <div className="flex flex-1 justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Scissors className="w-9 h-9" />
              <p>
                Upload an image and click <b>Remove Object</b> to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-3">
            <img
              src={processedImage}
              alt="Processed Image"
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
