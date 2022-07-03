# update prices
# This script is run automatically daily to get the latest prices.

import os
from dotenv import load_dotenv
import csv
from time import sleep
import requests
import json
from types import SimpleNamespace

load_dotenv()

# For new generation of api keys
secret = None
with open('.apikey') as apikey_file:
    for line in apikey_file:
        if "access_token" in line:
            x = json.loads(line, object_hook=lambda d: SimpleNamespace(**d))
            secret = x.access_token
            apikey_file.close()
            break

# OLD METHOD: str(os.getenv('BEARER'))
bearer = "bearer " + secret

headers = {"Accept": "application/json", "Authorization": bearer}

new_data = []

csv_data = []
with open('spreadsheets/mtg_card_catalog.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = -1
    for row in csv_reader:
        line_count += 1
        if line_count > 0:
            csv_data.append(row)


for i in range(line_count):
    minPrice = -1
    for x in eval(csv_data[i][20]):
        sku = x
        url = "https://api.tcgplayer.com/pricing/sku/" + sku
        response = requests.request("GET", url, headers=headers)
        formatted_res = json.loads(response.text)
        results = formatted_res['results']
        price = -1
        csv_price = results[0]['lowPrice']
        csv_price_listing = results[0]['lowestListingPrice']
        if csv_price == None or csv_price_listing == None:
            csv_price = float(csv_data[i][21])
            csv_price_listing = float(csv_data[i][21])
        else:
            csv_price = float(csv_price)
            csv_price_listing = float(csv_price_listing)
        if csv_price < 5:
            price = csv_price # cards under $5 we dont do shipping cause shipping isnt really worked into their price...
        else:
            price = csv_price_listing
        if minPrice == -1 or minPrice > price:
            minPrice = price
        sleep(0.3)
    
    minPrice *= 0.9
    minPrice = round(minPrice, 2)
    minPrice = str(minPrice)
    if "." not in minPrice:
        price += ".00"
    elif minPrice.index(".") + 2 == len(minPrice):
        minPrice += "0"
    entry = {"WPI Id": i, "Card Name": csv_data[i][1], "Quantity": csv_data[i][2], "Set": csv_data[i][3], "Condition": csv_data[i][4], "Foil": csv_data[i][5], "Language": csv_data[i][6], "SKU": csv_data[i][7], "Product Id": csv_data[i][8], "Mana Cost": csv_data[i][9], "CMC": csv_data[i][10], "Main Type": csv_data[i][11], "Sub Types": csv_data[i][12], "Is Legendary": csv_data[i][13], "Oracle Text": csv_data[i][14], "Legalities": csv_data[i][15], "Reserved List": csv_data[i][16], "Keywords": csv_data[i][17], "Rarity": csv_data[i][18], "Optionals": csv_data[i][19], "List of SKUs": csv_data[i][20], "Price": minPrice} 
    new_data.append(entry)
    print("entry ", csv_data[i][1], " added!")

keys = new_data[0].keys()

with open('spreadsheets/mtg_card_catalog.csv', 'w', newline='') as output_file:
    dict_writer = csv.DictWriter(output_file, keys)
    dict_writer.writeheader()
    dict_writer.writerows(new_data)
