import React, { useEffect, useState } from "react";
import API from "../../utils/axios"; // axios instance with auth token

export default function LikeLove({ propertyId, className = "" }) {
  const [liked, setLiked] = useState(false);
  const [loved, setLoved] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [lovesCount, setLovesCount] = useState(0);
  const [animLike, setAnimLike] = useState(false);
  const [animLove, setAnimLove] = useState(false);

  // 🔄 Fetch initial counts & user reaction
  const fetchReactions = async () => {
    try {
      const res = await API.get(`/properties/${propertyId}`);
      const property = res.data;
      console.log("Fetched property reactions:", property); // 
      setLikesCount(property.likes || 0);
      setLovesCount(property.loves || 0);
      setLiked(property.likedBy || false);
      setLoved(property.lovedBy || false);
    } catch (err) {
      console.warn("Failed to fetch property reactions", err);
    }
  };

  useEffect(() => {
    fetchReactions();
  }, [propertyId]);

  // ❤️ Toggle Love
  const handleToggleLove = async () => {
    setLoved((prev) => !prev); // Immediate toggle for UI color
    setAnimLove(true);
    setTimeout(() => setAnimLove(false), 300);

    // Update counts locally first for instant UI feedback
    setLovesCount((prev) => (loved ? prev - 1 : prev + 1));
    if (liked && !loved) {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    }

    try {
      const res = await API.put(`/properties/${propertyId}/love`);
      console.log("Server response after toggling love:", res.data); //
      setLovesCount(res.data.loves);
      setLikesCount(res.data.likes);
    } catch (err) {
      console.warn("Failed to toggle love", err);
      // Revert state on error
      setLoved((prev) => !prev);
      setLovesCount((prev) => (loved ? prev + 1 : prev - 1));
      if (!loved && liked === false) setLiked(true);
    }
  };

  // 👍 Toggle Like
  const handleToggleLike = async () => {
    setLiked((prev) => !prev); // Immediate toggle for UI color
    setAnimLike(true);
    setTimeout(() => setAnimLike(false), 300);

    // Update counts locally first
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    if (loved && !liked) {
      setLoved(false);
      setLovesCount((prev) => prev - 1);
    }

    try {
      const res = await API.put(`/properties/${propertyId}/like`);
      console.log("Server response after toggling like:", res.data); //
      setLikesCount(res.data.likes);
      setLovesCount(res.data.loves);
    } catch (err) {
      console.warn("Failed to toggle like", err);
      // Revert state on error
      setLiked((prev) => !prev);
      setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
      if (!liked && loved === false) setLoved(true);
    }
  };

  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {/* ❤️ Love */}
      <div className="flex flex-col items-center select-none">
        <button
          onClick={handleToggleLove}
          aria-pressed={loved}
          className={`p-2 rounded-full transition-transform transform ${
            animLove ? "scale-125 rotate-6" : ""
          }`}
          title={loved ? "Unlove" : "Love"}
        >
          <i
            className={`fas fa-heart text-2xl ${
              loved ? "text-red-500 drop-shadow-md" : "text-gray-400"
            }`}
          ></i>
        </button>
        <span className="text-xs mt-1 font-semibold text-gray-700">
          {lovesCount}
        </span>
      </div>

      {/* 👍 Like */}
      <div className="flex flex-col items-center select-none">
        <button
          onClick={handleToggleLike}
          aria-pressed={liked}
          className={`p-2 rounded-full transition-transform transform ${
            animLike ? "scale-125 -rotate-6" : ""
          }`}
          title={liked ? "Unlike" : "Like"}
        >
          <i
            className={`fas fa-thumbs-up text-2xl ${
              liked ? "text-blue-500 drop-shadow-md" : "text-gray-400"
            }`}
          ></i>
        </button>
        <span className="text-xs mt-1 font-semibold text-gray-700">
          {likesCount}
        </span>
      </div>
    </div>
  );
}
