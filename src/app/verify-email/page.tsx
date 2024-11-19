"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, Paper, Typography, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f5f5f5",
});

const StyledPaper = styled(Paper)({
  padding: "32px",
  maxWidth: 400,
  width: "90%",
  textAlign: "center",
});

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      try {
        const response = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error("Verification failed");
        }

        setStatus("success");
        setMessage("Email verified successfully!");

        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } catch (error) {
        setStatus("error");
        setMessage("Failed to verify email. Please try again.");
      }
    };

    verifyEmail();
  }, [searchParams, router, isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <StyledBox>
      <StyledPaper elevation={3}>
        {status === "loading" && <CircularProgress sx={{ marginBottom: 2 }} />}
        {status === "success" && (
          <CheckCircleIcon
            sx={{ fontSize: 60, color: "success.main", marginBottom: 2 }}
          />
        )}
        {status === "error" && (
          <ErrorIcon
            sx={{ fontSize: 60, color: "error.main", marginBottom: 2 }}
          />
        )}
        <Typography variant="h5" gutterBottom>
          Email Verification
        </Typography>
        <Typography color="text.secondary">{message}</Typography>
      </StyledPaper>
    </StyledBox>
  );
}
