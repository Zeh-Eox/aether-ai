import React from "react";
import Markdown from "react-markdown";

interface PropTypes {
  item: Record<string, any>;
}

const CreationItem: React.FC<PropTypes> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md"
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <h2>{item.prompt}</h2>
            <p className="text-gray-500">
              {item.type} - {new Date(item.created_at).toLocaleDateString()}
            </p>
          </div>
          <button className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full w-40">
            {item.type}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4 h-screen"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{item.prompt}</h2>
                <p className="text-gray-500 text-sm">
                  {item.type} - {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-2xl leading-none ml-4 cursor-pointer text-red-600"
              >
                ×
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {item.type === "image" ? (
                <img
                  src={item.content}
                  alt="Image"
                  className="w-full rounded-md"
                />
              ) : (
                <div className="text-sm text-slate-700 reset-tw">
                  <Markdown>{item.content}</Markdown>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreationItem;
