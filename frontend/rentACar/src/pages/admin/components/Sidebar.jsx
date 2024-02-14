import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CarRentalIcon from "@mui/icons-material/CarRental";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import i18n from "../../../i18n";
import turkey from "../../../assets/all-images/tr.png";
import england from "../../../assets/all-images/en.png";
import ColorSchemeToggle from "./ColorShemeToggle";
import { closeSidebar } from "../utils";
import { Link } from "@mui/joy";
import { ReactSVG } from "react-svg";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toastError, toastSuccess } from "../../../service/ToastifyService";
import { NavDropdown } from "react-bootstrap";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Toggler({ defaultExpanded = false, renderToggle, children }) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

const langSelect = (eventKey) => {
  i18n.changeLanguage(eventKey);
  localStorage.setItem("lang", eventKey);
};

export default function Sidebar() {
  const { details, status, error } = useSelector((state) => state.userDetail);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const location = useLocation();
  const token = localStorage.getItem("access_token");

  const handleLogout = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/logout", {
        method: "POST",
        headers: headers,
      });

      if (response.ok) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        toastSuccess(t("logoutSuccess"));
        navigate("/home");
      } else {
        toastError(t("logoutFailed"));
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setShowUi(true);
        window.location.reload();
        //navigate("/login");
      }
    } catch (error) {
      console.error(t("logoutFailed"), error);
    }
  };

  const menuItems = [
    { label: t("dashboard"), route: "dashboard" },
    { label: t("brands"), route: "brands" },
    { label: t("models"), route: "models" },
    { label: t("colors"), route: "colors" },
    { label: t("cars"), route: "cars" },
    { label: t("rentals"), route: "rentals" },
    { label: t("campaigns"), route: "campaigns" },
  ];

  const isMenuItemSelected = (route) => {
    return location.pathname.includes(route);
  };

  if (status === "LOADING") {
    return <Loading />;
  } else if (status === "FAIL") {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ColorSchemeToggle />
        <NavDropdown
          menuVariant="dark"
          title={
            i18n.language === "en" ? (
              <img width={24} src={england} />
            ) : i18n.language === "tr" ? (
              <img width={24} src={turkey} />
            ) : // Handle other languages if needed
            null
          }
          id="nav-dropdown"
          onSelect={langSelect}
        >
          {i18n.language === "en" ? (
            <NavDropdown.Item eventKey="tr">
              <img width={16} src={turkey} /> {t("tr-TR")}
            </NavDropdown.Item>
          ) : i18n.language === "tr" ? (
            <NavDropdown.Item eventKey="en">
              <img width={16} src={england} /> {t("en-US")}
            </NavDropdown.Item>
          ) : // Handle other languages if needed
          null}
        </NavDropdown>
      </Box>
      <Divider />
      <Link component={RouterLink} to="../home" underline="none">
        <IconButton variant="soft" color="neutral" size="lg">
          <CarRentalIcon />
        </IconButton>
        <Typography level="title-lg">{t("pair-1")}</Typography>
      </Link>

      <Divider />
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          {menuItems.map((menuItem, index) => (
            <ListItem key={index}>
              <ListItemButton selected={isMenuItemSelected(menuItem.route)}>
                <ReactSVG
                  src={`/src/assets/icons/${menuItem.route}-mini.svg`} 
                />
                <Link
                  component={RouterLink}
                  to={menuItem.route}
                  underline="none"
                >
                  <ListItemContent>
                    <Typography level="title-sm">{menuItem.label}</Typography>
                  </ListItemContent>
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <ReactSVG
                      src={`/src/assets/icons/images-mini.svg`}
                    />
                  <ListItemContent>
                    <Typography level="title-sm">{t("images")}</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                <ListItemButton selected={isMenuItemSelected("car-images")}>
                    <ReactSVG
                      src={`/src/assets/icons/car-images-mini.svg`}
                    />
                    <Link
                      component={RouterLink}
                      to={"carImages"}
                      underline="none"
                    >
                      <ListItemContent>
                        <Typography level="title-sm">
                          {t("carImg")}
                        </Typography>
                      </ListItemContent>
                    </Link>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton selected={isMenuItemSelected("slider")}>
                    <ReactSVG
                      src={`/src/assets/icons/slider-mini.svg`}
                    />
                    <Link
                      component={RouterLink}
                      to={"slider"}
                      underline="none"
                    >
                      <ListItemContent>
                        <Typography level="title-sm">
                          {t("slider")}
                        </Typography>
                      </ListItemContent>
                    </Link>
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
        </List>

        {/* <ListItem>
            <ListItemButton>
            <ReactSVG src="/src/assets/icons/bill-mini.svg" />
              <ListItemContent>
                <Typography level="title-sm">Invoices</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem> */}

        {/* <ListItem>
            <ListItemButton>
            <ReactSVG src="/src/assets/icons/user-mini.svg" />
              <ListItemContent>
                <Typography level="title-sm">Users</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem> */}

        <List
          size="sm"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-gap": "8px",
            mb: 2,
          }}
        >
          {/* <ListItem>
            <ListItemButton>
              <IconButton size="md" variant="plain" color="neutral">
                <SettingsRoundedIcon />
              </IconButton>
              Settings
            </ListItemButton>
          </ListItem> */}
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar
          variant="outlined"
          size="sm"
          src={
            details.userPhotoUrl ||
            "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
          }
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{details.name}</Typography>
          <Typography level="body-xs">{details.email}</Typography>
        </Box>

        <IconButton
          onClick={handleLogout}
          size="md"
          variant="plain"
          color="neutral"
        >
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}
