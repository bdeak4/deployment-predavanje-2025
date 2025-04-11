import { useState } from "react";
import {
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  List,
  ListItem,
  Drawer,
} from "@mui/material";
import {
  Logout as LogoutIcon,
  BarChart as StatsIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";
import { useAuth } from "@/contexts";
import { Role } from "@/enums/Role";
import avatar from "@/assets/images/avatar.png";

export const AvatarMenu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleToggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setIsDrawerOpen(false);
  };

  const generateListItemStyle = () => ({
    border: "none",
    padding: "10px 20px",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "var(--light-blue)",
    },
    transition: "background-color 0.3s ease",
  });

  return (
    <>
      <IconButton onClick={handleToggleDrawer}>
        <img src={avatar} alt="avatar" />
      </IconButton>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleToggleDrawer}
        slotProps={{
          paper: {
            sx: {
              top: "78px",
              height: "calc(100vh - 78px)",
              width: 250,
              backgroundColor: "var(--white-background)",
              boxShadow: "none",
            },
          },
        }}
      >
        <Box role="presentation" onClick={handleToggleDrawer}>
          <List>
            <ListItem component="button" sx={generateListItemStyle()}>
              <ListItemIcon>
                <StatsIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText primary="Stats" />
            </ListItem>

            {user?.role === Role.Admin && (
              <ListItem component="button" sx={generateListItemStyle()}>
                <ListItemIcon>
                  <AdminIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Admin" />
              </ListItem>
            )}

            <ListItem
              component="button"
              sx={generateListItemStyle()}
              onClick={handleLogout}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
