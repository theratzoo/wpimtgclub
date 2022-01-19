#!/bin/bash

python3 scripts/updateprices.py
git add spreadsheets/mtg_card_catalog.csv
git commit -m "nightly price update"
git push
