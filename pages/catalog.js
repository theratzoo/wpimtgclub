import MyNavbar from './navbar'
import Head from 'next/head'
import CardHoverImage from './cardhoverimage.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import SearchMenu from './searchmenu.js'
import Button from 'react-bootstrap/Button'
import Select from "react-select";
import Cart from './cart.js'
import fixPrice from './functions/fixprice.js'
import fixCondition from './functions/fixcondition.js'
import Footer from './footer'

let data = require('dsv-loader!../spreadsheets/mtg_card_catalog.csv')
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
			markCartItems:markCartItems,
			currentCartItems:currentCartItems,
			displayCart:false,
			pageNumber:1,
			maxPages:0,
			isNextDisabled:false,
			isPrevDisabled:true,
		}
		const handleToUpdate = this.handleToUpdate.bind(this);
	}

	

	handleToUpdate(nameFilter, oracleTextFilter, cmcTypeFilter, cmcFilter, typesFilter, colorsFilter, formatLegalitiesFilter, setsFilter, rarityFilter) {
		let maxPages = this.getMaxPages({nameFilter, oracleTextFilter, cmcTypeFilter, cmcFilter, typesFilter, colorsFilter, formatLegalitiesFilter, setsFilter, rarityFilter})
		this.setState({
			filters:{nameFilter, oracleTextFilter, cmcTypeFilter, cmcFilter, typesFilter, colorsFilter, formatLegalitiesFilter, setsFilter, rarityFilter},
			displaySearchMenu: false,  // hide menu,
			pageNumber:1,
			isPrevDisabled: true,
			isNextDisabled: maxPages <= 1
		});
	}

	getMaxPages(filters) {
		const data = this.state.data
		let count = 0
		for (let i=0; i<data.length; i++) {
			if (this.isCardAllowedHelper(data[i], filters)) {
				count ++;
			}
		}
		return Math.floor(count/20) + 1
	}

	isCardAllowedHelper(card, filters) {
		let cmcFilterType = "Equal To";
		for (const [key, value] of Object.entries(filters)) {
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
					let foundIt1 = true;
					for(const x in value) {
						if(card['Mana Cost'].includes(value[x]['label'][0])) {
							foundIt1 = true;
							break;
						} else {
							foundIt1 = false;
						}
					}
					if(!foundIt1) return false;
					break;
				case "formatLegalitiesFilter":
					let foundIt2 = true;
					for(const x in value) {
						const json = card['Legalities'].replaceAll("'", "\"");
						if(JSON.parse(json)[value[x]['label'].toLowerCase()] == 'legal') {
							foundIt2 = true;
							break;
						} else {
							foundIt2 = false;
						}
					}
					if(!foundIt2) return false;
					break;
				case "setsFilter": // TODO: code this!
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

	isCardAllowed(card) {
		return this.isCardAllowedHelper(card, this.state.filters)
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
			// TODO: can fix this bug by adding default value to the Select, which is zero. [idk what this means, test it first]
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

	nextPg(max) {
		const newPgNumber = this.state.pageNumber + 1;
		this.setState({
			pageNumber: newPgNumber,
			isNextDisabled: newPgNumber>=max,
			isPrevDisabled: newPgNumber<2
		})
		
	}

	prevPg(max) {
		const newPgNumber = this.state.pageNumber - 1;
		this.setState({
			pageNumber: newPgNumber,
			isNextDisabled: newPgNumber>=max,
			isPrevDisabled: newPgNumber<2
		})
	}

	render() {
		const handleToUpdate = this.handleToUpdate
		const isCardAllowed = this.isCardAllowed
		//console.log("RENDERING")
		const data = this.state.data.filter(isCardAllowed.bind(this))
		//console.log(this.state.markCartItems)
		const displayData = [];
		for(let i=20*(this.state.pageNumber-1); i<20*this.state.pageNumber && i<data.length; i++) {
			displayData.push(data[i]);
		}
		const maxPages = Math.floor(data.length/20) + 1;
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
						<br/>
							<h1>Catalog</h1>
						<br/>
						<p>To order a card, message one of the officers on Discord. In addition, we are able to ship, you will just have to pay for the shipping (about 78 cents w/o tracking and $5 with tracking).</p>
						<div style={{display: this.state.displayCart ? 'block' : 'none' }}>
							<Cart cart={this.state.currentCartItems}/>
						</div>
						<br/>	
						<Button className="btn btn-danger" onClick={() => this.setState({displaySearchMenu: !this.state.displaySearchMenu})}>Advanced Search/Filter</Button>
						<br/>
						<div style={{display: this.state.displaySearchMenu ? 'block' : 'none' }}>
							<SearchMenu handleToUpdate={handleToUpdate.bind(this)}/>
						</div>
						
						<br/>
						<table>
							<thead>
								<tr>
									<th className="cardInfo">Card Name</th>
									<th className="cardInfo">Stock</th>
									<th className="cardInfo">Set</th>
									<th className="cardInfo">Condition</th>
									<th className="cardInfo">Foil</th>
									<th className="cardInfo">Price</th>
								</tr>
							</thead>
							<tbody>
								{displayData.map((card, i)=> 
								<tr key={i}>
									<td className="cardInfo">
										<CardHoverImage cardName={card["Card Name"]} productId={card["Product Id"]}/>
									</td>
									<td className="cardInfo">{card["Quantity"]}</td>
									<td className="cardInfo">{card["Set"]}</td>
									<td className="cardInfo">{fixCondition(card["Condition"])}</td>
									<td className="cardInfo">{card["Foil"]}</td>
									<td className="cardInfo">{"$" + fixPrice(card["Price"])}</td>
									
								</tr>
								)}
							</tbody>
						</table>
						<br/>
						<Button className="btn btn-dark" onClick={() => this.prevPg(maxPages)}  disabled={this.state.isPrevDisabled}>Prev</Button><Button className="btn btn-dark" onClick={() => this.nextPg(maxPages)} disabled={this.state.isNextDisabled}>Next</Button>
						<h5>{"Page " + this.state.pageNumber + " of " + maxPages}</h5>
						<br/>
						<br/>
					</div>
				</main>

				<Footer></Footer>
			</div>
		)
	}
}

//<span><Button className="btn btn-primary" onClick={() => this.setState({displayCart: (!this.state.displayCart && this.state.cartTotalCount > 0)})}>{"Cart: " + this.state.cartTotalCount}</Button></span>

//<td className="cardInfo"><Select value={this.state.markCartItems[card["WPI Id"]]} options={this.getItems(card["Quantity"])} onChange={(val) => this.iDontCare(val, card["WPI Id"])} /></td>
//<td className="cardInfo"><a href="javascript:void(0)"><img src="/images/addtocart.png" alt="Add to Cart" className="cartImg" onClick={() => this.addToCart(card)}></img></a></td>

//<th className="cardInfo">Quantity to Add</th>
//<th className="cardInfo">Add to Cart</th>