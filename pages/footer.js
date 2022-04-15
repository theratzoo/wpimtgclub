import Link from 'next/link'

export default function MyFooter() {
    return (
        <footer className="customFooter">
            <hr/>
            <Link href="/about#socials">Contact Information</Link><br/>
            <p>WPI MTG Club is unofficial Fan Content permitted under the Fan Content Policy. Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.</p>
            <p>This product uses TCGplayer data but is not endorsed or certified by TCGplayer</p>
        </footer>
        
    )
}