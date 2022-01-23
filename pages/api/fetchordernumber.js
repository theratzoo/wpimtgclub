const fs = require('fs')
    
export default async function handler (req, res) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' });
    return;
  }
  const orderNumber = Math.floor(Math.random() * 100000)
  return res.status(200).send(JSON.stringify({order_number: orderNumber}));
    /*fs.readFile("data/orderTicker.txt", function (err, data) {
        const orderNumber = parseInt(data) + 1;
        console.log(orderNumber);
        fs.writeFile("data/orderTicker.txt", orderNumber.toString(), () => console.log("Written!"));
        return res.status(200).send(JSON.stringify({order_number: orderNumber}));
    })*/
}