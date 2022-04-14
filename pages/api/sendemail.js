const emailjs = require('emailjs-com');
export default async function handler (req, res) {
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' });
      return;
    }
    
    
    const body = JSON.parse(req.body);
    // TODO: have it read env variables from here
    emailjs.send(body['service'], body['template'], body['template_params'], body['user'])
    return res.status(200).send("Success");
  }