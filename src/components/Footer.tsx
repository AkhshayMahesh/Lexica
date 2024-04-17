import Heart from '/heart.png';
const Footer = () => {
    return (
        <div className=" font-poppins py-2 text-gray bottom-10 z-10 px-16 text-xl rounded-[4rem] fixed bg-darkGreen backdrop-blur-md bg-opacity-30 flex items-center justify-center gap-2 ">
            created with
            <img src={Heart}></img>
            by <span className=' font-semibold'>Akhshay Mahesh AN</span> & <span className=' font-semibold'>N Krishna Keerthana</span>
        </div>
    )
}

export default Footer;