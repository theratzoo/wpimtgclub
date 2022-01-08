# scryfall data to sku table

# NOTE: there will be 100000000 bugs to go through with set names...
#... so this is not gonna write to SKU table, but instead write to the cards we own table

# we will also check if the cards already have scryfall data and if so, not waste an api call!

import csv
import requests
import json
from time import sleep

results_list = []

headers = {"Accept": "application/json"}

csv_data = []
with open('pages/mtg_card_catalog.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = -1
    for row in csv_reader:
        line_count += 1
        if line_count > 0:
            csv_data.append(row)

def get_main_types(tl):
    types = ["Creature", "Artifact", "Enchantment", "Land", "Planeswalker", "Instant", "Sorcery"]
    contained_types = []
    for i in types:
        if i in tl:
            contained_types.append(i)
    return contained_types

def trim_main_types(tl):
    types = ["Creature", "Artifact", "Enchantment", "Land", "Planeswalker", "Instant", "Sorcery"]
    for i in types:
        tl = tl.replace(i, "")
    return tl

count = 0
for i in range(line_count):
    # in here, we calculate all of the data, then add it in the while loop
    reformatted_name = csv_data[i][1].replace(' ', '+')
    #print(csv_data[i][2])
    url = "https://api.scryfall.com/cards/named?exact=" + reformatted_name + "&set=" + csv_data[i][3]
    response = requests.request("GET", url, headers=headers)
    formatted_res = json.loads(response.text)
    if formatted_res['object'] == 'error' and csv_data[i][3] == 'TSP':
        url = "https://api.scryfall.com/cards/named?exact=" + reformatted_name + "&set=" + "TSB"
        response = requests.request("GET", url, headers=headers)
        formatted_res = json.loads(response.text)

    mana_cost = formatted_res['mana_cost'] # GOOD
    cmc = formatted_res['cmc'] # GOOD
    main_type = get_main_types(formatted_res['type_line'])
    sub_types = trim_main_types(formatted_res['type_line'])
    is_legendary = 'Legendary' in formatted_res['type_line']
    oracle_text = formatted_res['oracle_text']
    legalities = formatted_res['legalities']
    reserved_list = formatted_res['reserved']
    keywords = formatted_res['keywords'] #for creatures i think?
    rarity = formatted_res['rarity']

    optionals = {} # TODO: add more optionals (equip cost? )
    if "Creature" and "Planeswalker" in main_type:
        optionals = {"power": formatted_res["power"], "toughness": formatted_res["toughness"], "loyalty": formatted_res["loyalty"]}
    if "Creature" in main_type:
        optionals = {"power": formatted_res["power"], "toughness": formatted_res["toughness"]}
        pass
    if "Planeswalker" in main_type:
        optionals = {"loyalty": formatted_res["loyalty"]}
        pass
    
    item = {"WPI Id": csv_data[i][0], "Card Name": csv_data[i][1], "Quantity": csv_data[i][2], "Set": csv_data[i][3], "Condition": csv_data[i][4], "Foil": csv_data[i][5], "Language": csv_data[i][6], "SKU": csv_data[i][7], "Product Id": csv_data[i][8], "Price": csv_data[i][9], "Mana Cost": mana_cost, "CMC": cmc, "Main Type": main_type, "Sub Types": sub_types, "Is Legendary": is_legendary, "Oracle Text": oracle_text, "Legalities": legalities, "Reserved List": reserved_list, "Keywords": keywords, "Rarity": rarity, "Optionals": optionals} 
    results_list.append(item)

    # ...
    sleep(0.1) #600 requests per minute
    
    
keys = results_list[0].keys()

with open('pages/mtg_card_catalog.csv', 'w', newline='') as output_file:
    dict_writer = csv.DictWriter(output_file, keys)
    dict_writer.writeheader()
    dict_writer.writerows(results_list)
