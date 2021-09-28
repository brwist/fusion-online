import backgroundArt from "@assets/images/fusionww-logo-only-white.svg";
import fusionDarkLogo from "@assets/images/fusionww-logo-color-green.svg";
import fusionLightLogo from "@assets/images/rocketChips.png";
import { makeStyles } from "@material-ui/core/styles";
import useTheme from "@saleor/hooks/useTheme";
import React from "react";
import SVG from "react-inlinesvg";

const useStyles = makeStyles(
  theme => ({
    logo: {
      "& img": {
        display: "block",
        height: 40,
        marginBottom: theme.spacing(4)
      }
    },
    mainPanel: {
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2)
      },
      background: theme.palette.background.paper,
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      justifyContent: "center",
      padding: theme.spacing(6),
      width: "100%"
    },
    mainPanelContent: {
      [theme.breakpoints.up("xs")]: {
        width: "100%"
      },
      [theme.breakpoints.up("sm")]: {
        width: 328
      },
      "@media (min-width: 1440px)": {
        width: 464
      },
      margin: "auto",
      width: "100%"
    },
    root: {
      [theme.breakpoints.up("md")]: {
        gridTemplateColumns: "376px 1fr"
      },
      "@media (min-width: 1440px)": {
        gridTemplateColumns: "520px 1fr"
      },
      display: "grid",
      gridTemplateColumns: "1fr",
      height: "100vh",
      overflow: "hidden",
      width: "100vw"
    },
    sidebar: {
      [theme.breakpoints.up("md")]: {
        display: "block",
        backgroundColor: theme.palette.primary.light
      },
      display: "none"
    },
    sidebarArt: {
      "& svg": {
        width: "90%",
        transform: "translate(108px,259px)"
      }
    }
  }),
  {
    name: "Layout"
  }
);

const Layout: React.FC = props => {
  const { children } = props;

  const classes = useStyles(props);
  const { isDark } = useTheme();

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <SVG className={classes.sidebarArt} src={backgroundArt} />
      </div>
      <div className={classes.mainPanel}>
        <div className={classes.mainPanelContent}>
          <img
            className={classes.logo}
            src={isDark ? fusionDarkLogo : fusionLightLogo}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.displayName = "Layout";
export default Layout;
