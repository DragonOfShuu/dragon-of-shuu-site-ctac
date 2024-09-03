import styles from './Loading.module.sass'
import SnarkyComment from './SnarkyComments';


export type LoadingScreenProps = {
    
}

const Loading = (props: LoadingScreenProps) => {
    // Always load the first option first, that
    // way both the client and server sync

    return (
        <div className={`size-full flex flex-col items-center justify-center gap-4`}>
            <div className={`${styles.loadingCircle}`} />
            <SnarkyComment className={`text-orange-800 capitalize`} />
        </div>
    )
}

export default Loading;
