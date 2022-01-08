# web table to sku table



# What this script does:

# step 1: reads the csv file for the table of cards that is displayed on the website (the one on the drive basically)

# step 2: for loops each entry, and converts it to the format in the sku table*

# step 3: looks up what the sku number should be for it. uses that entry and puts it into a list*

#*= if the entry has its sku number, instead of converting we just lookup the skunumber and use that lol. since sku number is in order might b able to just use a faster searching algorithm...

# step 3.5: also add sku number and product id to a second list. this second list will represent me overriding our old csv of web table to include sku and product id (which are hidden to user but we include, so that we dont have to recalculate them every time this script is run)

# step 4: construct that list into a third csv. this csv will be used in backend for tcgplayer. [NOTE: do we need this table??? idts i think we can just work off of the other one...]

# step 4.5: override table

import csv
from setcodetosetnamedict import code_to_name_dict

skus_found = 0

new_data = []

csv_data = []
with open('pages/mtg_card_catalog.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = -1
    for row in csv_reader:
        line_count += 1
        if line_count > 0:
            csv_data.append(row)

csv_data_skus = []
with open('allcardsskus.csv') as csv_file:
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

for i in range(line_count):
    card_name = csv_data[i][0]
    set_name = set_code_to_set_name(csv_data[i][2])
    condition_number = condition_to_num(csv_data[i][3])
    foil_number = foil_to_num(csv_data[i][4])
    language_number = lang_to_num(csv_data[i][5])
    sku = ""
    productId = ""
    if csv_data[i][6] == '': #no SKU
        sku, productId = calculateSKU(card_name, set_name, condition_number, foil_number, language_number)
    else:
        sku = csv_data[i][6]
        productId = csv_data[i][7]
    entry = {"WPI Id": i, "Card Name": csv_data[i][0], "Quantity": csv_data[i][1], "Set": csv_data[i][2], "Condition": csv_data[i][3], "Foil": csv_data[i][4], "Language": csv_data[i][5], "SKU": sku, "Product Id": productId}
    new_data.append(entry)

keys = new_data[0].keys()

with open('pages/mtg_card_catalog.csv', 'w', newline='') as output_file:
    dict_writer = csv.DictWriter(output_file, keys)
    dict_writer.writeheader()
    dict_writer.writerows(new_data)


#TODO: add timing code to see how long this code takes!
#TODO: can multithread this?? [might need to randomize things for the sake of appending new stuff to end lol]