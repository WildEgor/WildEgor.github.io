import { power } from './index.js'

describe('test power', () => {
    it("positive exp", () => {
        const result = power(2, 2)
        expect(result).toBe(4)
    }) //successful
    it("negative exp", () => {
        const result = power(2, -2)
        expect(result).toBe(1/4)
    }) //unsuccessful
})