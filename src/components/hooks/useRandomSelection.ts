import { randomItem } from "@/components/libs/random";
import { useEffect } from "react"

const useRandomSelection = <T>(items: T[], interval: number, runnable: (item: T)=> unknown) => {
    useEffect(() => {
        const runnerInterval = setInterval(() => {
            const item = randomItem(items);
            runnable(item)
        }, interval)

        return () => {
            clearInterval(runnerInterval)
        }
    })
}

export default useRandomSelection;