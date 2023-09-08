import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin-top: 40px;
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  img {
    max-width: 80px;
    max-height: 80px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 3px;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const CartPage = () => {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  const moreOfThisProduct = (id) => {
    addProduct(id);
  };

  const lessOfThisProduct = (id) => {
    removeProduct(id);
  };

  const goToPayment = async () => {
    const response = await axios.post("api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  };

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img
                            src='product.images[0]'
                            alt='product_image'
                          />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                        <QuantityLabel>{cartProducts.filter((id) => id === product._id).length}</QuantityLabel>
                        <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <td>$ {cartProducts.filter((id) => id === product._id).length * product.price}</td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>

              <Input
                type={"text"}
                placeholder='Name'
                value={name}
                name='name'
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type={"text"}
                placeholder='Email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <CityHolder>
                <Input
                  type={"text"}
                  placeholder='City'
                  name='city'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <Input
                  type={"text"}
                  placeholder='Postal code'
                  name='postalCode'
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </CityHolder>

              <Input
                type={"text"}
                placeholder='Street address'
                name='streetAddress'
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
              <Input
                type={"text"}
                placeholder='Country'
                name='country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <Button
                block={1}
                black={1}
                type='button'
                onClick={goToPayment}>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
};

export default CartPage;