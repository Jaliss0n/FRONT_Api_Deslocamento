import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "../../../images/logo-naty.png";
import styled from "@emotion/styled";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AccordeonCustom from "../Acoordeon";
import GroupsIcon from "@mui/icons-material/Groups";
import switchScreen from "../context/switchScreen";
import { useNavContext } from "../context/navProvider";

const drawerWidth = 280;

interface Props {
  window?: () => Window;
}

const CustomToolbar = styled(Toolbar)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8%;
`;

export default function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const {numberPag} = useNavContext();


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        backgroundColor: "#3747c0",
        padding: "0 5%",
        minHeight: "100vh",
        overflowY: "scroll",
      }}
    >
      <CustomToolbar>
        <img
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "30%",
            padding: "8%",
            margin: "16% 0",
          }}
          src={logo.src}
          width="100%"
        />
      </CustomToolbar>
      <Divider color="white" sx={{ margin: "10% 0" }} />

      <AccordeonCustom
        nameAccordeon="Clientes"
        textArray={["Cadastrar", "Visualizar"]}
        iconsArray={[<PersonAddAlt1Icon />, <GroupsIcon />]}
        pages={[0, 1]}
      />
      <AccordeonCustom
        nameAccordeon="Condutor"
        textArray={["Cadastrar", "Visualizar"]}
        iconsArray={[<PersonAddAlt1Icon />, <GroupsIcon />]}
        pages={[2, 3]}
      />
      <AccordeonCustom
        nameAccordeon="Veiculo"
        textArray={["Cadastrar", "Visualizar"]}
        iconsArray={[<PersonAddAlt1Icon />, <GroupsIcon />]}
        pages={[4, 5]}
      />
      <AccordeonCustom
        nameAccordeon="Deslocamento"
        textArray={["Cadastrar", "Visualizar"]}
        iconsArray={[<PersonAddAlt1Icon />, <GroupsIcon />]}
        pages={[6, 7]}
      />
      <Box sx={{ marginTop: "auto" }}>
        <Typography color="white" variant="body1">
          Criado por Jalisson
        </Typography>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#3747c0",
          display: {sm: 'none'}
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Api Deslocamento
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      > 
        <Toolbar sx={{ display: {sm: 'none'}}} />
        {switchScreen(numberPag)}
      </Box>
    </Box>
  );
}
