import PageHeader from "@/components/PageHeader"


const ThankYou = () => {
    return (
        <>
            <PageHeader>
                <h1>Thank You!</h1>
            </PageHeader>
            <div className="w-full flex flex-col items-center p-4">
                <h2>
                    Response Received
                </h2>
                <h4 className={`text-orange-800`}>
                    You should receive and email soon
                </h4>
            </div>
        </>
    )
}

export default ThankYou;