import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import ErrorPage from "../../components/ui/ErrorPage";
import Loading from "../../components/ui/Loading";
import Helmet from "../../components/Helmet";
import { useTranslation } from "react-i18next";
import { TabPanel } from "@mui/joy";
import Rentals from "./Rentals";
import Settings from "./Settings";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ChangePassword from "./ChangePassword";

export default function Profile() {
  const { details, status, error } = useSelector((state) => state.userDetail);
  const { t } = useTranslation();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const tabIndex = location.state?.tabIndex;

    if (tabIndex !== undefined) {
      console.log("Gelen tabIndex:", tabIndex);
      setActiveTab(tabIndex);
    }
  }, [location.state]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (status === "LOADING") {
    return <Loading />;
  } else if (status === "FAIL") {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <Helmet title={t("Profile")}>
      <Box sx={{ flex: 1, width: "100%" }}>
        <Box
          sx={{
            position: "sticky",
            top: { sm: -100, md: -110 },
            bgcolor: "background.body",
            zIndex: 9995,
          }}
        >
          <Box sx={{ px: { xs: 2, md: 6 } }}>
            <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
              {t("welcomeProfile")}
              {details.name ? details.name : "User"}
            </Typography>
          </Box>
          <Tabs
            index={activeTab}
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              bgcolor: "transparent",
            }}
          >
            <TabList
              tabFlex={1}
              size="sm"
              defaultValue={0}
              sx={{
                pl: { xs: 0, md: 4 },
                justifyContent: "left",
                [`&& .${tabClasses.root}`]: {
                  fontWeight: "600",
                  flex: "initial",
                  color: "text.tertiary",
                  [`&.${tabClasses.selected}`]: {
                    bgcolor: "transparent",
                    color: "text.primary",
                    "&::after": {
                      height: "2px",
                      bgcolor: "primary.500",
                    },
                  },
                },
              }}
            >
              <Tab
                sx={{ borderRadius: "6px 6px 0 0" }}
                indicatorInset
                index={0}
              >
                {t("profileSetting")}
              </Tab>
              <Tab
                sx={{ borderRadius: "6px 6px 0 0" }}
                indicatorInset
                index={1}
              >
                {t("myRentals")}
              </Tab>
              <Tab
                sx={{ borderRadius: "6px 6px 0 0" }}
                indicatorInset
                index={2}
              >
                {t("changePassword")}
              </Tab>
              
            </TabList>
            <TabPanel value={0}>
                <Settings />
            </TabPanel>
            <TabPanel value={1}>
            <Container>
                <Rentals />
              </Container>
            </TabPanel>

            <TabPanel value={2}>
              <ChangePassword />
            </TabPanel>

            
          </Tabs>
        </Box>
      </Box>
    </Helmet>
  );
}
