import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  // Format Date Function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
    toast.success("Paste deleted successfully", { autoClose: 1000 });
  }

  function handleShare(pasteId) {
    const shareableLink = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(shareableLink);
    toast.success("Sharable link copied to clipboard!", { autoClose: 1000 });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Search Bar */}
      <div className="flex justify-center py-6">
        <input
          className="p-3 rounded-xl w-2/3 lg:w-1/3 border-2 border-gray-300 shadow-md focus:outline-none focus:ring focus:ring-blue-300"
          type="search"
          placeholder="Search your pastes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Pastes Section */}
      <div className="flex flex-col items-center gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((paste, index) => (
            <div
              key={index}
              className="w-4/5 lg:w-2/3 bg-white shadow-lg rounded-xl p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Paste Info */}
              <div className="text-left flex-1">
                <h3 className="text-2xl font-bold text-blue-600 mb-2">
                  {paste.title.toUpperCase()}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {paste.content}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Created: {formatDate(paste.createdAt)}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-4 lg:mt-0 flex gap-4">
                {/* Edit */}
                <Link to={`/?pasteId=${paste?._id}`}>
                  <i className="ri-edit-box-line text-gray-600 text-xl hover:text-blue-600 cursor-pointer"></i>
                </Link>

                {/* View */}
                <Link to={`/pastes/${paste?._id}`}>
                  <i className="ri-eye-fill text-gray-600 text-xl hover:text-green-600 cursor-pointer"></i>
                </Link>

                {/* Delete */}
                <i
                  className="ri-delete-bin-line text-gray-600 text-xl hover:text-red-600 cursor-pointer"
                  onClick={() => handleDelete(paste?._id)}
                ></i>

                {/* Copy */}
                <i
                  className="ri-clipboard-line text-gray-600 text-xl hover:text-yellow-600 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard", { autoClose: 1000 });
                  }}
                ></i>

                {/* Share */}
                <i
                  className="ri-share-box-line text-gray-600 text-xl hover:text-purple-600 cursor-pointer"
                  onClick={() => handleShare(paste?._id)}
                ></i>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-10">No pastes found...</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
