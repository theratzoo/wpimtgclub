const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'spreadsheets/mtg_card_catalog.csv',
  header: [
    {id: 'WPI Id', title: 'WPI Id'},
    {id: 'Card Name', title: 'Card Name'},
    {id: 'Quantity', title: 'Quantity'},
    {id: 'Set', title: 'Set'},
    {id: 'Condition', title: 'Condition'},
    {id: 'Foil', title: 'Foil'},
    {id: 'Language', title: 'Language'},
    {id: 'SKU', title: 'SKU'},
    {id: 'Product Id', title: 'Product Id'},
    {id: 'Mana Cost', title: 'Mana Cost'},
    {id: 'CMC', title: 'CMC'},
    {id: 'Main Type', title: 'Main Type'},
    {id: 'Sub Types', title: 'Sub Types'},
    {id: 'Is Legendary', title: 'Is Legendary'},
    {id: 'Oracle Text', title: 'Oracle Text'},
    {id: 'Legalities', title: 'Legalities'},
    {id: 'Reserved List', title: 'Reserved List'},
    {id: 'Keywords', title: 'Keywords'},
    {id: 'Rarity', title: 'Rarity'},
    {id: 'Optionals', title: 'Optionals'},
    {id: 'Price', title: 'Price'},
  ]
});
    
export default async function handler (req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  return res.status(200).send("Success");
  const body = JSON.parse(req.body);
  const data = body["new_sheet"];
  csvWriter
  .writeRecords(data)
  .then(()=> console.log('The CSV file was written successfully'));
  
}