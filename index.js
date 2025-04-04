const PORT = 8000;
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import bodyParser from "body-parser";
import Anthropic from "@anthropic-ai/sdk";
import 'dotenv/config';

const app = express();


// Add middleware
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

//app.use(express.json());
//app.use(cors());

const SYSTEM_PROMPT = process.env.PROMPT;

app.post('/recipe', (req, res) => {
    res.json({
        'ingredients': `${req.body.ingredients}`
    })
})

/*
const ingredientsArr = ["tortillas", "cheese", "onions"];

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