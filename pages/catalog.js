import MyNavbar from './navbar'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import CardHoverImage from './cardhoverimage.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'

// TODO: add paddingRight to all th and td to make spacing look nice!
// TODO: finish up with the card images being tcgplayer ones. so we can rid of this crap!



let data = require('dsv-loader!./mtg_card_catalog.csv')
export default class Catalog extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data:data,
		}
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
	
	render() {
		console.log("RENDERING")
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
							<h1>Catalog</h1>
						</div>
						<br/>
						<h2>Note: this is currently a big WIP, with features being developed as we speak!</h2>
						<br/>
						<table>
							<thead>
								<tr>
									<th>Card Name</th>&nbsp;&nbsp;&nbsp;&nbsp;
									<th>Quantity</th>&nbsp;&nbsp;&nbsp;&nbsp;
									<th>Set</th>&nbsp;&nbsp;&nbsp;&nbsp;
									<th>Condition</th>&nbsp;&nbsp;&nbsp;&nbsp;
									<th>Foil</th>&nbsp;&nbsp;&nbsp;&nbsp;
									<th>Price</th>&nbsp;&nbsp;&nbsp;&nbsp;
									<th>Refresh</th>&nbsp;&nbsp;&nbsp;&nbsp;
								</tr>
							</thead>
							<tbody>
								{this.state.data.map((card, i)=>
								<tr key={i}>
									<td>
										<CardHoverImage cardName={card["Card Name"]} productId={card["Product Id"]}/>
									</td>&nbsp;&nbsp;&nbsp;&nbsp;
									<td>{card["Quantity"]}</td>&nbsp;&nbsp;&nbsp;&nbsp;
									<td>{card["Set"]}</td>&nbsp;&nbsp;&nbsp;&nbsp;
									<td>{card["Condition"]}</td>&nbsp;&nbsp;&nbsp;&nbsp;
									<td>{card["Foil"]}</td>&nbsp;&nbsp;&nbsp;&nbsp;
									<td>{"$" + card["Price"]}</td>&nbsp;&nbsp;&nbsp;&nbsp;
									<td><a href="javascript:void(0)" onClick={()=>this.refreshPrice(card["SKU"], i, card["Price"])}><img src="/images/refresh_button.png" alt="Refresh" className="refreshImg"></img></a>&nbsp;&nbsp;&nbsp;&nbsp;</td>
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
