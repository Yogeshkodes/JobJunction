import { assets } from "../assets/assets";

function JobCard({ job }) {
  return (
    <div className="border border-gray-200 shadow rounded p-6">
      <div className="flex justify-between items-center">
        <img src={assets.company_icon} alt="" />
      </div>
      <h4 className="font-medium text-xl mt-2">{job.title}</h4>
      <div className="flex items-center gap-3 mt-2 text-xs">
        <span className="bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
          {job.location}
        </span>
        <span className="bg-orange-50 border border-orange-200 px-4 py-1.5 rounded">
          {job.level}
        </span>
      </div>
      <p
        className="text-gray-500 text-sm mt-4"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>
      <div className="mt-4 gap-4 flex text-sm ">
        <button className="bg-[#FD8A33] px-4 py-2 text-white rounded">
          Apply Now
        </button>
        <button className="text-[#FD8A33] border border-[#FD8A33] px-4  py-2 rounded">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default JobCard;
