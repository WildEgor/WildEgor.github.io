import { random } from './index.js'

describe('Tests for random function', () => {
    const minPos = 1
    const minNeg = -1
    const maxPos = 4
    const maxNeg = -4
    const value = ''
    it('It should get random with type Number', () => {
        expect(typeof random(minPos, maxPos)).toBe("number")
        expect(random(minNeg, maxNeg) < 0).toBeTruthy()
        expect(typeof random(value, value)).toBe("number")
    })
})