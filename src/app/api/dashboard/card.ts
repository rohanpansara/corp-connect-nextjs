import type { NextApiRequest, NextApiResponse } from "next";
import { apiClient } from "@/utils/apiClient";
import { useRouter } from "next/navigation";

export default async function cards(req: NextApiRequest, res: NextApiResponse) {
  const router = useRouter();
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Retrieve access token from cookies
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Forward request to Spring Boot backend
    const response = await apiClient.get("/dashboard/cards", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Send back the card data from the backend response
    res.status(200).json({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Request failed";

    if (error.response?.status === 401) {
      router.push("/auth/login");
      res.status(401).json({ error: "Unauthorized" });
    } else {
      console.error("Failed to retrieve cards:", errorMessage);
      res.status(500).json({ error: errorMessage });
    }
  }
}
