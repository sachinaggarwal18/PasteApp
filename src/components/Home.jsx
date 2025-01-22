import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { toast } from "react-toastify";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
      toast.success("Paste loaded for editing ✅", { autoClose: 1000 });
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // Update
      dispatch(updateToPastes(paste));
      toast.success("Paste updated successfully! ✅", { autoClose: 1000 });
    } else {
      // Create
      dispatch(addToPastes(paste));
      toast.success("Paste created successfully! 🎉", { autoClose: 1000 });
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className=" flex flex-col items-center justify-center bg-gray-100 py-10">
      <div className="bg-white shadow-md rounded-lg w-4/5 md:w-1/2 p-8">
        {/* Title Input */}
        <div className="mb-6">
          <input
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            type="text"
            placeholder="Enter your paste title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Textarea Input */}
        <div className="mb-6">
          <textarea
            className="w-full p-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg resize-none"
            value={value}
            placeholder="Type your content here..."
            onChange={(e) => setValue(e.target.value)}
            rows={10}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={createPaste}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 hover:shadow-md transition duration-200"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
