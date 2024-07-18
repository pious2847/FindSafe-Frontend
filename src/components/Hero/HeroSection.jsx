import { Button } from "@/components/ui/button";
import { CiSaveDown1 } from "react-icons/ci";

function HeroSection() {
  return (
    <div className="relative top-[50px] overflow-hidden mainhero ">
      <div className="max-w-7xl mx-auto">
        <div className="relative  pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold  sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Build more secured and</span>{" "}
                <span className="block text-blue-600 xl:inline">
                  private protection at FindSafe
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Secure your mobile devices with FindSafe. Track, protect, and
                recover your phone in real-time. Your device&apos;s safety, just
                a tap away.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button className="neon cursor-pointer  flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md: md:text-lg md:p-7 ">
                    <CiSaveDown1 className="mr-2 h-5 w-5" />
                    Download APK
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="herosection.png"
          alt="Hero image"
        />
      </div>
    </div>
  );
}

export default HeroSection;
