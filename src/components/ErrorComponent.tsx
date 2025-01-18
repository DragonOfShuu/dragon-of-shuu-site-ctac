import { randomItem } from "@/clientlibs/random";
import SpecialButton from "@/components/SpecialButton";

export type ErrorComponentPropType = {

} & NextErrorComponentPropType & JSX.IntrinsicElements['div'];

const ErrorComponent = (props: ErrorComponentPropType) => {
    const {error, reset, ...divProps} = props;

    const snarkyComment = randomItem(['This happens sometimes.', 'Why today?', 'Just send an email to loganmcederlof@gmail.com. He\'ll fix it.', 'lol'])

    return (
        <div {...divProps}>
            <div className={`size-full relative`}>
                <h1 className={`hidden md:block absolute -z-10 md:-top-12 md:-left-12 md:text-7xl font-bold font-sans text-orange-950/90`}>
                    ERROR
                </h1>
                <div className={`flex flex-col p-4 h-full bg-orange-950 border-orange-700 border-2 rounded-md`}>
                    <h2>
                        Oh No, Something Went Wrong!
                    </h2>
                    <p>
                        {snarkyComment}
                    </p>
                    <div className={`bg-orange-975 rounded-md p-2 my-4 grow overflow-auto`}>
                        <pre className={``}>
                            {
                                error.stack
                            }
                        </pre>
                    </div>
                    <SpecialButton onClick={reset}>
                        Reload
                    </SpecialButton>
                </div>
            </div>
        </div>
    )
}

export default ErrorComponent;
