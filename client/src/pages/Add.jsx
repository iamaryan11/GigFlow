import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import upload from "../utils/upload";
import newRequest from "../utils/newRequest";
import { Upload, X, Plus } from "lucide-react";

// Using useReducer for complex form state management
const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
  title: "",
  cat: "",
  cover: "",
  images: [],
  desc: "",
  shortTitle: "",
  shortDesc: "",
  deliveryTime: 0,
  revisionNumber: 0,
  features: [],
  price: 0,
};

const gigReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.name]: action.value };
    case "ADD_IMAGES":
      return { ...state, cover: action.cover, images: action.images };
    case "ADD_FEATURE":
      return { ...state, features: [...state.features, action.payload] };
    case "REMOVE_FEATURE":
      return {
        ...state,
        features: state.features.filter((f) => f !== action.payload),
      };
    default:
      return state;
  }
};

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    const val = e.target[0].value;
    if (val) {
      dispatch({ type: "ADD_FEATURE", payload: val });
      e.target[0].value = "";
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", cover, images });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newRequest.post("/seller/publish-gigs", state);
      navigate("/mygigs");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-10">Add New Gig</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT SIDE: General Information */}
          <div className="flex-1 space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="form-control">
              <label className="label font-bold text-slate-700">
                Gig Title
              </label>
              <input
                name="title"
                type="text"
                placeholder="e.g. I will design a modern website"
                className="input input-bordered focus:input-primary"
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="label font-bold text-slate-700">Category</label>
              <select
                name="cat"
                className="select select-bordered"
                onChange={handleChange}
              >
                <option disabled selected>
                  Select a category
                </option>
                <option value="design">Design</option>
                <option value="web">Web Development</option>
                <option value="animation">Animation</option>
                <option value="ai">AI Services</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-bold text-slate-700">
                  Cover Image
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
              </div>
              <div className="form-control">
                <label className="label font-bold text-slate-700">
                  Upload Images
                </label>
                <input
                  type="file"
                  multiple
                  className="file-input file-input-bordered w-full"
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
            </div>

            <button
              onClick={handleUpload}
              className={`btn btn-outline btn-primary w-full ${
                uploading ? "loading" : ""
              }`}
            >
              {uploading ? "Uploading Assets..." : "Upload Assets"}
            </button>

            <div className="form-control">
              <label className="label font-bold text-slate-700">
                Full Description
              </label>
              <textarea
                name="desc"
                placeholder="Write a detailed description of your service..."
                className="textarea textarea-bordered h-48"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* RIGHT SIDE: Service Details & Pricing */}
          <div className="flex-1 space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-fit">
            <div className="form-control">
              <label className="label font-bold text-slate-700">
                Short Title
              </label>
              <input
                name="shortTitle"
                type="text"
                placeholder="e.g. One-page responsive design"
                className="input input-bordered"
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="label font-bold text-slate-700">
                Short Description
              </label>
              <textarea
                name="shortDesc"
                placeholder="Brief summary of your offer"
                className="textarea textarea-bordered h-24"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label font-bold text-slate-700">
                  Delivery (Days)
                </label>
                <input
                  name="deliveryTime"
                  type="number"
                  className="input input-bordered"
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label font-bold text-slate-700">
                  Revisions
                </label>
                <input
                  name="revisionNumber"
                  type="number"
                  className="input input-bordered"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* FEATURES SECTION */}
            <div className="form-control">
              <label className="label font-bold text-slate-700">
                Add Features
              </label>
              <form onSubmit={handleFeature} className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="e.g. SEO Optimization"
                  className="input input-bordered flex-1"
                />
                <button type="submit" className="btn btn-square btn-primary">
                  <Plus />
                </button>
              </form>
              <div className="flex flex-wrap gap-2">
                {state?.features?.map((f) => (
                  <div
                    key={f}
                    className="badge badge-lg badge-neutral gap-2 py-4"
                  >
                    {f}
                    <X
                      size={14}
                      className="cursor-pointer"
                      onClick={() =>
                        dispatch({ type: "REMOVE_FEATURE", payload: f })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="form-control">
              <label className="label font-bold text-slate-700 text-xl">
                Price (₹)
              </label>
              <input
                name="price"
                type="number"
                className="input input-bordered text-lg font-bold"
                onChange={handleChange}
              />
            </div>

            {/* <button onClick={handleSubmit} className="btn btn-primary btn-lg w-full mt-4">Create Gig</button> */}
            <button
              onClick={handleSubmit}
              disabled={uploading || !state.cover} // Prevent submisson if not ready
              className="btn btn-primary btn-lg w-full mt-4"
            >
              {uploading ? "Waiting for assets..." : "Create Gig"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
