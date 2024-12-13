const functions = require("@google-cloud/functions-framework");
const { getOpenAIResponse } = require("./openaicall");

// Register an HTTP function with the Functions Framework
functions.http("main_entrypoint", (req, res) => {
  // Set CORS headers for all responses
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    // Handle preflight requests
    res.set("Access-Control-Allow-Methods", "GET, POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).send("");
    return;
  }

  switch (req.method) {
    case "GET":
      handleGet(req, res);
      break;
    case "POST":
      handlePost(req, res);
      break;
    default:
      res.status(405).send({ error: "Method not allowed" });
  }
});

async function handleGet(req, res) {
  res.status(200).send({
    message:
      "Hello from Cloud Functions! Use post with json with message as a field",
    timestamp: new Date().toISOString(),
  });
}

async function handlePost(req, res) {
  const body = req.body.message;
  if (!body) {
    res.status(400).send({ error: "Request body is required" });
    return;
  }

  const response = await getOpenAIResponse(body);

  res.status(200).send({
    message: response,
    timestamp: new Date().toISOString(),
  });
}
