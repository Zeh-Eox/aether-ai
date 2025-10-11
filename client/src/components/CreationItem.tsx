import React from "react";
import Markdown from "react-markdown";

interface PropTypes {
  item: Record<string, any>;
}

const CreationItem = ({ item }: PropTypes): React.JSX.Element => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer transition-all duration-300"
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2>{item.prompt}</h2>
          <p className="text-gray-500">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full">
          {item.type}
        </button>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          expanded ? "max-h-[1000px] opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        {item.type === "image" ? (
          <img
            src={item.content}
            alt="Image"
            className="w-full max-w-md rounded-md"
          />
        ) : (
          <div className="h-full overflow-y-scroll text-sm text-slate-700 reset-tw">
            <Markdown>{item.content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreationItem;
