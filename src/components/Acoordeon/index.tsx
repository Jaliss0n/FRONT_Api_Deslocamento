import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import {
  Divider,
  IconProps,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import styled from "@emotion/styled";
import { useNavContext } from "../context/navProvider";

const BlueListIcon = styled(ListItemButton)`
  background-color: #4154e4;
  margin: 10px 0 10px 0;
  border-radius: 12px;
  &:hover {
    background-color: #3747c5;
  }
`;

interface AccordeonProps {
  nameAccordeon: string;
  textArray: string[];
  iconsArray: React.ReactElement<IconProps>[];
  pages: number[];
}

export default function AccordeonCustom({
  nameAccordeon,
  textArray,
  iconsArray,
  pages,
}: AccordeonProps) {

  const {setNumberPag} = useNavContext();

  return (
    <div style={{ marginBottom: "10%" }}>
      <Accordion sx={{ backgroundColor: "#5164f0", margin: "10% 0 0 0" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" color="white">
            {nameAccordeon}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <Divider color="#fff" sx={{ margin: "1% 0 1% 0" }} />
            {textArray.map((text, index) => {
              const page = pages[index];
              const icon = iconsArray[index];

              return (
                <ListItem key={text} disablePadding>
                  <BlueListIcon onClick={() => setNumberPag(page)}>
                    <ListItemIcon sx={{ color: "#ffffff" }}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText sx={{ color: "#ffffff" }} primary={text} />
                  </BlueListIcon>
                </ListItem>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
