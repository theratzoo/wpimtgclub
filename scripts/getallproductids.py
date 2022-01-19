# get all product ids
# Run this script whenever we need to update card list (add cards in 2022 or later to the spreadsheet)

import requests
import json
import os
from dotenv import load_dotenv
from time import sleep
import csv

load_dotenv()

bearer = "bearer " + str(os.getenv('BEARER'))

url = "https://api.tcgplayer.com/catalog/products?categoryId=1&productType=Cards&limit=100&getExtendedFields=false&offset=0"

headers = {"Accept": "application/json", "Authorization": bearer}

response = requests.request("GET", url, headers=headers)

formatted_res = json.loads(response.text)

totalItems = formatted_res['totalItems']

print(totalItems)
results_list = []
totalNumber = 0
for i in range(0,totalItems, 100):
    url = url[0:url.index("offset=")+7]
    url += str(i)
    response = requests.request("GET", url, headers=headers)
    formatted_res = json.loads(response.text)
    results = formatted_res['results']
    for x in results:
        item_url = x['url']
        illegals = '()\',\".?!:;[]/’'
        end = x['name'].replace(' (*/*)', '')
        if '  ' in end: #double space bug
            end = end.replace('  ', ' ')
        if '( 9' in end:
            end = end.replace('( 9', '(9') #llanowar elf 9th ED spacing bug
        if '+' in end:
            end = end.replace('+', 'plus') #basically like &, can add to normal regex (need to test first though)
        if ')-' in end:
            end = end.replace(')-', ')')
        if end[-1] == '-':
            end = end[0:len(end)-1]
        if ' . . .' in end:
            end = end.replace(' . . .', '')
        if ' - ' in x['name']: #for: 'Forest - Unglued' and others
            end = end.replace(' - ', '-')
        if '//' in x['name']:
            end = end.replace(' // ', '-')
        if '/' in end and 'w/' not in end:
            end = end.replace('/', '-')
        end = end.replace(' ', '-').translate(str.maketrans('', '', illegals)).lower().replace('í', 'i').replace('&', 'and')
        
        result_item = {"name": x['name'], "set": item_url[item_url.index('magic')+6:item_url.index(end)-1], "productId": x['productId']}
        results_list.append(result_item)

    totalNumber += 100
    print(totalNumber, '/', totalItems)
    sleep(0.3) # for TCGPlayer API limit

keys = results_list[0].keys()

with open('spreadsheets/allcards0_LOCAL.csv', 'w', newline='') as output_file:
    dict_writer = csv.DictWriter(output_file, keys)
    dict_writer.writeheader()
    dict_writer.writerows(results_list)
