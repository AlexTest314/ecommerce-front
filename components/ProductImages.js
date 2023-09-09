import React from "react";
import { useState } from "react";
import { styled } from "styled-components";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
  max-width: 300px;
  max-height: 300px;
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;
const ImageButton = styled.div`
  border: 2px solid #ccc;
  ${(props) => (props.active ? "border-color: #ccc;" : "border-color: transparent; opacity: 0.7;")}
  width: 30px;
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;

const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = useState("");
  return (
    <>
      <BigImageWrapper>
        <BigImage
          src={activeImage}
          alt='product image'
        />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((img) => (
          <ImageButton
            key={img}
            active={img === activeImage}
            onClick={() => setActiveImage(img)}>
            <Image
              src={img}
              alt='product image'
            />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
};

export default ProductImages;
