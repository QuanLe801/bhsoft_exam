/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Button, Card, Col, notification, Row, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAsync } from '@/actions/cartActions';
import { RootState } from '@/reducers/rootReducer';
import { getProductAsync } from '@/actions/productsActions';
import { productsInterface } from '@/types/ProductInterface';
import Typography from '@/app/typography/typography';

const StyledCardProducts = styled(Card)`
  img {
    transition: all 0.3s;
  }
  &:hover {
    img {
      transform: scale(1.1);
    }
  }
  .ant-card-cover {
    overflow: hidden;
  }
`;

const StyledContainerWrapper = styled.div`
  .infinite-scroll-component {
    overflow: unset !important;
  }
`;

export default function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.product);
  const [isLoading, setIsLoading] = useState<number[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const [page, setPage] = useState(1);
  const limit = 10;

  const getProducts = async () => {
    dispatch<any>(getProductAsync({ limit: limit, page: page }));
  };

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  const addToCart = async (product: productsInterface, quantity: number) => {
    setIsLoading([...isLoading, product.id]);
    const payload: productsInterface = {
      title: product.title,
      price: product.price.toString(),
      brand: product.brand as string,
      thumbnail: product.thumbnail as string,
      id: product.id,
      quantity: 1,
    };
    await dispatch<any>(addToCartAsync({ ...payload }, quantity));
    api.success({
      message: 'Add to cart sucessfully!',
    });
    const addToCartSucess = [...isLoading].filter(item => item !== product.id);
    setIsLoading([...addToCartSucess]);
  };

  useEffect(() => {
    getProducts();
  }, [page]);

  return (
    <section className="container">
      {contextHolder}
      <StyledContainerWrapper>
        <InfiniteScroll
          dataLength={products?.length || 0}
          next={fetchMoreData}
          hasMore={products?.length < 194}
          loader={<Spin size="large" className="mt-3 w-100 mx-auto" />}
        >
          <Row gutter={[24, 24]}>
            {products?.map((item: productsInterface, key: number) => {
              return (
                <Col lg={6} md={8} key={key}>
                  <StyledCardProducts
                    hoverable
                    cover={
                      <Image
                        alt="example"
                        src={item.thumbnail}
                        width={240}
                        height={240}
                      />
                    }
                  >
                    <Meta title={item.title} description={item.brand} />
                    <Typography variant="h5" className="mt-2">
                      {item.price}$
                    </Typography>
                    <Button
                      className="bg-primary"
                      loading={isLoading.includes(item.id)}
                      disabled={isLoading.includes(item.id)}
                    >
                      <Typography
                        variant="h4"
                        className="mb-0 text-white"
                        onClick={() => addToCart(item, 1)}
                      >
                        Add to cart
                      </Typography>
                    </Button>
                  </StyledCardProducts>
                </Col>
              );
            })}
          </Row>
        </InfiniteScroll>
      </StyledContainerWrapper>
    </section>
  );
}
