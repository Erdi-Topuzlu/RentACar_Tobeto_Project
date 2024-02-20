import React from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet";
import CommonSection from "../components/ui/CommonSection";
import { useTranslation } from "react-i18next";
import CampaingList from "../components/ui/CampaignList";

const Campaign = () => {
  const { t } = useTranslation();
  return (
    <Helmet title={t('campaigns')}>
      <CommonSection title={t("campaigns")} />
      <section>
        <Container>
          <Row>
            <CampaingList />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Campaign;
