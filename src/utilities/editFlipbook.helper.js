export const handleShare = async (url) => {
  try {
    await navigator.share({
      title: "Flipbook",
      title: "Check this out",
      url: url,
    });
  } catch (err) {
    console.error("Share failed:", err);
  }
};
