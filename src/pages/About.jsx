import {useTranslation} from "react-i18next";

export default function AboutUs() {
    const [t] = useTranslation('common');
    const aboutPic = "/images/login.cc0578413db10119a7ff.png";
    return (
        <div className="scroll-auto">
            <div className="bg-green-100 bg-cover bg-center items-center justify-center flex"
                 style={{minHeight: "70%"}}
            >
                <div
                    className="content-container border-2 text-black shadow rounded-2xl px-12 py-14 bg-white max-w-6xl w-10/12">
                    <h4 className=' font-bold text-5xl mb-10 text-left'>{t("aboutUs")}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="text-left">
                            <strong>Text</strong>
                            <p className="text-gray-600 mb-6">
                                {t("aboutUsText")}
                            </p>
                            <strong>Address</strong>
                            <p className="text-gray-600">
                                {t("aboutUsAddress")}
                            </p>
                        </div>
                        <div>
                            <img
                                src={aboutPic}
                                className="h-60 w-full object-cover rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white bg-cover bg-center min-h-fit items-center justify-center py-12 px-10 gap-8 grid grid-cols-2 lg:grid-cols-3">
                <PartnerCard title={"Partner1"} logo={aboutPic} website={"https://leonetinformatik.ch"} summary={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et\n" +
                    "perferendis eaque, exercitationem praesentium nihil."}/>
                <PartnerCard title={"Partner2"} logo={aboutPic} website={"https://leonetinformatik.ch"} summary={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et\n" +
                    "perferendis eaque, exercitationem praesentium nihil."}/>
                <PartnerCard title={"Partner3"} logo={aboutPic} website={"https://leonetinformatik.ch"} summary={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et\n" +
                    "perferendis eaque, exercitationem praesentium nihil."}/>

            </div>

        </div>
    )
}

function PartnerCard({logo, title, summary, website}) {
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-green-100 bg-cover bg-center"
        >
            <div className="px-6 pt-4 pb-2 items-center justify-center flex">
                <img className="w-4/12" src={logo} alt="Logo"/>
            </div>

            <div className="px-6 py-4">
                <div className="font-bold text-lg mb-2 text-center">{title}</div>
                <p className="text-gray-700 text-base text-sm">
                    {summary}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2 items-center justify-center flex">
                <a href={website}
                    className="inline-block bg-orange-500 rounded-lg px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">Learn More</a>
            </div>
        </div>
    )
}