import React from "react";
import { styled } from "styled-components";
import Center from "./Center";
import ImageTest from "../img/hdg72rc3q61.png";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";

const BgColor = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const Featured = ({ product }) => {
  return (
    <BgColor>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description} </Desc>
              <ButtonsWrapper>
                <ButtonLink
                  href={`/products/${product._id}`}
                  outline='true'
                  white='true'>
                  Read more
                </ButtonLink>
                <Button white={true}>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>

          <Column>
            <img
              src={ImageTest.src}
              alt='photo_note'
            />
          </Column>
        </ColumnsWrapper>
      </Center>
    </BgColor>
  );
};

export default Featured;
