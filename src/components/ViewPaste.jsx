import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];

  return (
    <div>
      <div className="">
        <textarea
          className="m-7 p-3 border-2 border-gray-300 
        bg-gray-800 text-white rounded-md h-full w-1/2"
          value={paste.content}
          disabled
          placeholder="Type here......"
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
