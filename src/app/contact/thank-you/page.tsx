import SubmissionViewer from "@/app/contact/thank-you/SubmissionViewer";
import Loading from "@/components/Loading";
import PageHeader from "@/components/PageHeader";
import SpecialButton from "@/components/SpecialButton";
import Link from "next/link";
import { Suspense } from "react";

const ThankYou = () => {
    return (
        <>
            <PageHeader>
                <h1>Thank You!</h1>
            </PageHeader>
            <div className="w-full flex flex-col items-center p-4 gap-4">
                <div
                    className={`self-stretch text-center md:h-48 flex flex-col place-content-center gap-8`}
                >
                    <div>
                        <h2>Response Received</h2>
                        <h3 className={`text-orange-800 text-xl`}>
                            We will get to you as soon as possible
                        </h3>
                    </div>
                    <div>
                        <SpecialButton>
                            <Link href={"/"}>Return Home</Link>
                        </SpecialButton>
                    </div>
                </div>

                <div
                    className={`w-full lg:w-[700px] border-2 rounded-md border-orange-900 p-4`}
                >
                    <Suspense fallback={<Loading />}>
                        <SubmissionViewer />
                    </Suspense>
                </div>
            </div>
        </>
    );
};

export default ThankYou;
