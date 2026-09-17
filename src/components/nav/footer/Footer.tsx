import Link from "next/link";
import socialMedia from "../SocialMedia";

type FooterPropType = {};

const Footer = (footerProps: FooterPropType) => {
    return (
        <footer className={`border-t border-orange-500/40 p-4`}>
            <h4 className="text-center font-mono uppercase tracking-[0.2em] text-xs md:text-sm text-orange-300">{`Made with <3 by Logan`}</h4>
            <div
                className={`flex flex-row items-center justify-center gap-2 h-12`}
            >
                {Object.entries(socialMedia).map(([social, info]) => (
                    <Link key={social} href={info.link} className="group">
                        <info.icon className="w-auto h-8 fill-orange-400/70 group-hover:fill-amber-400 group-hover:animate-bounce transition-all" />
                    </Link>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
