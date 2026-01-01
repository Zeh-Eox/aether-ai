import React from "react";
import { imageStyles } from "../constants";
import { Image, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const GenerateImage: React.FunctionComponent = () => {
  const [selectedImageStyle, setSelectedImageStyle] = React.useState<string>(
    imageStyles[0]
  );
  const [input, setInput] = React.useState<string>("");
  const [publish, setPublish] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [generatedImageUrl, setGeneratedImageUrl] = React.useState<string>("");

  const { getToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Create an image based on the following description: "${input}". The style of the image should be "${selectedImageStyle}".`;

      const { data } = await axios.post(
        "/ai/generate-image",
        {
          prompt,
          style: selectedImageStyle,
          publish,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setGeneratedImageUrl(data.content);
      } else {
        toast.error(data.message || "Failed to generate image");
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
          <Sparkles className="w-6 text-[#00AD25]" />
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Describe Your Image</p>
        <textarea
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 resize-none"
          placeholder="Describe what you want to see in the image..."
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInput(e.target.value)
          }
          value={input}
          rows={9}
          required
        />

        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {imageStyles.map((item) => (
            <span
              key={item}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition-all duration-300 ease-in-out transform ${
                selectedImageStyle === item
                  ? "bg-purple-50 text-green-700 border-green-300 scale-105 shadow-sm"
                  : "text-gray-500 border-gray-300 hover:bg-gray-100 hover:scale-105"
              }`}
              onClick={() => setSelectedImageStyle(item)}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPublish(e.target.checked)
              }
              checked={publish}
              className="sr-only peer"
            />

            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>

            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
          </label>
          <p className="text-sm">Make this image public</p>
        </div>

        <br />
        <motion.button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              Generating Image...
            </>
          ) : (
            <>
              <Image className="w-5" /> Generate Image
            </>
          )}
        </motion.button>
      </form>
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-[562px]">
        <div className="flex items-center gap-3">
          <Image className="w-5 h-5 text-[#00AD25]" />
          <h1 className="text-xl font-semibold">Generated Image</h1>
        </div>
        {!generatedImageUrl ? (
          <div className="flex flex-1 justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Image className="w-9 h-9" />
              <p>
                Describe an image and click <b>Generate Image</b> to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex justify-center items-center h-full">
            <img
              src={generatedImageUrl}
              alt="Generated AI Image"
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImage;
