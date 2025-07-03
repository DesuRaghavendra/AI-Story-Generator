const express = require("express");
const { InferenceClient } = require("@huggingface/inference");

const app = express();

app.use(express.json());

app.use(express.static("public"));

const client = new InferenceClient("PUT THE API KEY HERE");

app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const chatCompletion = await client.chatCompletion({
      provider: "cohere",
      model: "CohereLabs/c4ai-command-a-03-2025",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    res.json({ story: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
