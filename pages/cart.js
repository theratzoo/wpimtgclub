import CardHoverImage from './cardhoverimage.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import Button from 'react-bootstrap/Button'
import emailjs from 'emailjs-com';
// TODO: add paddingRight to all th and td to make spacing look nice!

//TODO (for total and for individual prices): make it so that they have "nice" prices... i.e., 2 digits after the decimal always~

const wholeData = require('dsv-loader!./mtg_card_catalog.csv')
export default class Cart extends React.Component {
	constructor(props) {
		super(props);
        
	}

    // TODO: add email address via this function
    // TODO: for name and email address, do not let them send the stuff w/o a valid email address and a blank name...
    //(for email, we state we just use email address for confirmation and that is all...)
    sendEmail() {
        const name = document.getElementById('buyerName');
        let paymethod = "Paypal"; // default payment method is Paypal
        if(document.getElementById('venmo').checked) paymethod = "Venmo";
        if(document.getElementById('cash').checked) paymethod = "Cash";
        const dateObj = new Date();
        const month = dateObj.getUTCMonth() + 1; //months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        const date = year + "/" + month + "/" + day;
        const order = document.getElementById('cartTable').innerHTML + "<br>" + document.getElementById('total').innerText;
        
        const template_params = {
            name: name, // ask for name!
            date: date, // that is all we need, no necessity for time
            order: order, // this will be giant text blob of order that we construct in this function
            paymethod: paymethod// this is found out by seeing which one is checked. if none, we default to Paypal.
        };
        
        emailjs.send(process.env.NEXT_PUBLIC_EMAIL_SERVICE, process.env.NEXT_PUBLIC_EMAIL_TEMPLATE, template_params, process.env.NEXT_PUBLIC_EMAIL_USER)
          .then((result) => {
              window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
          }, (error) => {
              console.log(error.text);
          });
      }

      //TODO: since i use this in multiple files, we can move it to its own and import it...
      fixPrice(pr) {
		let new_pr = pr;
		if(pr.indexOf(".") == -1) { //xxx
			new_pr = new_pr + ".00";
			return new_pr;
		}
		else if(pr.indexOf(".") + 3 == pr.length) { //xxx.13
			return new_pr;
		} else { //xxx.1
			new_pr = new_pr + "0";
			return new_pr;
		}
	}
	
	render() {
        const tempCart = this.props.cart + "";
        const cart = tempCart.split(",");
        let total = 0;
        let data = wholeData;
        console.log(cart);
        data = data.filter((card) => {
            if(cart[card['WPI Id']] != '0') {
                total += card['Price'] * parseInt(cart[card['WPI Id']])
                return true;
            }
            return false;
        })

        total = Math.round(total*100) / 100;
        console.log(total > 0)
        const isCartEmpty = total == 0;
        //console.log("RE RENDERING CART " + data + " CART :  " + cart + "temp cart: " + tempCart)
		return (
			<div>	
            <br/>
            <div id="cartTable">
            <table>
                <thead>
                    <tr>
                        <th>Card Name</th>&nbsp;&nbsp;&nbsp;&nbsp;
                        <th>Quantity Added</th>&nbsp;&nbsp;&nbsp;&nbsp;
                        <th>Set</th>&nbsp;&nbsp;&nbsp;&nbsp;
                        <th>Condition</th>&nbsp;&nbsp;&nbsp;&nbsp;
                        <th>Foil</th>&nbsp;&nbsp;&nbsp;&nbsp;
                        <th>Price Per Card</th>&nbsp;&nbsp;&nbsp;&nbsp;
                    </tr>
                </thead>
                <tbody>
                    {data.map((card, i)=> 
                    <tr key={i}>
                        <td>
                            <CardHoverImage cardName={card["Card Name"]} productId={card["Product Id"]}/>
                        </td>&nbsp;&nbsp;&nbsp;&nbsp;
                        <td>{cart[card["WPI Id"]]}</td>&nbsp;&nbsp;&nbsp;&nbsp;
                        <td>{card["Set"]}</td>&nbsp;&nbsp;&nbsp;&nbsp;
                        <td>{card["Condition"]}</td>&nbsp;&nbsp;&nbsp;&nbsp;
                        <td>{card["Foil"]}</td>&nbsp;&nbsp;&nbsp;&nbsp;
                        <td>{"$" + this.fixPrice(card["Price"])}</td>&nbsp;&nbsp;&nbsp;&nbsp;
                    </tr>
                    )}
                </tbody>
            </table>
            </div>
            <br/>
            <h3 id="total">{"Total: $" + this.fixPrice(total.toString())}</h3>
            <br/>
            <h4>Name&nbsp;&nbsp;&nbsp;&nbsp;<input id="buyerName" name="name" type="text" placeholder="name..."/></h4>
            <h4>Email Address&nbsp;&nbsp;&nbsp;&nbsp;<input id="buyerEmail" name="email" type="email" placeholder="email..."/></h4>
            <h4>Payment Option</h4>
                <div className="form-check">
                        <input className="form-check-input" type="radio" name="paymentMethods" id="paypal" onClick={() => document.getElementById('reserve').disabled = isCartEmpty}/>
                        <label className="form-check-label" htmlFor="paypal">
                            PayPal
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="paymentMethods" id="venmo" onClick={() => document.getElementById('reserve').disabled = isCartEmpty}/>
                        <label className="form-check-label" htmlFor="venmo">
                            Venmo
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="paymentMethods" id="cash" onClick={() => document.getElementById('reserve').disabled = isCartEmpty}/>
                        <label className="form-check-label" htmlFor="cash">
                            Cash
                        </label>
                    </div>
                        
                
                
                    
                    
                    
       
            <br/>
            <br/>
            <p>Note: once you click &quot;confirm checkout&quot;, you have one week to pay for the cards, or else you will have to re-order at the new prices. Prices will NOT change during the one-week reserve period.</p>
            <h4><Button class="btn btn-primary" disabled={false} id='reserve' onClick={() => this.sendEmail()}>Confirm Checkout (Reserve Cards)</Button></h4>
        </div>
		)
	}
	
}
//TODO: for the name and email inputs, add a label for them instead of h4 tags! small thing