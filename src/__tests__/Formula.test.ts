import { Valuation, Constant, Formula, PredicateAtom, Negation, Conjunction, Disjunction, Implication, Equivalence } from '../lib/Formula'

describe('PredicateAtom Class Tests', () => {
  const c = new Constant('ccc');
  const d = new Constant('ddd');
  const pn = 'Ppp';
  const cn = 'ccc';
  const dn = 'ddd';

  const p = (...args: Constant[]) => new PredicateAtom(pn, args);

  test('PredicateAtom constructor should create an instance', () => {
    const pcd = p(c, d);
    expect(pcd.name()).toBe(pn);
    expect(pcd.arguments()).toEqual([c, d]);
    expect(pcd.subfs()).toEqual([]);
    expect(pcd.toString()).toBe(`${pn}(${cn},${dn})`);
    expect(pcd.toTex()).toBe(`\\text{\\textsf{${pn}}}(\\text{\\textsf{${cn}}},\\text{\\textsf{${dn}}})`);
  });

  test('PredicateAtom constants, predicates, and atoms', () => {
    const pcd = p(c, d);
    expect(pcd.constants()).toEqual(new Set([cn, dn]));
    expect(pcd.predicates()).toEqual(new Set([pn]));
    expect(pcd.atoms()).toEqual(new Set([pcd]));
  });
});


describe('Negation Class Tests', () => {
    const c = new Constant('ccc');
    const d = new Constant('ddd');
    const pn = 'Ppp';
    const cn = 'ccc';
    const operator = '¬'
  
    const p = (...args: Constant[]) => new PredicateAtom(pn, args);
    const Neg = (formula: Formula) => new Negation(formula);
  
    test('Negation constructor and methods', () => {
      const pc = p(c);
      const n = Neg(pc);
  
      expect(n.originalFormula()).toBe(pc);
      expect(n.toString()).toBe(`${operator}${pn}(${cn})`);
      expect(n.toTex()).toBe(`\\lnot \\text{\\textsf{${pn}}}(\\text{\\textsf{${cn}}})`); 
  
      expect(n.subfs()).toEqual([pc]);
      expect(n.constants()).toEqual(new Set([cn]));
      expect(n.predicates()).toEqual(new Set([pn]));
      expect(n.atoms()).toEqual(new Set([pc]));
    });
  });

describe('Disjunction Class Tests1', () => {
    const c = new Constant('ccc');
    const d = new Constant('ddd');
    const pn = 'Ppp';
    const cn = 'ccc';
    const dn = 'ddd';
    const operator = ' ∨ '

    const p = (...args: Constant[]) => new PredicateAtom(pn, args);
    const Or = (...formulas: Formula[]) => new Disjunction(formulas);

    test('Disjunction constructor and methods', () => {
        const pc = p(c);
        const pd = p(d);
        const dis = Or(pc, pd);

        expect(dis.toString()).toBe(`(${pn}(${cn})${operator}${pn}(${dn}))`);

        expect(dis.subfs()).toEqual([pc, pd]);
        expect(dis.constants()).toEqual(new Set([cn, dn]));
        expect(dis.predicates()).toEqual(new Set([pn]));
        expect(dis.atoms()).toEqual(new Set([pc, pd]));
    });
});

describe('Disjunction Class Tests2', () => {
    const c = new Constant('ccc');
    const d = new Constant('ddd');
    const pn = 'Ppp';
    const cn = 'ccc';
    const dn = 'ddd';
    const operator = ' ∨ '

    const p = (...args: Constant[]) => new PredicateAtom(pn, args);
    const Or = (...formulas: Formula[]) => new Disjunction(formulas);

    test('Disjunction constructor and methods', () => {
        const pc = p(c);
        const pd = p(d);
        const dis = Or(pc, pd);

        expect(dis.toString()).toBe(`(${pn}(${cn})${operator}${pn}(${dn}))`);

        expect(dis.subfs()).toEqual([pc, pd]);
        expect(dis.constants()).toEqual(new Set([cn, dn]));
        expect(dis.predicates()).toEqual(new Set([pn]));
        expect(dis.atoms()).toEqual(new Set([pc, pd]));
    });

    test('Disjunction1 constructor and methods', () => {
        const pc = p(c);
        const dis = Or(pc);

        expect(dis.toString()).toBe(`(${pn}(${cn}))`);

        expect(dis.subfs()).toEqual([pc]);
        expect(dis.constants()).toEqual(new Set([cn]));
        expect(dis.predicates()).toEqual(new Set([pn]));
        expect(dis.atoms()).toEqual(new Set([pc]));
    });
});

describe('Conjunction Class Tests', () => {
  const c = new Constant('ccc');
  const d = new Constant('ddd');
  const pn = 'Ppp';
  const cn = 'ccc';
  const dn = 'ddd';
  const operator = ' ∧ '

  const p = (...args: Constant[]) => new PredicateAtom(pn, args);
  const And = (...formulas: Formula[]) => new Conjunction(formulas);

  test('Conjunction2 constructor and methods', () => {
      const pc = p(c);
      const pd = p(d);
      const con = And(pc, pd);

      expect(con.toString()).toBe(`(${pn}(${cn})${operator}${pn}(${dn}))`);

      expect(con.subfs()).toEqual([pc, pd]);
      expect(con.constants()).toEqual(new Set([cn, dn]));
      expect(con.predicates()).toEqual(new Set([pn]));
      expect(con.atoms()).toEqual(new Set([pc, pd]));
  });

  test('Conjunction1 constructor and methods', () => {
      const pc = p(c);
      const con = And(pc);

      expect(con.toString()).toBe(`(${pn}(${cn}))`);

      expect(con.subfs()).toEqual([pc]);
      expect(con.constants()).toEqual(new Set([cn]));
      expect(con.predicates()).toEqual(new Set([pn]));
      expect(con.atoms()).toEqual(new Set([pc]));
  });

  test('Conjunction0 constructor and methods', () => {
      const con = And();

      expect(con.toString()).toBe("()");

      expect(con.subfs()).toEqual([]);
      expect(con.constants()).toEqual(new Set());
      expect(con.predicates()).toEqual(new Set());
      expect(con.atoms()).toEqual(new Set());
  });
});

describe('Implication Class Tests', () => {
  const c = new Constant('ccc');
  const d = new Constant('ddd');
  const pn = 'Ppp';
  const cn = 'ccc';
  const dn = 'ddd';
  const operator = ' → ';

  const p = (...args: Constant[]) => new PredicateAtom(pn, args);
  const Impl = (left: Formula, right: Formula) => new Implication(left, right);
  const And = (...formulas: Formula[]) => new Conjunction(formulas);

  test('Implication constructor and methods', () => {
      const pc = p(c);
      const pd = p(d);
      const impl = Impl(pc, pd);

      expect(impl.leftSide()).toBe(pc);
      expect(impl.rightSide()).toBe(pd);

      expect(impl.toString()).toBe(`(${pn}(${cn})${operator}${pn}(${dn}))`);

      expect(impl.subfs()).toEqual([pc, pd]);
      expect(impl.constants()).toEqual(new Set([cn, dn]));
      expect(impl.predicates()).toEqual(new Set([pn]));
      expect(impl.atoms()).toEqual(new Set([pc, pd]));
  });
});

describe('Equivalence Class Tests', () => {
  const c = new Constant('ccc');
  const d = new Constant('ddd');
  const pn = 'Ppp';
  const cn = 'ccc';
  const dn = 'ddd';
  const operator = ' ↔︎ '

  const p = (...args: Constant[]) => new PredicateAtom(pn, args);
  const Eq = (left: Formula, right: Formula) => new Equivalence(left, right);
  const And = (...formulas: Formula[]) => new Conjunction(formulas);

  test('Equivalence constructor and methods', () => {
      const pc = p(c);
      const pd = p(d);
      const eq = Eq(pc, pd);

      expect(eq.leftSide()).toBe(pc);
      expect(eq.rightSide()).toBe(pd);

      expect(eq.toString()).toBe(`(${pn}(${cn})${operator}${pn}(${dn}))`);

      expect(eq.subfs()).toEqual([pc, pd]);
      expect(eq.constants()).toEqual(new Set([cn, dn]));
      expect(eq.predicates()).toEqual(new Set([pn]));
      expect(eq.atoms()).toEqual(new Set([pc, pd]));
  });
});

describe('Formula subfs method tests', () => {
  const c = new Constant('ccc');
  const d = new Constant('ddd');
  const pn = 'Ppp';
  const operatorImplication = '->';
  const operatorEquivalence = '<->';

  const p = (...args: Constant[]) => new PredicateAtom(pn, args);
  const Neg = (formula: Formula) => new Negation(formula);
  const And = (...formulas: Formula[]) => new Conjunction(formulas);
  const Or = (...formulas: Formula[]) => new Disjunction(formulas);
  const Impl = (left: Formula, right: Formula) => new Implication(left, right);
  const Eq = (left: Formula, right: Formula) => new Equivalence(left, right);

  test('subfs method', () => {
      const pc = p(c);
      const pd = p(d);

      const neg = Neg(pc);
      const con = And(pc, pd);
      const dis = Or(pc, pd);
      const impl = Impl(pc, pd);
      const eq = Eq(pc, pd);

      const formulas = [neg, con, dis, impl, eq];

      formulas.forEach(f1 => {
          expect(Neg(f1).subfs()).toEqual([f1]);
          formulas.forEach(f2 => {
              expect(And(f1, f2).subfs()).toEqual([f1, f2]);
              expect(Or(f1, f2).subfs()).toEqual([f1, f2]);
              expect(Impl(f1, f2).subfs()).toEqual([f1, f2]);
              expect(Eq(f1, f2).subfs()).toEqual([f1, f2]);
          });
      });
  });
});

describe('Formula isTrue method tests', () => {
  let valuation: Valuation;

  beforeEach(() => {
    valuation = {
        'pride(Kim)': true,
        'pride(Jim)': false,
        'pride(Sarah)': true,
    };
  });

  const k = new Constant('Kim');
  const j = new Constant('Jim');
  const s = new Constant('Sarah');
  const p = 'pride';
  const predicate = (...args: Constant[]) => new PredicateAtom(p, args);

  const pk = predicate(k);
  const pj = predicate(j);
  const ps = predicate(s);

  const formulaX = new Implication(new Disjunction([pj, new Negation(pk)]), ps);

  test('Formula X isTrue', () => {
    expect(pk.isTrue(valuation)).toBe(true);
    expect(pj.isTrue(valuation)).toBe(false);
    expect(ps.isTrue(valuation)).toBe(true);
    expect(formulaX.isTrue(valuation)).toBe(true);
  });

describe('isTrue method loop', () => {
  const permutations = [
    { 'pride(Kim)': true, 'pride(Jim)': true, 'pride(Sarah)': true },
    { 'pride(Kim)': true, 'pride(Jim)': true, 'pride(Sarah)': false },
    { 'pride(Kim)': true, 'pride(Jim)': false, 'pride(Sarah)': true },
    { 'pride(Kim)': true, 'pride(Jim)': false, 'pride(Sarah)': false },
    { 'pride(Kim)': false, 'pride(Jim)': true, 'pride(Sarah)': true },
    { 'pride(Kim)': false, 'pride(Jim)': true, 'pride(Sarah)': false },
    { 'pride(Kim)': false, 'pride(Jim)': false, 'pride(Sarah)': true },
    { 'pride(Kim)': false, 'pride(Jim)': false, 'pride(Sarah)': false },
  ];

  const k = new Constant('Kim');
  const j = new Constant('Jim');
  const s = new Constant('Sarah');
  const p = 'pride';
  const predicate = (...args: Constant[]) => new PredicateAtom(p, args);

  const pk = predicate(k);
  const pj = predicate(j);
  const ps = predicate(s);

  const formulaX = new Implication(new Disjunction([pj, new Negation(pk)]), ps);

  permutations.forEach((valuation, index) => {
    test(`Formula X isTrue with permutation ${index + 1}`, () => {
      expect(pk.isTrue(valuation)).toBe(valuation['pride(Kim)']);
      expect(pj.isTrue(valuation)).toBe(valuation['pride(Jim)']);
      expect(ps.isTrue(valuation)).toBe(valuation['pride(Sarah)']);
      const expectedFormulaXResult = !valuation['pride(Jim)'] && valuation['pride(Kim)'] || valuation['pride(Sarah)'];
      expect(formulaX.isTrue(valuation)).toBe(expectedFormulaXResult);
    });
  });
});

});