import React from "react";
import type { DummyCreation } from "../types";
import { Gem, Sparkles, Filter } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const Dashboard: React.FunctionComponent = () => {
  const [creations, setCreations] = React.useState<DummyCreation[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/user/get-user-creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data?.success) {
        setCreations(data.creations);
      } else {
        toast.error(data?.message || "Failed to fetch creations");
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

  React.useEffect(() => {
    getDashboardData();
  }, []);

  const categories = React.useMemo(() => {
    const uniqueTypes = Array.from(new Set(creations.map((item) => item.type)));
    return ["all", ...uniqueTypes];
  }, [creations]);

  const filteredCreations = React.useMemo(() => {
    if (selectedCategory === "all") {
      return creations;
    }
    return creations.filter((item) => item.type === selectedCategory);
  }, [creations, selectedCategory]);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              <Protect plan={"premium"} fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-3/4">
          <div className="animate-spin rounded-full h-12 w-12 border-3 border-purple-500 border-t-transparent" />
        </div>
      ) : (
        <div>
          <div className="mt-6 mb-4 flex items-center justify-between flex-wrap gap-4">
            <p>
              Recent Creations -{" "}
              <span className="text-red-500">
                Click on each card to see details
              </span>
            </p>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all"
                      ? "All Categories"
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredCreations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCreations.map((item: Record<string, any>) => (
                <CreationItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <Filter className="w-12 h-12 mb-3 text-gray-300" />
              <p>No creations found in this category</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
