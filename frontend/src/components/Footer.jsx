import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <hr className="h-1.5 bg-[#FF4F5A]" />
      <footer className="max-w-7xl mx-auto px-2 py-3 grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="flex flex-col w-80">
          <div className="flex justify-between">
            <Link to="/">
              <img src="/static/icon-task.png" className="w-12 h-12" alt="" />
            </Link>
            <p className="text-xl w-60">
              Let's change your habit join with million people
            </p>
          </div>
          <div className="mt-4">
            <h4 className="text-base">Made by Omji</h4>
            <h5 className="text-base text-slate-500">Full Stack Webdev</h5>
          </div>
        </div>

        <div className="flex space-x-12 md:justify-end w-80 justify-self-end py-4">
          <div>
            <h5 className="text-lg font-semibold text-[#FF4F5A]">Links</h5>
            <ul className="mt-2">
              <li>
                <a href="#link" className="text-base hover:text-[#FF4F5A]">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#link" className="text-base hover:text-[#FF4F5A]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#link" className="text-base hover:text-[#FF4F5A]">
                  Hire Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold text-[#FF4F5A]">Links</h5>
            <ul className="mt-2">
              <li>
                <a href="#link" className="text-base hover:text-[#FF4F5A]">
                  Link - 1
                </a>
              </li>
              <li>
                <a href="#link" className="text-base hover:text-[#FF4F5A]">
                  Link - 2
                </a>
              </li>
              <li>
                <a href="#link" className="text-base hover:text-[#FF4F5A]">
                  Link - 3
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;