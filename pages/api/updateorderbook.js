const fs = require('fs')
    
export default async function handler (req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  return res.status(200).send("Success");

  fs.readFile('data/orderbook.json', function (err, data) {
    const json = JSON.parse(data);
    json["order_book"].push(JSON.parse(req.body));
    fs.writeFile("data/orderbook.json", JSON.stringify(json), () => console.log("Written!"));
})
  return res.status(200).send("Success");
}