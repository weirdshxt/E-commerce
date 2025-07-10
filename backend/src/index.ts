import express from "express";
import cors from "cors";
import productsRouter from "./routes/products";
import feedbackRouter from "./routes/feedback";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);
app.use("/feedback", feedbackRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
