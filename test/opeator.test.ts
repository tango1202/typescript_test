import { describe, expect, it } from '@jest/globals'; // Jest 모듈
import { plus, minus } from '../src/operator'; // 테스트할 모듈. 확장자를 안붙여도 됩니다.

describe('테스트입니다', () => {
    // 테스트 범주
    it('plus() 테스트', () => {
        // 테스트케이스
        expect(plus(1, 2)).toBe(3);
    });
    it('minus() 테스트', () => {
        // 테스트케이스
        expect(minus(1, 2)).toBe(-1);
    });
});

describe('타입스크립트 기본 문법', () => {
    it('변수 선언', () => {
        const val: string = 'Kim'; // 일반 변수

        const arr1: number[] = [1, 2, 3]; // 배열
        const arr2: Array<number> = [1, 2, 3];

        const tuple: [string, number] = ['Kim', 10]; // 튜플

        enum Color {
            Red,
            Green,
            Blue,
        } // 열거형
        const color: Color = Color.Red;

        expect(val).toBe('Kim');
        expect(arr1[0]).toBe(1);
        expect(arr1[1]).toBe(2);
        expect(arr1[2]).toBe(3);
        expect(arr2[0]).toBe(1);
        expect(arr2[1]).toBe(2);
        expect(arr2[2]).toBe(3);

        expect(tuple[0]).toBe('Kim');
        expect(tuple[1]).toBe(10);
        expect(color).toBe(Color.Red);
    });
    it('함수 선언', () => {
        // 함수 선언
        function add1(a: number, b: number): number {
            return a + b;
        }
        // 함수 선언
        const add2 = function (a: number, b: number): number {
            return a + b;
        };
        // 화살표 함수
        const add3 = (a: number, b: number): number => a + b;

        expect(add1(1, 2)).toBe(3);
        expect(add2(1, 2)).toBe(3);
        expect(add3(1, 2)).toBe(3);
    });
    it('타입 추론', () => {
        const val = 'Kim'; // val은 string 타입입니다.

        expect(typeof val).toBe('string');
    });
    it('클래스', () => {
        class User {
            name: string; // 속성을 사전에 선언합니다.
            constructor(name: string) {
                this.name = name;
            }

            getName() {
                return this.name;
            }
        }

        const user = new User('Kim');
        expect(user.getName()).toBe('Kim');
    });
    it('클래스 접근 제한자', () => {
        class User {
            private name: string; // 다른 개체에서 사용 불가
            protected address: string; // 상속한 개체에서 사용
            public phone: string; // 외부에서 사용
            readonly gender: string; // 읽기 전용
            static staticData: string; // 정적 변수. User.staticData로 접근합니다.

            constructor(name: string, gender: string) {
                this.name = name;
                this.gender = gender; // 읽기 전용은 생성자에서만 설정할 수 있습니다.
            }

            getName() {
                return this.name;
            }
            // 정적 함수입니다. User.staticMethod()로 접근합니다.
            static staticMethod(): number {
                return 10;
            }
        }
        // User를 상속합니다.
        class Derived extends User {
            constructor(name: string, gender: string) {
                super(name, gender);
            }

            // getDerivedName() {
            // return this.name; // (X) 컴파일 오류. private는 접근할 수 없습니다.
            // }
            getAddress() {
                return this.address; // protected에 접근합니다.
            }
            // setGender(gender:string) {
            //  this.gender = gender; // (X) 컴파일 오류. readonly는 수정할 수 없습니다.
            // }
        }

        const derived = new Derived('Kim', 'man');
        derived.phone = '123-4567'; // public에 접근할 수 있습니다.

        // expect(derived.name).toBe('Kim'); // (X) 컴파일 오류. private는 접근할 수 없습니다.
        expect(derived.getName()).toBe('Kim');
        // expect(derived.address).toBe(''); // (X) 컴파일 오류. protected는 접근할 수 없습니다.
        expect(derived.phone).toBe('123-4567'); // public은 접근할 수 있습니다.

        // staticMethod는 클래스명으로 접근합니다.
        expect(User.staticMethod()).toBe(10);
        expect(Derived.staticMethod()).toBe(10);
        // expect(derived.staticMethod()).toBe(10); // (X) 컴파일 오류. 클래스명으로 접근해야 합니다.
    });
    it('타입 캐스팅', () => {
        class Base {
            name: string;
            constructor(name: string) {
                this.name = name;
            }
        }
        // 상속했습니다.
        class Derived extends Base {
            constructor(name: string) {
                super(name);
            }
        }
        const derived = new Derived('Kim');
        const base1: Base = derived as Base; // 형변환
        const base2: Base = <Base>derived; // 형변환

        expect(derived instanceof Derived).toBe(true);
        expect(base1 instanceof Base).toBe(true);
        expect(base2 instanceof Base).toBe(true);

        // Base로 형변환했지만, 여전히 Derived입니다.
        expect(base1 instanceof Derived).toBe(true);
        expect(base2 instanceof Derived).toBe(true);
    });
    it('추상 클래스', () => {
        abstract class Shape {
            // 추상 클래스입니다.
            width: number;
            height: number;

            constructor(w: number, h: number) {
                this.width = w;
                this.height = h;
            }

            getWidth(): number {
                return this.width;
            }
            getHeight(): number {
                return this.height;
            }

            abstract Draw(): number[]; // 추상 메서드는 자식 개체에서 구현해야 합니다.
        }
        class Rectangle extends Shape {
            constructor(w: number, h: number) {
                super(w, h);
            }
            // 추상 메서드를 구현합니다.
            Draw(): number[] {
                return [this.width, this.height];
            }
        }

        // const shape = new Shape(10, 20); // (X) 컴파일 오류. 추상 클래스는 생성할 수 없습니다.
        const rectangle = new Rectangle(10, 20);
        expect(rectangle.Draw()[0]).toBe(10);
        expect(rectangle.Draw()[1]).toBe(20);
    });
});
describe('타입스크립트 인터페이스', () => {
    it('속성 규약', () => {
        interface IUser {
            id: number;
            name: string;
            getName(): string;
        }

        // 인터페이스에서 선언한 속성들이 구현되어야 합니다.
        const user: IUser = {
            id: 1,
            name: 'Kim',
            getName: function () {
                return this.name;
            },
        };

        expect(user.id).toBe(1);
        expect(user.name).toBe('Kim');
        expect(user.getName()).toBe('Kim');
    });
    it('속성이나 메서드가 동일하면 대입됨', () => {
        interface IUser {
            id: number;
            name: string;
        }

        // id와 name 속성이 있는 개체입니다.
        const user1 = {
            id: 1,
            name: 'Kim',
        };

        // IUser 타입은 아니지만 속성이 같으므로 대입됩니다.
        const user2: IUser = user1;

        expect(user1 === user2).toBe(true);
    });
    it('함수 인터페이스', () => {
        interface IAdd {
            (a: number, b: number): number; // 숫자 2개를 전달받아 숫자를 리턴하는 함수
        }

        const addFunc: IAdd = function (a: number, b: number): number {
            return a + b;
        };

        expect(addFunc(1, 2)).toBe(3);
    });
    it('클래스 인터페이스', () => {
        interface IUser {
            id: number;
            name: string;

            getName(): string; // 메서드는 추상으로 선언됩니다.
        }

        class User implements IUser {
            id: number;
            name: string;

            constructor(id: number, name: string) {
                this.id = id;
                this.name = name;
            }

            getName() {
                return this.name;
            }
        }

        const user = new User(0, 'Kim');

        expect(user.getName()).toBe('Kim');
    });
    it('인터페이스 상속', () => {
        interface IPerson {
            name: string;
        }
        // 인터페이스를 상속합니다.
        interface IUser extends IPerson {
            id: number;
        }

        const user: IUser = {
            id: 1,
            name: 'Kim',
        };

        expect(user.id).toBe(1);
        expect(user.name).toBe('Kim');
    });
    it('다중 상속', () => {
        interface IPerson {
            name: string;
        }
        interface ISalary {
            salary: number;
        }
        // 다중 상속해서 만든 인터페이스입니다.
        interface IEmployee extends IPerson, ISalary {}

        const employee: IEmployee = {
            name: 'Kim',
            salary: 100,
        };

        expect(employee.name).toBe('Kim');
        expect(employee.salary).toBe(100);
    });
});
describe('타입스크립트 타입 별칭', () => {
    it('사용자 정의 타입', () => {
        type User = {
            id: number;
            name: string;
        };
        // 개체를 초기값을 주어 생성합니다.
        const user1: User = {
            id: 1,
            name: 'Kim',
        };
        expect(user1.id).toBe(1);
        expect(user1.name).toBe('Kim');

        // 빈 개체를 User로 생성한 후 값을 대입합니다.
        const user2: User = {} as User;
        user2.id = 2;
        user2.name = 'Lee';
        expect(user2.id).toBe(2);
        expect(user2.name).toBe('Lee');
    });
    it('특정 값으로만 타입 구성', () => {
        type Week = '월' | '화' | '수' | '목' | '금';
        const week1: Week = '월';
        //const week2:Week = '토'; // (X) 컴파일 오류. '토'는 Week 타입이 아닙니다.

        expect(week1).toBe('월');
    });
});
describe('선택적 속성', () => {
    it('선택적 속성', () => {
        interface IUser {
            id: number;
            name: string;
            addr?: string; // addr은 없을 수도 있습니다.
        }

        // addr이 없어도 IUser에 대입됩니다.
        const user: IUser = {
            id: 1,
            name: 'Kim',
        };

        expect(user.id).toBe(1);
        expect(user.name).toBe('Kim');
    });
});
