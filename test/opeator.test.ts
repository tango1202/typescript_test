import { plus, minus } from '../src/operator'; // 테스트할 모듈. 확장자를 안붙여도 됩니다.
import {describe, expect, it} from '@jest/globals'; // Jest 모듈

describe('테스트입니다', () => { // 테스트 범주
    it('plus() 테스트', () => { // 테스트케이스
        expect(plus(1, 2)).toBe(3);
    });
    it('minus() 테스트', () => { // 테스트케이스
        expect(minus(1, 2)).toBe(-1);
    });
});