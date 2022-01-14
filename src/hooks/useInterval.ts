import {useEffect, useLayoutEffect, useRef} from 'react'

function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback)

    // Remember the latest callback if it changes.
    useLayoutEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        // Don't schedule if no delay is specified.
        // Note: 0 is a valid value for delay.
        if (!delay && delay !== 0) {
            return
        }

        function tick() {
            if (savedCallback && typeof savedCallback.current !== 'undefined') {
                savedCallback.current();
            }
        }

        tick();
        const id = setInterval(tick, delay)

        return () => clearInterval(id)
    }, [delay])
}

export default useInterval;
