import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Product } from "@/models/Product";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";

export default function Home({ featuredProduct, newProducts }) {
  console.log("newProducts", newProducts);
  console.log("featuredProduct", featuredProduct);
  return (
    <>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </>
  );
}

export const getServerSideProps = async () => {
  const featuredProductId = "64e1cddd1a4847670adaf6cf";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { _id: -1 }, limit: 10 });
  return {
    props: { featuredProduct: JSON.parse(JSON.stringify(featuredProduct)), newProducts: JSON.parse(JSON.stringify(newProducts)) }
  };
};
