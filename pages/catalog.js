import MyNavbar from './navbar'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import CardHoverImage from './cardhoverimage.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import SearchMenu from './searchmenu.js'
import Button from 'react-bootstrap/Button'
import Select from "react-select";
import Cart from './cart.js'
// TODO: add paddingRight to all th and td to make spacing look nice!
// TODO: finish up with the card images being tcgplayer ones. so we can rid of this crap!



let data = require('dsv-loader!./mtg_card_catalog.csv')
export default class Catalog extends React.Component {
	constructor(props) {
		super(props)
		const markCartItems = []
		const currentCartItems = []
		for(let i=0; i<data.length; i++) {
			markCartItems.push(null);
			currentCartItems.push(0);
		}
		this.state = {
			data:data,
			displaySearchMenu:false,
			filters:{},
			cart:[],
			cartTotalCount:0,
			cartItem:null,
			markCartItems:markCartItems, // TODO: rename to tempCartItems
			currentCartItems:currentCartItems,
			displayCart:false,
		}
		const handleToUpdate = this.handleToUpdate.bind(this);
	}

	handleToUpdate(nameFilter, oracleTextFilter, cmcTypeFilter, cmcFilter, typesFilter, colorsFilter, formatLegalitiesFilter, setsFilter, rarityFilter) {
		this.setState({
			filters:{nameFilter, oracleTextFilter, cmcTypeFilter, cmcFilter, typesFilter, colorsFilter, formatLegalitiesFilter, setsFilter, rarityFilter}
		});
	}

	isCardAllowed(card) {
		let cmcFilterType = "Equal To";
		for (const [key, value] of Object.entries(this.state.filters)) {
			switch(key) {
				case "nameFilter":
					if (!card['Card Name'].toLowerCase().includes(value.toLowerCase())) {
						return false;
					}
					break;
				case "oracleTextFilter":
					if (!card['Oracle Text'].toLowerCase().includes(value.toLowerCase())) {
						return false;
					}
					break;
				case "cmcTypeFilter":
					if (value != null)
						cmcFilterType = value['label'];
					break;
				case "cmcFilter":
					if (value == "") break;
					const cmc = parseInt(card['CMC'])
					const filterCmc = parseInt(value)
					const subtraction = cmc - filterCmc
					if(cmcFilterType == "Greater Than") {
						if(subtraction <= 0) return false;
					} else if (cmcFilterType == "Less Than") {
						if(subtraction >= 0) return false;
					} else if (subtraction != 0) {
						return false;
					}
					break;
				case "typesFilter":
					let foundIt = true;
					for(const x in value) {
						//console.log("LABEL: " + value[x]['label'] + " MAIN TYPE: " + card["Main Type"])
						if(card['Main Type'].includes(value[x]['label'])) {
							foundIt = true;
							break;
						} else {
							foundIt = false;
						}
					}
					if(!foundIt) return false;
					break;
				case "colorsFilter":
					break; // code later
				case "formatLegalitiesFilter":
					let foundIt2 = true;
					for(const x in value) {
						if(card['Legalities'].includes(value[x]['label'].toLowerCase())) {
							foundIt2 = true;
							break;
						} else {
							foundIt2 = false;
						}
					}
					if(!foundIt2) return false;
					break;
				case "setsFilter":
					//TODO: this is broken, but every set in the dropdown will include
					// the name and parantheses, and then the letter code...
					// so the TODO is to implement that below!
					let foundIt3 = true;
					for(const x in value) {
						if(card['Set'].includes(value[x]['label'])) {
							foundIt3 = true;
							break;
						} else {
							foundIt3 = false;
						}
					}
					if(!foundIt3) return false;
					break;
				case "rarityFilter":
					if (value != null && value['label'].toLowerCase() != card['Rarity']) {
						return false;
					} 
					break;
				default:
					console.log("ERROR: unknown filter")
			}
		}
		return true
	}

	refreshPrice(sku, i, oldPrice) {
		let price = oldPrice
		const options = {method: 'GET', headers: {Accept: 'application/json', "Authorization": "bearer " + process.env.NEXT_PUBLIC_BEARER}};
		fetch(`https://api.tcgplayer.com/pricing/sku/${sku}`, options)
		.then(response => response.json())
		.then(response => { 
			if(response.results[0]["lowPrice"] < 5) {
				price = Math.round(response.results[0]["lowPrice"] * 0.9, 2)
			} else {
				price = Math.round(response.results[0]["lowestListingPrice"] * 0.9, 2)
			}
		})
		.catch(err => console.error(err));
		if(price != oldPrice) {
			//TODO: update CSV here of the new price!
			console.log("update new price into sheet!")
			data[i]['Price'] = price
			this.setState({
				data:[...data]
			})
		}
		
	}

	// depricated: see addToCart(card)
	// TODO: kill this function
	updateCart(card, i) {
		const input = document.getElementById("addToCart" + i);
		let cartChange = input.value;
		// step 1: update cartChange if its value is inaccurate (either an invalid value, or too large)
		if(cartChange.includes("-") || cartChange.includes(".") || cartChange.includes("e")) {
			input.value = "";
			return;
		}
		if(cartChange > card["Quantity"]) {
			input.value = ""
			alert("yo dawg too many carts!") // TODO: make it nicer
			return;
		}

		if(cartChange == "") {
			cartChange = 0;
		}


		// step 2: go through the state, and see if its already in it. if it is, we update it. if not, we add it to the state
		const currCart = this.state.cart;
		let foundIt = false;
		let change = 0
		for(const x in currCart) {
			if(x[0]["SKU"] == card["SKU"]) {
				change = cartChange - x[1]
				// we found a match: instead we just update!
				x[1] = cartChange;
				foundIt = true;
				
				break;
			}
		}
		if(!foundIt) {
			currCart.push([card, cartChange]);
			change = cartChange;
		}
		this.setState({
			cart:[...currCart]
		});
		// step 3: update total count variable so that cart can be reflected
		this.setState({
			cartTotalCount:this.state.cartTotalCount + change
		});
	}


	getItems(q) {
		const obj = [{label: "0"}]
		for(let i=0; i<q; i++) {
			obj.push({label: (i+1).toString()});
		}
		return obj;
	}

	iDontCare(val, wpiId) {
		const markCartItems = this.state.markCartItems;
		markCartItems[wpiId] = val;
		this.setState({
			markCartItems: [...markCartItems]
		});
	}

	addToCart(card) {
		const currentCartItems = this.state.currentCartItems
		let quantity = this.state.markCartItems[card["WPI Id"]];
		if(quantity == null) {
			// this means that they hit add to cart w/o selecting a quantity to add!
			// TODO: can fix this bug by adding default value to the Select, which is zero.
			return;
		} else {
			quantity = parseInt(quantity["label"]);
			let change = quantity;
			// actually do the add-to-cart functionality...
			if(this.state.currentCartItems[card["WPI Id"]] == null) {
				// it is a new entry
				currentCartItems[card["WPI Id"]] = quantity;
			} else {
				// we are updating an entry
				change = quantity - parseInt(this.state.currentCartItems[card["WPI Id"]]);
				currentCartItems[card["WPI Id"]] = quantity;
			}
			this.setState({
				currentCartItems: [...currentCartItems]
				});
			this.setState({
				cartTotalCount:this.state.cartTotalCount + change
			});
		}
	}

	//TODO: create filter that stops ppl from typing negatives or "e" or other crap into cart!
	render() {
		const handleToUpdate = this.handleToUpdate
		const isCardAllowed = this.isCardAllowed
		console.log("RENDERING")
		const data = this.state.data.filter(isCardAllowed.bind(this))
		console.log(this.state.markCartItems)
		return (
			<div>
				<Head>
					<title>WPI MTG Club | Catalog</title>
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
					<meta name="description" content="Catalog, where you can view and purchase club cards." />
					<link rel="shortcut icon" href="/images/favicon.ico" />
					<link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
					<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
					
				  </Head>
				<main>
					<MyNavbar/>
					<div className="container">
						<div className="jumbotron">
							<h1>Catalog- Work in Progress! <span><Button onClick={() => this.setState({displayCart: (!this.state.displayCart && this.state.cartTotalCount > 0)})}>{"Cart: " + this.state.cartTotalCount}</Button></span></h1>
						</div>
						<br/>
						<div style={{display: this.state.displayCart ? 'block' : 'none' }}>
							<Cart cart={this.state.currentCartItems}/>
						</div>
						<br/>	
						<Button className="btn btn-primary" onClick={() => this.setState({displaySearchMenu: !this.state.displaySearchMenu})}>Advanced Search/Filter</Button>
						<br/>
						<div style={{display: this.state.displaySearchMenu ? 'block' : 'none' }}>
							<SearchMenu handleToUpdate={handleToUpdate.bind(this)}/>
						</div>
						
						<br/>
						<table>
							<thead>
								<tr>
									<th>Card Name</th>&nbsp;&nbsp;&nbsp;&nbsp;
									<th>Stock</th>&nbsp;&nbsp;&nbsp;&nbsp;
									<th>Set</th>&nbsp;&nbsp;&nbsp;&nbsp;
									<th>Condition</th>&nbsp;&nbsp;&nbsp;&nbsp;
									<th>Foil</th>&nbsp;&nbsp;&nbsp;&nbsp;
									<th>Price</th>&nbsp;&nbsp;&nbsp;&nbsp;
									<th>Quantity to Add</th>&nbsp;&nbsp;&nbsp;&nbsp;
									<th>Add to Cart</th>&nbsp;&nbsp;&nbsp;&nbsp;
								</tr>
							</thead>
							<tbody>
								{data.map((card, i)=> 
								<tr key={i}>
									<td>
										<CardHoverImage cardName={card["Card Name"]} productId={card["Product Id"]}/>
									</td>&nbsp;&nbsp;&nbsp;&nbsp;
									<td>{card["Quantity"]}</td>&nbsp;&nbsp;&nbsp;&nbsp;
									<td>{card["Set"]}</td>&nbsp;&nbsp;&nbsp;&nbsp;
									<td>{card["Condition"]}</td>&nbsp;&nbsp;&nbsp;&nbsp;
									<td>{card["Foil"]}</td>&nbsp;&nbsp;&nbsp;&nbsp;
									<td>{"$" + card["Price"]}</td>&nbsp;&nbsp;&nbsp;&nbsp;
									<td><Select value={this.state.markCartItems[card["WPI Id"]]} options={this.getItems(card["Quantity"])} onChange={(val) => this.iDontCare(val, card["WPI Id"])} /></td>&nbsp;&nbsp;&nbsp;&nbsp;
									<td><a href="javascript:void(0)"><img src="/images/addtocart.png" alt="Add to Cart" className="refreshImg" onClick={() => this.addToCart(card)}></img></a>&nbsp;&nbsp;&nbsp;&nbsp;</td>
								</tr>
								)}
							</tbody>
						</table>
					</div>
				</main>
			</div>
		)
	}
	
}
//<td><a href="javascript:void(0)" onClick={()=>this.refreshPrice(card["SKU"], i, card["Price"])}><img src="/images/refresh_button.png" alt="Refresh" className="refreshImg"></img></a>&nbsp;&nbsp;&nbsp;&nbsp;</td>

//<td><input type="number" min="0" step="1" id={"addToCart" + i} onInput={() => this.updateCart(card, i)}></input></td>