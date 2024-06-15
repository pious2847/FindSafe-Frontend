import AppBar from "@/components/Navigations/AppBar";
import Footer from "@/components/footer/footer";

const AboutPage = () => {
  return (
    <>
      <AppBar />
      <br />
      <div className="pricingtag relative top-20">
        {/* Hero Section */}
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
            <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
              <a href="/" className="mb-6 sm:mx-auto">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
                  <svg
                    className="w-8 h-8 text-indigo-600"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
              </a>
              <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight  sm:text-4xl md:mx-auto">
                  <span className="relative inline-block">
                    <svg
                      viewBox="0 0 52 24"
                      fill="currentColor"
                      className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-indigo-300 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                    >
                      <defs>
                        <pattern
                          id="70326c9b-008a-4ac7-8403-1370d96eee83"
                          x="0"
                          y="0"
                          width=".135"
                          height=".30"
                        >
                          <circle cx="1" cy="1" r=".7" />
                        </pattern>
                      </defs>
                      <rect
                        fill="url(#70326c9b-008a-4ac7-8403-1370d96eee83)"
                        width="52"
                        height="24"
                      />
                    </svg>
                    <span className="relative">About </span>
                  </span>
                     FindSafe
                </h2>
                <p className="text-base text-gray-700 md:text-lg">
                  Discover the story behind FindSafe, a cutting-edge mobile
                  tracking app designed to keep you and your loved ones safe and
                  secure.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight  sm:text-4xl md:mx-auto">
              Our Mission
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              At FindSafe, our mission is to empower individuals and families
              with cutting-edge technology that provides peace of mind and
              enhances security. We believe in leveraging innovative solutions
              to create a safer world for everyone.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="px-4 py-16 mx-auto bg-gray-100 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              Key Features
            </h2>
          </div>
          <div className="grid gap-8 row-gap-5 md:row-gap-8 lg:grid-cols-3">
            <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm hover:-translate-y-2">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
              <h6 className="mb-2 font-semibold leading-5 text-gray-900">
                Real-time Tracking
              </h6>
              <p className="mb-3 text-sm text-gray-900">
                Stay connected with your loved ones through real-time location
                tracking, providing you with peace of mind and enhanced
                security.
              </p>
            </div>
            <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm hover:-translate-y-2">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
              <h6 className="mb-2 font-semibold leading-5 text-gray-900">
                Real-time Device Disable
              </h6>
              <p className="mb-3 text-sm text-gray-900">
                Protect your device and data from unauthorized access by
                remotely disabling the device in case of loss or theft. This
                feature ensures that your sensitive information remains secure
                and inaccessible to others.
              </p>
            </div>
            <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm hover:-translate-y-2">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
              <h6 className="mb-2 font-semibold leading-5 text-gray-900">
                Remote Wipe of Data
              </h6>
              <p className="mb-3 text-sm text-gray-900">
                In the event of device theft or loss, you can remotely wipe all
                data from the device, preventing sensitive information from
                falling into the wrong hands. This feature provides an
                additional layer of security and privacy protection.
              </p>
            </div>
            <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm hover:-translate-y-2">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
              <h6 className="mb-2 font-semibold leading-5 text-gray-900">
                Remote Alarm Playing
              </h6>
              <p className="mb-3 text-sm text-gray-900">
                If you misplace your device, you can trigger a loud alarm
                remotely to help locate it. This feature can be particularly
                useful in crowded or noisy environments, making it easier to
                find your device quickly.
              </p>
            </div>
            {/* Add more feature cards as needed */}
          </div>
        </div>
        {/* Team Section */}
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight  sm:text-4xl md:mx-auto">
              Our Team
            </h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
                <img
                  className="object-cover w-full h-56 md:h-64 xl:h-80"
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
                  alt="Person"
                />
                <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
                  <p className="mb-1 text-lg font-bold text-gray-100">
                    John Doe
                  </p>
                  <p className="mb-4 text-xs text-gray-100">Co-Founder & CEO</p>
                </div>
              </div>
            </div>
            <div>
              <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
                <img
                  className="object-cover w-full h-56 md:h-64 xl:h-80"
                  src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                  alt="Person"
                />
                <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
                  <p className="mb-1 text-lg font-bold text-gray-100">
                    Jane Smith
                  </p>
                  <p className="mb-4 text-xs text-gray-100">
                    Chief Technology Officer
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
                <img
                  className="object-cover w-full h-56 md:h-64 xl:h-80"
                  src="https://images.pexels.com/photos/3785097/pexels-photo-3785097.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                  alt="Person"
                />
                <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
                  <p className="mb-1 text-lg font-bold text-gray-100">
                    Michael Johnson
                  </p>
                  <p className="mb-4 text-xs text-gray-100">Lead Developer</p>
                </div>
              </div>
            </div>
            <div>
              <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
                <img
                  className="object-cover w-full h-56 md:h-64 xl:h-80"
                  src="https://images.pexels.com/photos/3931603/pexels-photo-3931603.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                  alt="Person"
                />
                <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
                  <p className="mb-1 text-lg font-bold text-gray-100">
                    Emily Davis
                  </p>
                  <p className="mb-4 text-xs text-gray-100">Product Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      <Footer/>
    </>
  );
};

export default AboutPage;
