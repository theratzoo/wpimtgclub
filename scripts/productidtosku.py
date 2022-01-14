# productId to SKU
# Run this script whenever we need to update card list (add cards in 2022 or later to the spreadsheet)

import os
from dotenv import load_dotenv
import csv
from time import sleep
import requests
import json

load_dotenv()

bearer = "bearer " + str(os.getenv('BEARER'))

headers = {"Accept": "application/json", "Authorization": bearer}

results_list = []

csv_data = []
with open('../spreadsheets/allcards0_LOCAL.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = -1
    for row in csv_reader:
        line_count += 1
        if line_count > 0:
            csv_data.append(row)
        
for i in range(line_count):
    productId = csv_data[i][2]
    url = "https://api.tcgplayer.com/catalog/products/" + productId + "/skus"
    response = requests.request("GET", url, headers=headers)
    formatted_res = json.loads(response.text)
    results = formatted_res['results']
    for x in results:
        result_item = {"skuId": x['skuId'] ,"name": csv_data[i][0], "set": csv_data[i][1], "productId": x['productId'], "languageId": x['languageId'], "printingId": x['printingId'], "conditionId": x['conditionId']}
        results_list.append(result_item)

    print(i+1, "/", line_count, " remaining...")
    eta = (line_count - i - 1) * 0.3
    
    if eta > 60:
        if eta > 3600:
            eta /= 3600
            print("ETA: ", eta, "hours")
        else:
            eta /= 60
            print("ETA: ", eta, "minutes")
    else:
        print("ETA: ", eta, "seconds")
    sleep(0.3)

keys = results_list[0].keys()

with open('../spreadsheets/allcardsskus_LOCAL.csv', 'w', newline='') as output_file:
    dict_writer = csv.DictWriter(output_file, keys)
    dict_writer.writeheader()
    dict_writer.writerows(results_list)