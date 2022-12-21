const express = require("express");
const app = express();
const PORT = 3000;

app.post("/users", (request, response) => {
  const { name, email, password } = request.body;

  response.json({ name, email, password });
});

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))