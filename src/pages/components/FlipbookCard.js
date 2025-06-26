import convertToReadableDate from "@/utilities/formatDate";
import { BookOpen, MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Modal from "./Modal";
import { BASE_URL } from "../../../constant";

const FlipbookCard = ({ flipbook, id, getAllBrocchures }) => {
  const [isOpen, setIsOpen] = useState(false);

  const deleteBrochure = async () => {
    const res = await fetch(`${BASE_URL}/brochure/brochure/${flipbook?.name}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    setIsOpen(false);
    getAllBrocchures(); // get updated list of cards since one is deleted
  };

  return (
    <Link href={`/edit-flipbook/${flipbook?.name}`}>
      <div className="bg-white relative rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
        <div className="relative h-36  bg-gray-100 ">
          {flipbook?.images?.length > 0 ? (
            <Image
              src={flipbook?.images[0]}
              alt={flipbook?.displayName || "Flipbook Image"}
              className="w-full h-full object-cover"
              width={600}
              height={600}
              fetchPriority={id < 6 ? "high" : ""}
              priority={id < 6}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <BookOpen size={48} />
            </div>
          )}
          <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
            {flipbook?.images?.length} pages
          </div>
        </div>

        <div className="p-4 flex  justify-between">
          <div>
            <h3 className="font-bold text-lg mb-2 truncate">
              {flipbook?.displayName}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Created: {convertToReadableDate(flipbook?.createdAt)}
            </p>
          </div>

          <MoreVertical
            onClick={(e) => {
              setIsOpen(true);
              e.preventDefault();
              e.stopPropagation();
            }}
            size={16}
            className="text-gray-600 "
          />

          {isOpen && (
            <Modal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              selectionButtonText={"Delete"}
              subText={
                "Are you sure you want to delete this item? This action cannot be undone"
              }
              title={"Confirm Deletion"}
              mainButtonFunction={deleteBrochure}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default FlipbookCard;
