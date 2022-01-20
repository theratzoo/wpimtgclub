import CardHoverImage from './cardhoverimage.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import Button from 'react-bootstrap/Button'
import emailjs from 'emailjs-com';
import fixPrice from './functions/fixprice.js'
import fixCondition from './functions/fixcondition.js'
const fs = require('fs');
const wholeData = require('dsv-loader!../spreadsheets/mtg_card_catalog.csv');
export default class Cart extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            isConfirmDisabled: true,
        }   
	}

    sendEmail() {
        const tempCart = this.props.cart + "";
        const cart = tempCart.split(",");
        // this first bit constructs an actual card, with the info we need!
        const actualCart = []
        const quantities = []
        for(let i=0; i<cart.length; i++) {
            if(cart[i] != '0') {
                const quantity = cart[i];
                const card = wholeData[i];
                actualCart.push(card);
                quantities.push(parseInt(quantity));
            }
        }
        const name = document.getElementById('buyerName').value;
        const email = document.getElementById('buyerEmail').value;
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
            paymethod: paymethod,// this is found out by seeing which one is checked. if none, we default to Paypal.
            sender_email: email,
        };
        
        emailjs.send(process.env.NEXT_PUBLIC_EMAIL_SERVICE, process.env.NEXT_PUBLIC_EMAIL_TEMPLATE, template_params, process.env.NEXT_PUBLIC_EMAIL_USER)
          .then((result) => {
            // update CSV here
            const new_sheet = [];
            for(let i=0; i<wholeData.length; i++) {
                let foundIt = false;
                for(let j=0; j<actualCart.length; j++) {
                    if(wholeData[i]["SKU"] == actualCart[j]["SKU"]) {
                        foundIt = true;
                        if(parseInt(wholeData[i]["Quantity"]) != quantities[j]) {
                            wholeData[i]["Quantity"] = parseInt(wholeData[i]["Quantity"]) - quantities[j];
                            new_sheet.push(wholeData[i]);
                        }
                        break;
                    }
                }
                if(!foundIt) {
                    new_sheet.push(wholeData[i]);
                }
            }
            const json = {"new_sheet": new_sheet}
            fetch('/api/updatecatalog', {
                method: 'POST',
                body: JSON.stringify(json)
            }).then(result => {
                console.log("Looks good!") // TODO: error checking goes here
            })
              alert("Order has been confirmed!")
              window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
          }, (error) => {
              console.log(error.text);
          });
      }

    // returns whether button is disabled (true) or not disabled (false)
    confirmButtonState() {
        const name = document.getElementById('buyerName').value;
        const email = document.getElementById('buyerEmail').value;
        const isChecked = (document.getElementById('paypal').checked || document.getElementById('venmo').checked || document.getElementById('cash').checked)
        const isInvalid = !(name != "" && /\S+@\S+\.\S+/.test(email) && isChecked);
        this.setState({
            isConfirmDisabled: isInvalid
        });
        return isInvalid;
    }
	
	render() {
        const tempCart = this.props.cart + "";
        const cart = tempCart.split(",");
        let total = 0;
        let data = wholeData;
        data = data.filter((card) => {
            if(cart[card['WPI Id']] != '0') {
                total += card['Price'] * parseInt(cart[card['WPI Id']])
                return true;
            }
            return false;
        });

        total = Math.round(total*100) / 100;
		return (
			<div>	
            <br/>
            <div id="cartTable">
            <table>
                <thead>
                    <tr>
                        <th className="cardInfo">Card Name</th>
                        <th className="cardInfo">Quantity Added</th>
                        <th className="cardInfo">Set</th>
                        <th className="cardInfo">Condition</th>
                        <th className="cardInfo">Foil</th>
                        <th className="cardInfo">Price Per Card</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((card, i)=> 
                    <tr key={i}>
                        <td className="cardInfo">
                            <CardHoverImage cardName={card["Card Name"]} productId={card["Product Id"]}/>
                        </td>
                        <td className="cardInfo">{cart[card["WPI Id"]]}</td>
                        <td className="cardInfo">{card["Set"]}</td>
                        <td className="cardInfo">{fixCondition(card["Condition"])}</td>
                        <td className="cardInfo">{card["Foil"]}</td>
                        <td className="cardInfo">{"$" + fixPrice(card["Price"])}</td>
                    </tr>
                    )}
                </tbody>
            </table>
            </div>
            <br/>
            <h3 id="total">{"Total: $" + fixPrice(total.toString())}</h3>
            <br/>
            <h4>Name&nbsp;&nbsp;&nbsp;&nbsp;<input id="buyerName" name="name" type="text" placeholder="name..." onBlur={() => this.confirmButtonState()}/></h4>
            <h4>Email Address&nbsp;&nbsp;&nbsp;&nbsp;<input id="buyerEmail" name="email" type="email" placeholder="email..." onBlur={() => this.confirmButtonState()}/></h4>
            <h4>Payment Option</h4>
                <div className="form-check">
                        <input className="form-check-input" type="radio" name="paymentMethods" id="paypal" onClick={() => this.confirmButtonState()}/>
                        <label className="form-check-label" htmlFor="paypal">
                            PayPal
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="paymentMethods" id="venmo" onClick={() => this.confirmButtonState()}/>
                        <label className="form-check-label" htmlFor="venmo">
                            Venmo
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="paymentMethods" id="cash" onClick={() => this.confirmButtonState()}/>
                        <label className="form-check-label" htmlFor="cash">
                            Cash
                        </label>
                    </div>
                        
                
                
                    
                    
                    
       
            <br/>
            <br/>
            <p>Notice: once you click &quot;confirm checkout&quot;, you have one week to pay for the cards, or else you will have to re-order at the new prices. Prices will NOT change during the one-week reserve period. You MUST also hit the confirmation link in your email that you receive, or else the cards will not be reserved (this is to prevent botting).</p>
            <h4><Button class="btn btn-success" disabled={this.state.isConfirmDisabled} id='reserve' onClick={() => this.sendEmail()}>Confirm Checkout (Reserve Cards)</Button></h4>
        </div>
		)
	}
	
}