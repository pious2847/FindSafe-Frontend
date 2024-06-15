
import AppBar from "@/components/Navigations/AppBar";
import PricingCard from "@/components/pricing/pricingcard";


const PricingPage = () => {
    return (  
        <>

         <AppBar/>
         <div className="pricingtag relative top-20">
         <br />
         <PricingCard/>
         </div>
        </>
    );
}
 
export default PricingPage;