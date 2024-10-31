'use client';
import { Button, Card, Col, Row, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';
import Image from 'next/image';
import getProduct from './actions/products/product';
import { useEffect, useState } from 'react';
import { productsInterface } from './types/ProductInterface';
import Typography from './typography/typography';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const [page, setPage] = useState(1);
  const limit = 10;
  const [products, setProducts] = useState<{ products: productsInterface[] }>({
    products: [],
  });
  const getData = async () => {
    await getProduct({ limit: limit, page: page }).then(res => {
      setProducts({
        ...res?.data,
        products: products?.products.concat(res?.data?.products),
      });
    });
  };

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="container">
      <StyledContainerWrapper>
        <InfiniteScroll
          dataLength={products?.products?.length || 0}
          next={fetchMoreData}
          hasMore={products?.products?.length < 194}
          loader={<Spin size="large" className="mt-3 w-100 mx-auto" />}
        >
          <Row gutter={[24, 24]}>
            {products?.products?.map((item: productsInterface, key: number) => (
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
                  <Button className="bg-primary">
                    <Typography variant="h4" className="mb-0 text-white">
                      Add to cart
                    </Typography>
                  </Button>
                </StyledCardProducts>
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      </StyledContainerWrapper>
    </section>
  );
}
