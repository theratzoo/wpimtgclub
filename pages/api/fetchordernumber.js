const fs = require('fs')
    
export default async function handler (req, res) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' });
    return;
  }
    fs.readFile("data/orderTicker.txt", function (err, data) {
        const orderNumber = parseInt(data) + 1;
        console.log(orderNumber);
        fs.writeFile("data/orderTicker.txt", orderNumber.toString(), () => console.log("Written!"));
        return res.status(200).send(JSON.stringify({order_number: orderNumber}));
    })
}