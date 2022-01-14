## List of TODOS for the website:

- Develop an online events calendar that will show casuals, upcoming drafts, and other events like Gaming Weekend
- definitely somewhere to fill out a form for any ideas/suggestions/bugs/whatever
- AUTOMATION via RaspberryPI for daily price updates
- get a domain name (after website is established, aka critical features are done and styling is in a complete stage)

All Scripts:
- add documentation
- clean up code to reduce clutter and increase readability/scalability
- add print statements that give info but reduce clutter (stuff like progress / specific cards that are being parsed or whatever)
- add a document either in root or scripts/ that details the workflow 

Specific Scripts:
- ProductID to SKU: add a percent complete to the progress bar
- GetAllProductIds: use regex to simplify code
- ConstructCatalog: make it so everything is lowercase when added via scryfall script…  (idk how necessary this is tbh)

All JS: 
- add documentation!
- make sure all imports, variables, and functions are all used 
- clean code up to make variable names better, stuff more readable/efficient, etc.
- styling! we can talk and figure that out w/ help of other ppl

CartJS/CatalogJS:
- add paddingRight to all th and td to make spacing look nice (as opposed to my current ugly method of using manual spacing)
- since i use fixPrice function in multiple files, we can move it to its own and import it...
- change condition to full names, or have a key that explains what they stand for. Can also format it based on user's device (smaller screen = MP, larger = Moderately Played)
- for foil, can include “Nonfoil” and “Foil” (or have foil symbol, but that can be confusing)

CartJS:
- add email address via this function
- for name and email address, do not let them send the stuff w/o a valid email address and a blank name... (disable button and/or warning works)
- (for email, we state we just use email address for confirmation and that is all...)
- for the name and email inputs, add a label for them instead of h4 tags! small thing

CatalogJS:
- finish filters and add more
- add way to sort the cards (alphabetica, cmc, price, any other way ppl come up with)
- fix the setsFilter (BEFORE ADDING NEW FILTERS)
- remove refresh stuff since we are not doing that.
- for next and previous page, if you cannot go further, you grey out the button (disable it) until you can more forward.

Home Page:
- get pictures of us to throw on it

SearchMenuJS:
- move these consts to a different file to import, for code hygen purposes...
- add formats based off of scryfall's formats to that format list
- finish the sets array asap
- figure out what to do w/ exact mana cost (how to calculate/format something like "2 W U")

-CalendarJS:
- make it a nice calendar using a template? React/NextJS template??

My personal Google Keep has some notes on it as well!