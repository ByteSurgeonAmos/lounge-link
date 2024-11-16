import React from "react";
import { Box, Paper, Typography, Stack, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SettingsIcon from "@mui/icons-material/Settings";

const QuickLinks: React.FC = () => {
  const quickLinks = [
    {
      title: "Verify Email",
      icon: <EmailIcon />,
      description: "Confirm your email address for account security",
      action: () => console.log("Verify email clicked"),
    },
    {
      title: "Verify Phone Number",
      icon: <PhoneIcon />,
      description: "Add your phone number for additional security",
      action: () => console.log("Verify phone clicked"),
    },
    {
      title: "Set Your Preferences",
      icon: <SettingsIcon />,
      description: "Customize your account settings",
      action: () => console.log("Preferences clicked"),
    },
  ];

  return (
    <Box className="bg-custom-blue text-white" sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Quick Links
      </Typography>
      <Stack spacing={2}>
        {quickLinks.map((link, index) => (
          <Paper
            key={index}
            sx={{
              p: 2,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 2,
              },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              {link.icon}
              <Box>
                <Typography variant="subtitle1">{link.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {link.description}
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{ ml: "auto" }}
                onClick={link.action}
              >
                Get Started
              </Button>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default QuickLinks;
