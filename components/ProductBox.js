import Link from "next/link";
import React from "react";
import { useContext } from "react";
import { styled } from "styled-components";
import Button from "./Button";
import { CartContext } from "./CartContext";
import CartIcon from "./icons/CartIcon";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    text-align: left;
  }
`;

const ProductBox = ({ product }) => {
  const { _id, title, description, price, images } = product;

  const { addProduct } = useContext(CartContext);

  const addProductToCart = () => addProduct(_id);

  const url = `/product/${_id}`;

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img
            src={product.images[0]}
            alt='image'
          />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button
            block={1}
            onClick={addProductToCart}
            primary={1}
            outline={1}>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
