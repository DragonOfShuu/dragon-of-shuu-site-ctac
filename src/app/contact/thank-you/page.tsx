import SubmissionViewer from "@/app/contact/thank-you/SubmissionViewer";
import Loading from "@/components/Loading";
import PageHeader from "@/components/PageHeader";
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
                        <h3 className={`text-orange-300 text-xl`}>
                            We will get to you as soon as possible
                        </h3>
                    </div>
                    <div>
                        <Link className={`special-button`} href={"/"}>
                            Return Home
                        </Link>
                    </div>
                </div>

                <div
                    className={`w-full lg:w-[700px] bg-black/60 backdrop-blur-sm border border-orange-500/40 rounded-lg p-4`}
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
