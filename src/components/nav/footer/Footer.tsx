import Link from "next/link";
import socialMedia from "../SocialMedia";

type FooterPropType = {

}



const Footer = (footerProps: FooterPropType) => {
    return (
        <footer className={`border-t-2 border-orange-900 p-4`}>
            <h4 className="text-center font-sans text-orange-800">{`Made with <3 by Logan`}</h4>
            <div className={`flex flex-row items-center justify-center gap-2 h-12`}>
                {
                    Object.entries(socialMedia).map(([social, info]) => (
                        <Link key={social} href={info.link} className="group">
                            <info.icon className="w-auto h-8 fill-orange-900 group-hover:fill-orange-600 group-hover:animate-bounce transition-all" />
                        </Link>
                    ))
                }
            </div>
        </footer>
    )
}

export default Footer;