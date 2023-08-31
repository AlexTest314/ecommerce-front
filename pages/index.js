import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default function Home({ product }) {
  console.log("product", product);
  return (
    <>
      <Header />
      <Featured />
    </>
  );
}

export const getServerSideProps = async () => {
  const featuredProductId = "64e1cddd1a4847670adaf6cf";
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);
  return {
    props: { product: JSON.parse(JSON.stringify(product)) }
  };
};
