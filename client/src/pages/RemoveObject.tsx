import { Scissors, Sparkles } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const RemoveObject: React.FunctionComponent = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [object, setObject] = React.useState<string>("");

  console.log(file);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          Describe the object name to Remove
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
        >
          <Scissors className="w-5" /> Remove Object
        </motion.button>
      </form>
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-[392px]">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#DD2476]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>
        <div className="flex flex-1 justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Scissors className="w-9 h-9" />
            <p>
              Upload an image and click <b>Remove Object</b> to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;
