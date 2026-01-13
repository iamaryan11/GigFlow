import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "gigflow"); 
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dlfsydpx5/image/upload",
      data
    );

    const { url } = res.data;
    return url;
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    throw err;
  }
};

export default upload;