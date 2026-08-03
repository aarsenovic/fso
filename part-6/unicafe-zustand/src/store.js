import { create } from "zustand";


const useUnicafeStore = create(set => ({
    good:0,
    neutral: 0,
    bad: 0,

    actions: {
        incrementGood: () => set(state => ({ good: state.good + 1})),
        incrementNeutral: () => set(state => ({ neutral: state.neutral + 1})),
        incrementBad: () => set(state => ({ bad: state.bad + 1})),
    }
}))

export const useIncrementActions = () => useUnicafeStore(state => state.actions)

export const useUnicafeValues = () => {
    const goodValue = useUnicafeStore((state) => state.good)
    const neutralValue = useUnicafeStore((state) => state.neutral)
    const badValue = useUnicafeStore((state) => state.bad)

    const all = goodValue + neutralValue  + badValue
    const average = all === 0 ?0 :(goodValue * 1 + neutralValue * 0 + badValue * -1) / all
    const positive = all === 0 ? 0 : (goodValue / all) * 100

    return { goodValue, neutralValue, badValue, all, average, positive}
}


