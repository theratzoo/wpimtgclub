import MyNavbar from './navbar'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO: add paddingRight to all th and td to make spacing look nice!
// TODO: figure out how to programatically load in data from .csv/.json
// file every time. this is a task i wanna figure out ASAP!



export default function Catalog() {

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
						<tr>
							<th>Card Name</th>&nbsp;&nbsp;&nbsp;&nbsp;
							<th>Quantity</th>&nbsp;&nbsp;&nbsp;&nbsp;
							<th>Set</th>&nbsp;&nbsp;&nbsp;&nbsp;
							<th>Condition</th>&nbsp;&nbsp;&nbsp;&nbsp;
							<th>Foil</th>&nbsp;&nbsp;&nbsp;&nbsp;
							<th>Price</th>&nbsp;&nbsp;&nbsp;&nbsp;
						</tr>
						<tr>
							<td>Angelic Chorus</td>&nbsp;&nbsp;&nbsp;&nbsp;
							<td>1</td>&nbsp;&nbsp;&nbsp;&nbsp;
							<td>USG</td>&nbsp;&nbsp;&nbsp;&nbsp;
							<td>MP</td>&nbsp;&nbsp;&nbsp;&nbsp;
							<td>No</td>&nbsp;&nbsp;&nbsp;&nbsp;
							<td>$1.29</td>&nbsp;&nbsp;&nbsp;&nbsp;
						</tr>
					</table>
				</div>
			</main>
		</div>
	)
}
