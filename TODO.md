## List of TODOS for the website:

What we are working on:
- try migrating emailJS from frontend to "backend" because it isn't working on the frontend.
- - looks like we need to use NodeMailer, or emailjs (NOT THE SAME AS EMAILJS-COM)
https://stackoverflow.com/questions/4113701/sending-emails-in-node-js

As soon as possible:
- get mongoDB setup for:
- - card catalog
- - next order number
- - past order history

Later features:
- BIG styling update: look for feedback from a few select individuals (I would start with Chris, asking how he recommends we improve styling and then go from there). This is a huge WIP that we can't really start until, IMO, either Spring break, or Summer break.
- Develop an online events calendar that will show casuals, upcoming drafts, and other events like Gaming Weekend
- definitely somewhere to fill out a form for any ideas/suggestions/bugs/whatever
- AUTOMATION via RaspberryPI for daily price updates
- get a domain name (after website is established, aka critical features are done and styling is in a complete stage)
- solve the cheaper better condition problem: basically, if card is MP but there is a cheaper NM/LP option on TCGPlayer, we should use that as our price. The implementation for this is via having sub-SKUs (from card's condition to highest possible condition), but this feature isn't a huge priority.

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
- for foil, can include “Nonfoil” and “Foil” (or have foil symbol, but that can be confusing)

CartJS:
- for the name and email inputs, add a label for them instead of h4 tags! small thing
- for the sent email, i need to add a link to it that users must click to validate that they have receieved the email & are reserving the card. otherwise it wont be reserved for them. this is to ensure that bots arent trolling etc.
- add way to clear cart/remove a single item
- when you send email, do following: (1) clear cart (2) update inventory (3) hide cart again (4) send a popup saying "Order has been confirmed"
- ASAP: add capcha to stop bots from emailing!

CatalogJS:
- finish filters and add more
- add way to sort the cards (alphabetica, cmc, price, any other way ppl come up with)
- fix the setsFilter (BEFORE ADDING NEW FILTERS)
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

-packages:
- remove any unused packages (do this toward the end of the list)

-misc:
- fix api (rename, etc.)
- load the cards via api call rather than within react (a bit cleaner code-wise)
- add way to decide wheter u want card shipped or not. if u say pickup, then we say u pickup during club meeting. if u say ship, u just get it shipped to ur address. for the latter u would also need to pay shipping, which ill just say is $5 for the sake of its impossible to calculate costs (well $5 for tracked or $1 for untracked).
- sort by border (silver border?)
- indicate how we calculate prices on the website
- filter based on price (x or less)

My personal Google Keep has some notes on it as well!