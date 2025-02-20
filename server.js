import express from "express";
import db from "./singletonDatabase.js";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/check-db-connection", async (req, res) => {
  try {
    const result = await db.query("SELECT * from hotel");

    res.json({
      success: true,
      message: "✅ Database is connected!",
      data: result.rows,
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    res
      .status(500)
      .json({ success: false, message: "❌ Database connection failed" });
  }
});

app.get("/hotel/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * from hotel WHERE hotelcode = $1", [
      id,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching hotel:", error);
    res.status(500).json({ success: false, message: "Error fetching hotel" });
  }
});

app.get("/rooms/:hotelId", async (req, res) => {
  const { hotelId } = req.params;
  try {
    const result = await db.query("SELECT * from room WHERE hotelcode = $1", [
      hotelId,
    ]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ success: false, message: "Error fetching rooms" });
  }
});

app.get("/hotels", async (req, res) => {
  try {
    const result = await db.query("SELECT * from hotel");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ success: false, message: "Error fetching hotels" });
  }
});

app.listen(PORT, () => {
  console.log(
    `🚀 Server is running on http://localhost:5000/check-db-connection`
  );
});
