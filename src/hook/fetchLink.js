export const fetchPreview = async (url) => {
  if (!url) throw new Error("URL parameter is required");
  try {
    const response = await fetch(
      `/api/link-preview?url=${encodeURIComponent(url)}`
    );
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching link preview:", error);
  }
};
