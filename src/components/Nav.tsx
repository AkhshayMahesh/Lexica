import { useState } from "react";
import Logo from "/logo.png"
import { Link } from "react-router-dom";

type l = {
    name: string
    url: string
};

const NavBar = () => {
    const [links] = useState<l[]>([
        { name: "Tries", url: "/" },
        { name: "Spell-Check", url: "/" },
        { name: "Autofill", url: "/" },
        { name: "Try Now!", url: "/try" },
    ])

    return (
        <div className=" z-10 w-[80vw] h-[6vh] px-5 py-1 rounded-[4rem] flex justify-between mt-10 fixed backdrop-blur-md bg-opacity-30">
            <div className=" flex items-center">
                <img src={Logo} className=" h-16"></img>
                <div className=" font-poppins text-[#000] font-bold text-4xl h-max ml-[-18px] relative">exica</div>
            </div>

            <div className=" flex w-[40%] justify-between text-[1.35rem] text-[#000]  items-center">
                {links.map((link) => {
                    if(link.name != "Try Now!"){
                        return (
                            <Link to={link.url} key={link.name}>
                                {link.name}
                            </Link>
                        )}
                    else {
                        return (
                            <Link to={link.url} key={link.name} className=" bg-darkGreen px-7 py-2 rounded-3xl text-[#fff]">
                                {link.name}
                            </Link>
                        )
                    }
                })
                }
            </div>
        </div>
    )
}

export default NavBar;