import { Button } from "@/components/ui/button";
import ThreeTierPricing from "../pricing/Pricing";

function HomeBody() {
  return (
    <>
      <div className="flex gap-10 flex-col align-middle relative boldermessage">
        <h2
          className="text-7xl flex-1 font-extrabold tracking-tight "
          style={{ textAlign: "center"  }}
        >
          Creative power that goes beyond templates
        </h2>
        <p style={{ textAlign: "center" }} className="text-xl">
          You design, we generate the code — for everything from fully custom{" "}
          <br /> layouts to complex animations.
        </p>
        <div className="align-middle flex justify-center">
          <Button className="w-44 h-12 neon ">
            {/* <Link href="/login"></Link> */}
            Get Started - i’s Free
          </Button>
        </div>

        <div className="flex flex-wrap gap-10 -z-10">
          <ThreeTierPricing />
        </div>
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default HomeBody;
