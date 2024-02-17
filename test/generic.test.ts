import { describe, expect, it } from '@jest/globals'; // Jest 모듈

describe('제네릭', () => {
    it('함수 제네릭', () => {
        // T 타입의 .length를 리턴합니다.
        function getLength<T>(params: T[]): number {
            return params.length;
        }

        // 함수 인스턴스화시 타입이 결정됩니다.
        expect(getLength<number>([1, 2])).toBe(2);
        expect(getLength<string>(['a', 'b'])).toBe(2);

        // 추론 가능하면 <>을 생략할 수 있습니다.
        expect(getLength([1, 2])).toBe(2);
        expect(getLength(['a', 'b'])).toBe(2);
    });

    it('클래스 제네릭', () => {
        // 임의 타입을 배열로 관리하는 Queue입니다.
        class Queue<T> {
            protected data: T[] = [];
            push(item: T) {
                this.data.push(item);
            }
            pop(): T | undefined {
                return this.data.shift();
            }
        }

        // number를 사용하는 Queue입니다.
        const q1 = new Queue<number>();
        q1.push(0);
        q1.push(1);
        expect(q1.pop()).toBe(0);

        // string을 사용하는 Queue입니다.
        const q2 = new Queue<string>();
        q2.push('a');
        q2.push('b');
        expect(q2.pop()).toBe('a');
    });
});
