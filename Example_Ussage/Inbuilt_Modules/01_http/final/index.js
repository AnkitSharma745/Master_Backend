const http = require("http");
const url = require("url");

let items = [];

const serveUI = (response) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CRUD Operations</title>
    </head>
    <body>
      <h1>CRUD Operations with Node.js</h1>
      <form id="createForm">
        <input type="text" id="itemName" placeholder="Enter item name" required />
        <button type="submit">Add Item</button>
      </form>
      <h2>Items List</h2>
      <ul id="itemsList"></ul>

      <script>
        const createForm = document.getElementById('createForm');
        const itemNameInput = document.getElementById('itemName');
        const itemsList = document.getElementById('itemsList');

       
        const fetchItems = async () => {
          const res = await fetch('/items');
          const data = await res.json();
          itemsList.innerHTML = '';
          data.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerText = item.name;

            const updateButton = document.createElement('button');
            updateButton.innerText = 'Update';
            updateButton.onclick = () => {
              const newName = prompt('Enter new name for the item:', item.name);
              if (newName) {
                updateItem(item.id, newName);
              }
            };

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = () => {
              deleteItem(item.id);
            };

            li.appendChild(updateButton);
            li.appendChild(deleteButton);
            itemsList.appendChild(li);
          });
        };

      
        createForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const itemName = itemNameInput.value.trim();
          if (itemName) {
            await fetch('/items', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: itemName })
            });
            itemNameInput.value = '';
            fetchItems();
          }
        });

        const updateItem = async (id, newName) => {
          await fetch(\`/items/\${id}\`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName })
          });
          fetchItems();
        };

        // Delete item
        const deleteItem = async (id) => {
          await fetch(\`/items/\${id}\`, { method: 'DELETE' });
          fetchItems();
        };

        fetchItems();
      </script>
    </body>
    </html>
  `;
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end(htmlContent);
};

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const method = request.method;

  if (parsedUrl.pathname === "/") {
    serveUI(response);
  } else if (parsedUrl.pathname === "/items" && method === "GET") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(items));
  } else if (parsedUrl.pathname === "/items" && method === "POST") {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      try {
        const parsedBody = JSON.parse(body);
        const newItem = { id: Date.now(), name: parsedBody.name };
        items.push(newItem);
        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Item added" }));
      } catch (error) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Invalid request" }));
      }
    });
  } else if (parsedUrl.pathname.startsWith("/items/") && method === "PUT") {
    const id = parseInt(parsedUrl.pathname.split("/")[2], 10);
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      try {
        const parsedBody = JSON.parse(body);
        const item = items.find((item) => item.id === id);
        if (item) {
          item.name = parsedBody.name;
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ message: "Item updated" }));
        } else {
          response.writeHead(404, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ message: "Item not found" }));
        }
      } catch (error) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Invalid request" }));
      }
    });
  } else if (parsedUrl.pathname.startsWith("/items/") && method === "DELETE") {
    const id = parseInt(parsedUrl.pathname.split("/")[2], 10);
    items = items.filter((item) => item.id !== id);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Item deleted" }));
  } else {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Not Found" }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
