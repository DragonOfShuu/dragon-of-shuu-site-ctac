import SubmissionViewer from "@/app/contact/thank-you/SubmissionViewer";
import PageHeader from "@/components/PageHeader"
import SpecialButton from "@/components/SpecialButton";
import Link from "next/link";


const ThankYou = () => {
    return (
        <>
            <PageHeader>
                <h1>Thank You!</h1>
            </PageHeader>
            <div className="w-full flex flex-col items-center p-4 gap-4">
                <div className={`self-stretch text-center md:h-48 flex flex-col place-content-center gap-8`}>
                    <div>
                        <h2>
                            Response Received
                        </h2>
                        <h4 className={`text-orange-800`}>
                            You should receive an email soon
                        </h4>
                    </div>
                    <div>
                        <SpecialButton>
                            <Link href={'/'}>
                                Return Home
                            </Link>
                        </SpecialButton>
                    </div>
                </div>
                
                <div className={`w-full lg:w-[700px] border-2 rounded-md border-orange-900 p-4`}>
                    <SubmissionViewer />
                </div>
            </div>
        </>
    )
}

export default ThankYou;