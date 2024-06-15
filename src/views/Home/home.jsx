
import AppBar from "@/components/Navigations/AppBar";
import HeroSection from "@/components/Hero/HeroSection";
import HomeBody from "@/components/Home/HomeBody";
import ThreeTierPricing from "@/components/pricing/Pricing";

function MainPanel() {
    return ( 
        <>
        <AppBar/>
        <HeroSection />
        <br />
        <br />
        <HomeBody/>
        <br />
        <br />
        <ThreeTierPricing/>
        </>
     );
}

export default MainPanel;