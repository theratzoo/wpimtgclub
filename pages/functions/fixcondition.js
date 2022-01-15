export default function fixCondition(con) {
    switch(con) {
        case "NM":
            return "Near Mint"
        case "SP":
            return "Slightly Played"
        case "MP":
            return "Moderately Played"
        case "HP":
            return "Heavily Played"
        case "DM":
            return "Damaged"
        default:
            console.log("ERROR- condition code not found!")
            return "Unknown"
    }
}