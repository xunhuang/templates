const OpenAI = require("openai");

let openai_api_key = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: openai_api_key,
});

// console.log(JSON.stringify(process.env, null, 2));

module.exports.getOpenAIResponse = async function (message) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: `You are a parser that will extract info from an uber receipt sent from email. 
            You need to extract who took the ride, cost of the ride, date and time, starting location and the destination location. 
            Return the information as JSON with the following fields

            - who
            - datetime
            - cost
            - start_address
            - destination_address`,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: message,
          },
        ],
      },
    ],
    response_format: {
      type: "json_object",
    },
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content;
};
