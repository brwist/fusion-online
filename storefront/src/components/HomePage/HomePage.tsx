import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { SearchBar } from '../SearchBar/SearchBar';
import { Tag } from '../Tag/Tag';
import { ProductCard } from '../ProductCard/ProductCard';
import { NewsCard } from '../NewsCard/NewsCard';
import { SectionHeader } from '../SectionHeader/SectionHeader';

import "./homepage.scss"

export interface HomePageProps {

}
export const HomePage: React.FC<HomePageProps> = ({...props}) => {
  return (
    <Container>
      <SectionHeader subheading="Lorem Impsum Dolor" heading="RocketChips Product Portal" />
      <SearchBar updateSearchQuery={(searchString) => console.log(searchString) }/>
      <Row>
        <Col className="my-auto" md="auto">
          <h3 className="my-auto">Recent Searches:</h3>
        </Col>
        <Col md="auto">
          <Tag label="Intel Pentium"/>
        </Col>
        <Col md="auto">
          <Tag label="Intel Pentium"/>
        </Col>
        <Col md="auto">
          <Tag label="Intel Pentium"/>
        </Col>
        <Col md="auto">
          <Tag label="Intel Pentium"/>
        </Col>
        <Col md="auto">
          <Tag label="Intel Pentium"/>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="my-auto">
          <h3 className="my-auto">Recent Orders:</h3>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button className="btn-view-all" size="lg">
            View All
          </Button>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <ProductCard 
            title="Intel Pentium Gold 7505 Processor"
            buttonLabel="View Order"
          />
        </Col>
        <Col>
          <ProductCard 
            title="Intel Pentium Gold 7505 Processor"
            buttonLabel="View Order"
          />
        </Col>
        <Col>
          <ProductCard 
            title="Intel Pentium Gold 7505 Processor"
            buttonLabel="View Order"
          />
        </Col>
        <Col>
          <ProductCard 
            title="Intel Pentium Gold 7505 Processor"
            buttonLabel="View Order"
          />
        </Col>
      </Row>
      <Row>
      <Col className="my-auto">
          <h6 className="my-auto">Latest News:</h6>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button className="btn-view-all" size="lg">
            View All
          </Button>
        </Col>
      </Row>
      <Row className="my-3">
      <Col>
          <NewsCard
            date="Sept. 16, 2022"
            title="Lorem Ipsum"
            text="Suspendisse potenti. Pellentesque mattis 
            mattis posuere. Curabitur id metus tristique, 
            porttitor turpis et, rhoncus mauris. Mauris ac 
            viverra sem. Aliquam quam tellus, egestas vitae 
            neque nec, posuere tempus velit. Nam lobortis 
            eros quam. Fusce ut vehicula odio. Nam ornare 
            dui vel lectus ornare, nec interdum velit 
            pharetra. Morbi ac libero erat. Vestibulum ante 
            ipsum primis in faucibus orci luctus et ultrices 
            posuere cubilia curae; Nam gravida ligula non 
            varius vestibulum. Donec eleifend congue massa."
            buttonLabel="Read More"
          />
        </Col>
        <Col>
          <NewsCard
            date="Sept. 16, 2022"
            title="Lorem Ipsum"
            text="Suspendisse potenti. Pellentesque mattis 
            mattis posuere. Curabitur id metus tristique, 
            porttitor turpis et, rhoncus mauris. Mauris ac 
            viverra sem. Aliquam quam tellus, egestas vitae 
            neque nec, posuere tempus velit. Nam lobortis 
            eros quam. Fusce ut vehicula odio. Nam ornare 
            dui vel lectus ornare, nec interdum velit 
            pharetra. Morbi ac libero erat. Vestibulum ante 
            ipsum primis in faucibus orci luctus et ultrices 
            posuere cubilia curae; Nam gravida ligula non 
            varius vestibulum. Donec eleifend congue massa."
            buttonLabel="Read More"
          />
        </Col>
        <Col>
          <NewsCard
            date="Sept. 16, 2022"
            title="Lorem Ipsum"
            text="Suspendisse potenti. Pellentesque mattis 
            mattis posuere. Curabitur id metus tristique, 
            porttitor turpis et, rhoncus mauris. Mauris ac 
            viverra sem. Aliquam quam tellus, egestas vitae 
            neque nec, posuere tempus velit. Nam lobortis 
            eros quam. Fusce ut vehicula odio. Nam ornare 
            dui vel lectus ornare, nec interdum velit 
            pharetra. Morbi ac libero erat. Vestibulum ante 
            ipsum primis in faucibus orci luctus et ultrices 
            posuere cubilia curae; Nam gravida ligula non 
            varius vestibulum. Donec eleifend congue massa."
            buttonLabel="Read More"
          />
        </Col>
        <Col>
          <NewsCard
            date="Sept. 16, 2022"
            title="Lorem Ipsum"
            text="Suspendisse potenti. Pellentesque mattis 
            mattis posuere. Curabitur id metus tristique, 
            porttitor turpis et, rhoncus mauris. Mauris ac 
            viverra sem. Aliquam quam tellus, egestas vitae 
            neque nec, posuere tempus velit. Nam lobortis 
            eros quam. Fusce ut vehicula odio. Nam ornare 
            dui vel lectus ornare, nec interdum velit 
            pharetra. Morbi ac libero erat. Vestibulum ante 
            ipsum primis in faucibus orci luctus et ultrices 
            posuere cubilia curae; Nam gravida ligula non 
            varius vestibulum. Donec eleifend congue massa."
            buttonLabel="Read More"
          />
        </Col>
      </Row>
    </Container>
  )
}