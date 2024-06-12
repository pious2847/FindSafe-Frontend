import { Button } from "@/components/ui/button";
import { CiSaveDown1 } from "react-icons/ci";


function HeroSection() {
  return (
    <>
    <div className="flex mainhero justify-center align-middle w-full">
      <div className="h-screen heroscreen max-w-screen-md justify-start p-10  flex-col align-middle ">
        <div className=" boldmessage flex flex-col gap-4">
          <h2 className="text-5xl flex-1 font-extrabold">
            Build more secured and
          </h2>
          <h2 className="text-5xl flex-1 font-extrabold">
             private protection at
          </h2>
          <h2 className="text-5xl flex-1 font-extrabold">
          FindSafe Services
          </h2>

        </div>
        <br />
        <br />
        <div>
          <p className="text-xl">
            Take control of HTML, CSS, and JavaScript in a visual canvas.
            Webflow generates clean, semantic code that’s ready to publish or
            hand to developers.
          </p>
        </div>
        <br />
        <Button className='p-5 h-14 w-70 neon '>
            {/* <Link href="/login"></Link> */}
            <div className="flex gap-4 align-middle justify-center text-center">
              <CiSaveDown1 className="size-5"/>
              Download Apk
            </div>
          </Button>
      </div>
      <img src="herosection.png"  className="heroimg" />
      </div>
    </>
  );
}

export default HeroSection;
