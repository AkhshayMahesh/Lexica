import SS from "/ss.png"

const Landing = () => {
    return (
        <div className=" w-full flex flex-col items-center">
            <div className=" mt-[18%]">
                <div className=" text-gray text-[9vh] font-poppins font-bold">THE POWER OF <span className=" text-darkGreen tracking-wide"> TRIES</span></div>
                <div className=" mt-[-50px] text-lightGray scale-y-[-1] text-[9vh] font-poppins font-bold "><span className=" opacity-60">THE POWER OF </span> ADSA</div>
            </div>

            <div className=" mt-[10%] flex justify-center ">
                <img src={SS} className=" w-2/5 rounded-2xl drop-shadow-2xl shadow-[#000]"></img>
            </div>

            <div className=" mt-[10%] text-gray font-poppins text-xl w-[30vw] text-justify">
                Lorem ipsum dolor sit amet consectetur. Molestie etiam sit lacus elit. Accumsan ac turpis dolor risus diam suspendisse. Mi lobortis ornare nulla est phasellus pulvinar. Donec pulvinar velit habitant amet diam volutpat diam. Lacus pharetra lacus non.
            </div>

            <div className=" h-[30vh]"></div>
        </div>
    )
}

export default Landing;