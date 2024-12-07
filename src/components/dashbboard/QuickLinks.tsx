import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRouter } from "next/navigation";
import SuggestedLinks from "./SuggestedLinks";

const QuickLinks: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [feedback, setFeedback] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleVerifyEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to send verification email");

      setFeedback({
        open: true,
        message: "Verification email sent! Please check your inbox.",
        severity: "success",
      });
    } catch (error) {
      setFeedback({
        open: true,
        message: "Failed to send verification email. Please try again.",
        severity: "error",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    !profile?.isVerified && {
      title: "Verify Email",
      icon: <EmailIcon />,
      description: "Confirm your email address for account security",
      action: handleVerifyEmail,
    },
    !profile?.isPhoneVerified && {
      title: "Verify Phone Number",
      icon: <PhoneIcon />,
      description: "Add your phone number for additional security",
      action: () => console.log("Verify phone clicked"),
    },
    {
      title: "Set Your Preferences",
      icon: <SettingsIcon />,
      description: "Customize your account settings",
      action: () => router.push("settings/notifications"),
    },
  ].filter(Boolean);

  // Return suggested links first
  if (profile?.isVerified && profile?.isPhoneVerified) {
    return <SuggestedLinks />;
  }

  return (
    <Box className="bg-custom-blue rounded-lg text-white" sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Quick Links
      </Typography>
      <Stack spacing={2}>
        {quickLinks.map((link: any, index) => (
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
            <Stack direction="row" alignItems="center" className="flex justify-between gap-3">
              
              <Box className="lg:w-48">
                <Typography variant="subtitle1">{link.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {link.description}
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{ ml: "auto" }}
                onClick={link.action}
                disabled={loading}
              >
                <ChevronRightIcon />
              </Button>
            </Stack>
          </Paper>
        ))}
      </Stack>
      <Snackbar
        open={feedback.open}
        autoHideDuration={6000}
        onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={feedback.severity}>{feedback.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default QuickLinks;
