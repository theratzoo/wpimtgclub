# scryfall data to sku table

import csv
import requests
import json

csv_data_skus = []
with open('allcardsskus.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count_2 = -1
    for row in csv_reader:
        line_count_2 += 1
        if line_count_2 > 0:
            csv_data_skus.append(row)

