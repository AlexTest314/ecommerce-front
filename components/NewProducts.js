import React from "react";
import { styled } from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  padding-top: 30px;
`;

const NewProducts = ({ products }) => {
  return (
    <Center>
      <ProductsGrid>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductBox
              key={product._id}
              product={product}>
              {product.title}
            </ProductBox>
          ))}
      </ProductsGrid>
    </Center>
  );
};

export default NewProducts;
