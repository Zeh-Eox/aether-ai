import React from "react";
import { blogCategories } from "../constants";
import { Hash, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";
import { Audio } from "react-loader-spinner";

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const BlogTitle: React.FunctionComponent = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>(
    blogCategories[0]
  );
  const [input, setInput] = React.useState<string>("");
  const [generatedTitle, setGeneratedTitle] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const { getToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate a catchy and engaging blog title about "${input}" in the category of "${selectedCategory}". The title should be concise, attention-grabbing, and relevant to the topic.`;

      const { data } = await axios.post(
        "/ai/generate-blog-title",
        {
          prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setGeneratedTitle(data.content);
      } else {
        toast.error(data.message || "Failed to generate blog title");
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
          <Sparkles className="w-6 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Keyword</p>
        <input
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="The Future of Artificial Intelligence is..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          value={input}
          required
        />

        <p className="mt-4 text-sm font-medium">Category</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {blogCategories.map((item) => (
            <span
              key={item}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition-all duration-300 ease-in-out transform ${
                selectedCategory === item
                  ? "bg-purple-50 text-purple-700 border-purple-300 scale-105 shadow-sm"
                  : "text-gray-500 border-gray-300 hover:bg-gray-100 hover:scale-105"
              }`}
              onClick={() => setSelectedCategory(item)}
            >
              {item}
            </span>
          ))}
        </div>
        <br />
        <motion.button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? (
            <Audio height={20} width={20} color="white" ariaLabel="loading" />
          ) : (
            <>
              <Hash className="w-5" /> Generate Title
            </>
          )}
        </motion.button>
      </form>
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-[352px]">
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">Generated Title</h1>
        </div>
        {!generatedTitle ? (
          <div className="flex flex-1 justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Hash className="w-9 h-9" />
              <p>
                Enter a topic and click <b>Generate Title</b> to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
            <div className="reset-tw">
              <Markdown>{generatedTitle}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTitle;
