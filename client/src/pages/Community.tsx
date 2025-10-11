import React from "react";
import type { DummyPublishedCreation } from "../types";
import { useUser } from "@clerk/clerk-react";
import { dummyPublishedCreationData } from "../constants/assets";
import { Heart } from "lucide-react";

const Community: React.FunctionComponent = () => {
  const [creations, setCreations] = React.useState<DummyPublishedCreation[]>(
    []
  );
  const { user } = useUser();

  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData);
  };

  React.useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800">Creations</h1>
      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {creations.map((creation, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg cursor-pointer"
            >
              <img
                src={creation.content}
                alt="Content"
                className="w-full h-full object-cover rounded-lg transition-transform duration-500 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 flex gap-2 items-end justify-end group-hover:justify-between p-4 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg transition-all duration-500 ease-out">
                <p className="text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  {creation.prompt}
                </p>
                <div className="flex gap-1 items-center transform translate-y-0 group-hover:translate-y-0 transition-all duration-300">
                  <p className="font-semibold">{creation.likes.length}</p>
                  <Heart
                    className={`min-w-5 h-5 transition-all duration-300 hover:scale-125 cursor-pointer ${
                      user && creation.likes.includes(user.id)
                        ? "fill-red-500 text-red-600"
                        : "text-white hover:text-red-400"
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
