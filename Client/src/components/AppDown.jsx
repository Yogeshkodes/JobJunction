import { assets } from "../assets/assets";

function AppDown() {
  return (
    <div className="container 2xl:px-20 mx-auto px-4 my-40">
      <div className="relative bg-gradient-to-r from-[#FD8A33] to-[#F9433B] text-white py-12 sm:24 lg:32 text-center mx-2 rounded-xl">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-4xl  font-bold mb-8 max-w-md">
            Download Mobile App For Better Experience
          </h1>
          <div className="flex gap-4 ">
            <a href="#" className="inline-block">
              <img className="h-12" src={assets.play_store} alt="" />
            </a>
            <a href="#" className="inline-block">
              <img className="h-12" src={assets.app_store} alt="" />
            </a>
          </div>
        </div>

        <img
          className="absolute w-80 right-32 bottom-0 max-lg:hidden"
          src={assets.app_main_img}
          alt=""
        />
      </div>
    </div>
  );
}

export default AppDown;
