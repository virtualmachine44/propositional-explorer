import { Constant, Formula, PredicateAtom, Negation, Conjunction, Disjunction, Implication, Equivalence, SignedType } from '../lib/Formula';

describe('Formula signedType signedSubfs', () => {
    const a = new Constant('a');
    const b = new Constant('b');
    const c = new Constant('c');
    const d = new Constant('d');

    const A = new PredicateAtom('A', [a]);
    const B = new PredicateAtom('B', [b]);
    const C = new PredicateAtom('C', [c, d]);

    test('Conjunction signedType signedSubfs', () => {
        const conjunction = new Conjunction([A, B, C]);

        expect(conjunction.signedType(true)).toBe(SignedType.Alpha);
        expect(conjunction.signedType(false)).toBe(SignedType.Beta);

        expect(conjunction.signedSubfs(true)).toEqual([
            { sign: true, f: A },
            { sign: true, f: B },
            { sign: true, f: C }
        ]);

        expect(conjunction.signedSubfs(false)).toEqual([
            { sign: false, f: A },
            { sign: false, f: B },
            { sign: false, f: C }
        ]);
    });

    test('Disjunction signedType signedSubfs', () => {
        const disjunction = new Disjunction([A, B, C]);

        expect(disjunction.signedType(true)).toBe(SignedType.Beta);
        expect(disjunction.signedType(false)).toBe(SignedType.Alpha);

        expect(disjunction.signedSubfs(true)).toEqual([
            { sign: true, f: A },
            { sign: true, f: B },
            { sign: true, f: C }
        ]);

        expect(disjunction.signedSubfs(false)).toEqual([
            { sign: false, f: A },
            { sign: false, f: B },
            { sign: false, f: C }
        ]);
    });

    test('Implication signedType signedSubfs', () => {
        const implication = new Implication(A, B);

        expect(implication.signedType(true)).toBe(SignedType.Beta);
        expect(implication.signedType(false)).toBe(SignedType.Alpha);

        expect(implication.signedSubfs(true)).toEqual([
            { sign: false, f: A },
            { sign: true, f: B }
        ]);

        expect(implication.signedSubfs(false)).toEqual([
            { sign: true, f: A },
            { sign: false, f: B }
        ]);
    });

    test('Equivalence signedType signedSubfs', () => {
        const equivalence = new Equivalence(A, B);

        expect(equivalence.signedType(true)).toBe(SignedType.Alpha);
        expect(equivalence.signedType(false)).toBe(SignedType.Beta);

        expect(equivalence.signedSubfs(true)).toEqual([
            { sign: true, f: new Implication(A, B) },
            { sign: true, f: new Implication(B, A) }
        ]);

        expect(equivalence.signedSubfs(false)).toEqual([
            { sign: false, f: new Implication(A, B) },
            { sign: false, f: new Implication(B, A) }
        ]);
    });

    test('Negation signedType signedSubfs', () => {
        const negation = new Negation(A);

        expect(negation.signedType(true)).toBe(SignedType.Alpha);
        expect(negation.signedType(false)).toBe(SignedType.Alpha);

        expect(negation.signedSubfs(true)).toEqual([
            { sign: false, f: A }
        ]);

        expect(negation.signedSubfs(false)).toEqual([
            { sign: true, f: A }
        ]);
    });

    test ('Negation2 signedType signedSubfs', () => {
        const negation2 = new Negation(new Conjunction([A, B, C]));

        expect(negation2.signedType(true)).toBe(SignedType.Alpha);
        expect(negation2.signedType(false)).toBe(SignedType.Alpha);

        expect(negation2.signedSubfs(true)).toEqual([
            {sign: false, f: new Conjunction([A, B, C])}
        ]);
    })

    test('PredicateAtom signedType signedSubfs', () => {
        expect(A.signedType(true)).toBe(SignedType.Alpha);
        expect(A.signedType(false)).toBe(SignedType.Alpha);

        expect(A.signedSubfs(true)).toEqual([]);

        expect(A.signedSubfs(false)).toEqual([]);
    });

    test('Equivalence2 signedType signedSubfs', () => {
        const equivalence = new Equivalence(A, B);
        const nestedEquivalence = new Equivalence(equivalence, C);

        expect(nestedEquivalence.signedType(true)).toBe(SignedType.Alpha);
        expect(nestedEquivalence.signedType(false)).toBe(SignedType.Beta);

        expect(nestedEquivalence.signedSubfs(true)).toEqual([
            { sign: true, f: new Implication(equivalence, C) },
            { sign: true, f: new Implication(C, equivalence) }
        ]);

        expect(nestedEquivalence.signedSubfs(false)).toEqual([
            { sign: false, f: new Implication(equivalence, C) },
            { sign: false, f: new Implication(C, equivalence) }
        ]);

        const nestedImplication = nestedEquivalence.signedSubfs(true)[0].f as Implication;
        expect(nestedImplication.signedSubfs(true)).toEqual([
            { sign: false, f: equivalence },
            { sign: true, f: C }
        ]);

        const innerEquivalence = nestedImplication.signedSubfs(true)[0].f as Equivalence;
        expect(innerEquivalence.signedSubfs(true)).toEqual([
            { sign: true, f: new Implication(A, B) },
            { sign: true, f: new Implication(B, A) }
        ]);

        const implicationAB = innerEquivalence.signedSubfs(true)[0].f as Implication;
        expect(implicationAB.signedSubfs(true)).toEqual([
            { sign: false, f: A },
            { sign: true, f: B }
        ]);

        const implicationBA = innerEquivalence.signedSubfs(true)[1].f as Implication;
        expect(implicationBA.signedSubfs(true)).toEqual([
            { sign: false, f: B },
            { sign: true, f: A }
        ]);
    });
});

export {};

//run $ npx jest src/__tests__/Signed.test.ts