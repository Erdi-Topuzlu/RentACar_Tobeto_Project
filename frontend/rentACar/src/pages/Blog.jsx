import React from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet";
import CommonSection from "../components/ui/CommonSection";
import BlogList from "../components/ui/BlogList";
import { useTranslation } from "react-i18next";

const Blog = () => {
  const { t } = useTranslation();
  return (
    <Helmet title={t('blog')}>
      <CommonSection title="Blogs" />
      <section>
        <Container>
          <Row>
            <BlogList />
            <BlogList />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Blog;
