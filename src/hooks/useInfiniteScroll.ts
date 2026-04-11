import { useLayoutEffect, useRef } from "react"

export const useInfiniteScroll = (
    scrollableRef: React.RefObject<HTMLDivElement | null>,
    stoppingCondition: boolean,
    loadingFunction: () => void,
    isLoading: boolean
) => {
    const prevScrollHeight = useRef(0)
    const isFetchingRef = useRef(false)

    const onScroll = () => {
        const el = scrollableRef.current
        if (!el) return

        if (el.scrollTop < 250 && !isFetchingRef.current && !stoppingCondition) {
            isFetchingRef.current = true
            prevScrollHeight.current = el.scrollHeight
            loadingFunction()
        }
    }

    useLayoutEffect(() => {
        const el = scrollableRef.current
        if (!el) return
        if (!prevScrollHeight.current) return

        const newScrollHeight = el.scrollHeight
        const diff = newScrollHeight - prevScrollHeight.current

        el.scrollTop += diff
        prevScrollHeight.current = 0
        isFetchingRef.current = false
    }, [isLoading])

    return { onScroll }
}