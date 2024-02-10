import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import LinearProgress from "@mui/joy/LinearProgress";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import CarRentalIcon from "@mui/icons-material/CarRental";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import BusinessIcon from "@mui/icons-material/Business";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Link as RouterLink, useLocation } from "react-router-dom";

import ColorSchemeToggle from "./ColorShemeToggle";
import { closeSidebar } from "../utils";
import { Link } from "@mui/joy";
import { ReactSVG } from "react-svg";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

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

export default function Sidebar() {
  
  const { details, status, error } = useSelector((state) => state.userDetail);
  const { t } = useTranslation();

  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", route: "dashboard" },
    { label: "Slider", route: "slider" },
    { label: "Brands", route: "brands" },
    { label: "Models", route: "models" },
    { label: "Colors", route: "colors" },
    { label: "Cars", route: "cars" },
    { label: "Rentals", route: "rentals" },
  ];

  const isMenuItemSelected = (route) => {
    return location.pathname.includes(route);
  };
  
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
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Link component={RouterLink} to="../home" underline="none">
          <IconButton variant="soft" color="neutral" size="lg">
            <CarRentalIcon />
          </IconButton>
          <Typography level="title-lg">Pair-1 Rental</Typography>
        </Link>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>
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
            <ListItemButton selected={isMenuItemSelected(menuItem.route)}
           
            >
              <ReactSVG src={`/src/assets/icons/${menuItem.route}-mini.svg`} />
              <Link component={RouterLink} to={menuItem.route} underline="none">
                <ListItemContent>
                  <Typography level="title-sm">{menuItem.label}</Typography>
                </ListItemContent>
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
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
          src={details.userPhotoUrl ||
            "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
          }
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{details.name}</Typography>
          <Typography level="body-xs">{details.email}</Typography>
        </Box>
        {/* <IconButton size="md" variant="plain" color="neutral">
          <LogoutRoundedIcon />
        </IconButton> */}
      </Box>
    </Sheet>
  );
}
