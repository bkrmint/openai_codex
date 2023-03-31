import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors()); // allow cross-origin requests
app.use(express.json()); // allow to pass json from frontend to backend (req.body)

app.get('/', (req, res) => {
    res.sendStatus(200).send({ message: 'Hello World!' });
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        console.log('prompt in server: ', prompt);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 100,
            temperature: 0,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        res.status(200).send({
            bot: response.data.choices[0].text,
        });
    }
    catch (error) {
        res.status(500).send({ error });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port http://localhost:5000');
});