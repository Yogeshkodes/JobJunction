import React, { useEffect, useRef, useState, useContext } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner Level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillref = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmithandler = async (e) => {
    e.preventDefault();
    try {
      const description = quillref.current.getText();
      const { data } = await axios.post(
        `${backendUrl}/post-job`,
        { title, description, location, category, level, salary },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setTitle("");
        quillref.current.root.innerHTML = "";
        setSalary(0);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // initialize Quill editor

    if (!quillref.current && editorRef.current) {
      quillref.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <form
      className="container p-4 flex flex-col w-full items-start gap-3"
      onSubmit={onSubmithandler}
    >
      <div className="w-full">
        <p className="mb-2">Job Title</p>
        <input
          type="text"
          placeholder="Type Here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="w-full py-2 px-3 max-w-lg border border-gray-300 rounded outline-0 text-gray-800"
        />
      </div>

      <div className="w-full max-w-lg">
        <p className="my-2">Job Description</p>
        <div ref={editorRef}></div>
      </div>

      <div className="flex sm:flex-row flex-col gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Job Category</p>
          <select
            className="w-full border border-gray-300 rounded outline-0 text-gray-600 py-2 px-3 text-sm"
            name="JobCategory"
            onChange={(e) => setCategory(e.target.value)}
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2">Job Location</p>
          <select
            className="w-full border border-gray-300  text-sm rounded outline-0 text-gray-600 py-2 px-3"
            name="JobLocation"
            onChange={(e) => setLocation(e.target.value)}
          >
            {JobLocations.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2">Job Level</p>
          <select
            name="JobLevel"
            onChange={(e) => setLevel(e.target.value)}
            className="w-full border border-gray-300 rounded  text-sm outline-0 text-gray-600 py-2 px-3"
          >
            <option value="Beginner Level">Beginner Level</option>
            <option value="Interemediate Level">Intermediate Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>
      </div>

      <div>
        <p className="mb-2">Salary</p>
        <input
          className="w-full border border-gray-300 rounded outline-0 text-gray-600 py-2 px-3 text-sm "
          type="number"
          name="Salary"
          onChange={(e) => setSalary(e.target.value)}
          placeholder="2500"
          min={0}
          max={100000}
        />
      </div>
      <button className="bg-[#FD8A33] text-white py-2 mt-4 px-4 rounded w-28">
        Add
      </button>
    </form>
  );
};

export default AddJob;
