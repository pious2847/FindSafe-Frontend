
import AppBar from "@/components/Navigations/AppBar";
import ThreeTierPricing from "@/components/pricing/Pricing";
       
const PricingPage = () => {
    return (  
        <>

         <AppBar/>
         <div className="pricingtag relative top-20">
        <ThreeTierPricing/>
         </div>
        </>
    );
}
 
export default PricingPage;