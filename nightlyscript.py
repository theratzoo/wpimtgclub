# nightlyscript.py
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
        #TODO: clean up this for loop, it can look nicer
        # also make sure to document it to explain what is going on
        item_url = x['url']
        illegals = '()\',\".?!:;[]/’'
        end = x['name'].replace(' (*/*)', '')
        if '  ' in end: #double space bug
            end = end.replace('  ', ' ')
        if '( 9' in end:
            end = end.replace('( 9', '(9') #llanowar elf 9th ED spacing bug
        if '+' in end:
            end = end.replace('+', 'plus') #basically like &, can add to normal regex...
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
        #TODO: for above, create a regular expression
        
        result_item = {"name": x['name'], "set": item_url[item_url.index('magic')+6:item_url.index(end)-1], "productId": x['productId']}
        #print(result_item)
        results_list.append(result_item)
        
        # add following data to a list:
        # id
        # setname

    #print(results)  
    totalNumber += 100
    print(totalNumber, '/', totalItems)
    sleep(0.3) # so the goal is to realize that we will give us 1.5x the time that they say we have just in case
    # but we only do one request per for loop, so sleep will be maximum requests per minute / 1.5. then * 60 for converting to seconds...

keys = results_list[0].keys()

with open('allcards0_LOCAL.csv', 'w', newline='') as output_file:
    dict_writer = csv.DictWriter(output_file, keys)
    dict_writer.writeheader()
    dict_writer.writerows(results_list)

# TODO: make a set conversion dictionary/table thing that converts the set names found in TCGPlayer links to a 3 letter setcode. We do this because thats the only way we get set names of cards :(
# TODO: so IMO the ONLY thing we need to update daily is prices. so stuff like getting ids and skus is something that can happen once a month or something like that. then after that we can do the once a day thing be translating every SKU into a price (note: there is a thing that lets u do multiple SKUs at once, List SKU Market Prices, so we just do that!)

#TODO: rename this (and other scripts) and move scripts to folders and just make em more organized. AND DOCUMENT THEM AND THE WORKFLOW