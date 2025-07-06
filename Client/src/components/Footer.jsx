import { assets } from "../assets/assets";
function Footer() {
  return (
    <div className="container 2xl:px-20 mx-auto px-4  flex justify-between items-center">
      <img src={assets.logo} alt="" width={160} />
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        Made with ❤️ | By Stark.
      </p>
      <div className="flex gap-2.5">
        <img src={assets.facebook_icon} alt="" width={38} />
        <img src={assets.twitter_icon} alt="" width={38} />
        <img src={assets.instagram_icon} alt="" width={38} />
      </div>
    </div>
  );
}

export default Footer;
