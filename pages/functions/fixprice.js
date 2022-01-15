export default function fixPrice(pr) {
    let new_pr = "" + pr;
    if(new_pr.indexOf(".") == -1) { //xxx
        new_pr = new_pr + ".00";
        return new_pr;
    }
    else if(new_pr.indexOf(".") + 3 == new_pr.length) { //xxx.13
        return new_pr;
    } else { //xxx.1
        new_pr = new_pr + "0";
        return new_pr;
    }
}