# update prices
# This script is run automatically daily to get the latest prices.

import os
from dotenv import load_dotenv
import csv
from time import sleep
import requests
import json

load_dotenv()

bearer = "bearer " + str(os.getenv('BEARER'))

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
    sku = csv_data[i][7]
    url = "https://api.tcgplayer.com/pricing/sku/" + sku
    response = requests.request("GET", url, headers=headers)
    formatted_res = json.loads(response.text)
    results = formatted_res['results']
    price = -1
    if float(results[0]['lowPrice']) < 5:
        price = float(results[0]['lowPrice']) # cards under $5 we dont do shipping cause shipping isnt really worked into their price...
    else:
        price = float(results[0]['lowestListingPrice'])
    price *= 0.9
    price = round(price, 2)
    price = str(price)
    if "." not in price:
        price += ".00"
    elif price.index(".") + 2 == len(price):
        price += "0"
    entry = {"WPI Id": csv_data[i][0], "Card Name": csv_data[i][1], "Quantity": csv_data[i][2], "Set": csv_data[i][3], "Condition": csv_data[i][4], "Foil": csv_data[i][5], "Language": csv_data[i][6], "SKU": csv_data[i][7], "Product Id": csv_data[i][8], "Mana Cost": csv_data[i][9], "CMC": csv_data[i][10], "Main Type": csv_data[i][11], "Sub Types": csv_data[i][12], "Is Legendary": csv_data[i][13], "Oracle Text": csv_data[i][14], "Legalities": csv_data[i][15], "Reserved List": csv_data[i][16], "Keywords": csv_data[i][17], "Rarity": csv_data[i][18], "Optionals": csv_data[i][19], "Price": price} 
    new_data.append(entry)
    print("entry ", csv_data[i][1], " added!")
    sleep(0.3)

keys = new_data[0].keys()

with open('spreadsheets/mtg_card_catalog.csv', 'w', newline='') as output_file:
    dict_writer = csv.DictWriter(output_file, keys)
    dict_writer.writeheader()
    dict_writer.writerows(new_data)
