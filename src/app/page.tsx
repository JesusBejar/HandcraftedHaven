
import Header from "./components/Header";
import Footer from "./components/Footer";
import SellerCard from "./components/SellerCard";

const sellers = [
 {
  sellerName: "Sally's Soap",
  sellerCategory: "Soap",

 },
  {
    sellerName: "Jenny's Jewelry",
    sellerCategory: "Jewelry",
  
  },
  {
    sellerName: "Tom's T-Shirts",
    sellerCategory: "Clothing",
   
  }

];
export default function Home() {
  return (
    <>
    <Header/>
    
      <h1>Welcome To Handcrafted Haven</h1>
      <p>Handcrafted Haven is a platform for artisans to showcase their work and sell their products. Here are some of our sellers. Click on their card to check out their page</p>
      {sellers.map((seller) => (
        <SellerCard
          key={seller.sellerName}
          sellerName={seller.sellerName}
          sellerCategory={seller.sellerCategory}
        />
      ))}
    <Footer/>
    </>

  );
}
