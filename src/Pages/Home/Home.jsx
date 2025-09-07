
import Hero_Section from "../../Page_Component/Home/Hero_Section";
import Categories_Product from "./Categories_Product";
import ShowProduct from "./Product/ShowProduct";

import Trusted_Brands from "./Trusted_Brands";

export default function Home() {
  return (
    <div>

      <Hero_Section></Hero_Section>

      <div className="container m-auto px-3">
        
          <Categories_Product></Categories_Product>

          <ShowProduct></ShowProduct>

          <Trusted_Brands></Trusted_Brands>

      </div>

      
     

    </div>
  )
}
