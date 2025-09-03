//backend server
const PORT = 8000;
import express from 'express';
import cors from 'cors';
import bodyParser  from 'body-parser';
import Anthropic from "@anthropic-ai/sdk";
import 'dotenv/config';

const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"]
};

// Add middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());// newest way to use middleware instead of express.json()
app.use(bodyParser.urlencoded({ extended: true }));
/*
For when I want to get user info(hardware/Ip)
app.use('/', (req, res, next) => {
    console.log("middleware...")
    console.log(`${req.method} ${req.path} - ${req.ip}`, `${req}`)
    next();
})
*/
//The A.I. sauce
const SYSTEM_PROMPT = process.env.PROMPT;
const anthropic = new Anthropic({
    // for ANTHROPIC_API_KEY
    apiKey: process.env.ANTHROPIC_API_KEY,
})

//const ingredientsArr = ["tortillas", "cheese", "onions"]; static, can delete

app.get('/', (req, res) => {
    res.json({
        Ingredients: "none"
    })
})

app.post('/recipe', async (req, res) => {
    const ingredients = req.body;
    console.log(`I got your ingredients of ${ingredients}, let me think of a recipe hijo mio...`);

    try {
        const results = await getRecipeFromChefClaude(ingredients);

        res.json({
        success: true,
        message: results,
        data: ingredients
        })
    } catch(error) {
        console.log("Error: ", error)
    }

    
    async function getRecipeFromChefClaude(ingredients) {

    const ingredientsString = ingredients.join(", ")

    const msg = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
            { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make 
        and also add an option on how to make it a little healthier. Format your response in markdown to make it easier to render to a web page with just the title and bullet points.` },
        ],
    });
    return msg.content[0].text
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`);
});