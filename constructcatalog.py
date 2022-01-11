#constructcatalog.py

from setcodetosetnamedict import code_to_name_dict
import csv
import requests
import json
from time import sleep

results_list = []

headers = {"Accept": "application/json"}
skus_found = 0 # for debugging purposes...
csv_data = []
with open('pages/mtg_card_catalog.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = -1
    for row in csv_reader:
        line_count += 1
        if line_count > 0:
            csv_data.append(row)

csv_data_skus = []
with open('allcardsskus_LOCAL.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count_2 = -1
    for row in csv_reader:
        line_count_2 += 1
        if line_count_2 > 0:
            csv_data_skus.append(row)

def set_code_to_set_name(s):
    return code_to_name_dict[s]

def condition_to_num(s):
    conditions = ['NM', 'SP', 'MP', 'HP', 'DM']
    return conditions.index(s)+1

def foil_to_num(s):
    versions = ['n', 'y']
    return versions.index(s) + 1

def lang_to_num(s):
    langs = ['EN', 'CS', 'CT', 'FR', 'DE', 'IT', 'JP', 'KR', 'PT', 'RU', 'SP']
    return langs.index(s) + 1

def calculateSKU(card_name, set_name, condition_number, foil_number, language_number):
    print("info: ", card_name, set_name, condition_number, foil_number, language_number)
    exception = "NULL"
    if set_name == "time-spiral":
        exception = "timeshifted"
    global skus_found
    for i in range(line_count_2):
        if csv_data_skus[i][1] == card_name and (csv_data_skus[i][2] == set_name or csv_data_skus[i][2] == exception) and csv_data_skus[i][4] == str(language_number) and csv_data_skus[i][5] == str(foil_number) and csv_data_skus[i][6] == str(condition_number):
            skus_found+=1
            return csv_data_skus[i][0], csv_data_skus[i][3]
    print("FATAL ERROR: SKU NOT FOUND", skus_found) 

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
    if len(csv_data[i]) >= 20: # current length of a row excluding price
        print("no need to update!")
        item = {"WPI Id": count, "Card Name": csv_data[i][1], "Quantity": csv_data[i][2], "Set": csv_data[i][3], "Condition": csv_data[i][4], "Foil": csv_data[i][5], "Language": csv_data[i][6], "SKU": csv_data[i][7], "Product Id": csv_data[i][8], "Mana Cost": csv_data[i][9], "CMC": csv_data[i][10], "Main Type": csv_data[i][11], "Sub Types": csv_data[i][12], "Is Legendary": csv_data[i][13], "Oracle Text": csv_data[i][14], "Legalities": csv_data[i][15], "Reserved List": csv_data[i][16], "Keywords": csv_data[i][17], "Rarity": csv_data[i][18], "Optionals": csv_data[i][19], "Price": csv_data[i][20]} 
        results_list.append(item)
        count += 1
        continue
    card_name = csv_data[i][0]
    if card_name == "":
        break # means there is an empty entry!
    set_name = set_code_to_set_name(csv_data[i][2])
    condition_number = condition_to_num(csv_data[i][3])
    foil_number = foil_to_num(csv_data[i][4])
    language_number = lang_to_num(csv_data[i][5])
    sku = ""
    productId = ""
    
    sku, productId = calculateSKU(card_name, set_name, condition_number, foil_number, language_number)

    # Scryfall stuff:
    reformatted_name = card_name.replace(' ', '+')
    url = "https://api.scryfall.com/cards/named?exact=" + reformatted_name + "&set=" + csv_data[i][2]
    response = requests.request("GET", url, headers=headers)
    formatted_res = json.loads(response.text)
    if formatted_res['object'] == 'error' and csv_data[i][2] == 'TSP': #for the edge-case of timeshifted cards...
        url = "https://api.scryfall.com/cards/named?exact=" + reformatted_name + "&set=" + "TSB"
        response = requests.request("GET", url, headers=headers)
        formatted_res = json.loads(response.text)
    #if 'card_faces' in formatted_res: TODO: for now we are ignoring these cards because they are too hard to deal w/ and i wanna focus on getting stuff done...

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
    
    item = {"WPI Id": count, "Card Name": csv_data[i][0], "Quantity": csv_data[i][1], "Set": csv_data[i][2], "Condition": csv_data[i][3], "Foil": csv_data[i][4], "Language": csv_data[i][5], "SKU": sku, "Product Id": productId, "Mana Cost": mana_cost, "CMC": cmc, "Main Type": main_type, "Sub Types": sub_types, "Is Legendary": is_legendary, "Oracle Text": oracle_text, "Legalities": legalities, "Reserved List": reserved_list, "Keywords": keywords, "Rarity": rarity, "Optionals": optionals, "Price": 0} 
    results_list.append(item)
    count += 1

    sleep(0.1) #600 requests per minute
    

keys = results_list[0].keys()

with open('pages/mtg_card_catalog_TMP.csv', 'w', newline='') as output_file:
    dict_writer = csv.DictWriter(output_file, keys)
    dict_writer.writeheader()
    dict_writer.writerows(results_list)