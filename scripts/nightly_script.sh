#!/bin/bash
GIT='git --git-dir='$PWD'/.git'
$GIT status
$GIT pull
python3 scripts/updateprices.py
$GIT add spreadsheets/mtg_card_catalog.csv
$GIT commit -m "nightly price update"
$GIT push
