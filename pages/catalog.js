import MyNavbar from './navbar'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO: add paddingRight to all th and td to make spacing look nice!
// TODO: make a table that can associate deckbox.org card IDs to exact card printings.
// this is so i can get the SPECIFIC version of cards when you hover over them. this is low prio


export default function Catalog() {
	const data = require('dsv-loader!./mtg_card_catalog.csv')
	console.log(data)
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
				<Script src="https://deckbox.org/assets/external/tooltip.js"></Script>
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
							</tr>
						</thead>
						<tbody>
							{data.map((card, i)=>
							<tr key={i}>
								<td><Link href={"https://deckbox.org/mtg/" + card["Card Name"]}>{card["Card Name"]}</Link></td>&nbsp;&nbsp;&nbsp;&nbsp;
								<td>{card["Quantity"]}</td>&nbsp;&nbsp;&nbsp;&nbsp;
								<td>{card["Set"]}</td>&nbsp;&nbsp;&nbsp;&nbsp;
								<td>{card["Condition"]}</td>&nbsp;&nbsp;&nbsp;&nbsp;
								<td>{card["Foil"]}</td>&nbsp;&nbsp;&nbsp;&nbsp;
								<td>{"PLACEHOLDER PRICE"}</td>&nbsp;&nbsp;&nbsp;&nbsp;
							</tr>
							)}
						</tbody>
					</table>
				</div>
			</main>
		</div>
	)
}
