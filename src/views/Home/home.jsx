
import AppBar from "@/components/Navigations/AppBar";
import HeroSection from "@/components/Hero/HeroSection";
import HomeBody from "@/components/Home/HomeBody";
import PricingCard from "@/components/pricing/pricingcard";
import Footer from "@/components/footer/footer";

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
        <PricingCard/>
        <br />
        <br />
        <br />
        <Footer/>
        </>
     );
}

export default MainPanel;