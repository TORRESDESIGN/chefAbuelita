const PORT = 8000;
import express from 'express';
import cors from 'cors';
//import axios from 'axios';
import Anthropic from "@anthropic-ai/sdk";
import 'dotenv/config';

const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"]
};

// Add middleware
//app.use(express.json());
//app.use(cors());
app.use(cors(corsOptions));

const SYSTEM_PROMPT = process.env.PROMPT;

const ingredientsArr = ["tortillas", "cheese", "onions"];

app.get('/', (req, res) => {
    res.json({
        Ingredients: ingredientsArr
    })
})
/*
app.get('/', async (req, res) => {
    try {
        const anthropic = new Anthropic({  
            apiKey: process.env.ANTHROPIC_API_KEY,
        });
        
        const ingredientsString = ingredientsArr.join(", ");
        console.log(`Ingredients: ${ingredientsString}`);
        
        const msg = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: [
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
        });
        
        // Return just the content from the response
        return res.json({
            "message": msg.content[0].text
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            "error": "Failed to get recipe",
            "details": error.message
        });
    }
});
*/
app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`);
});