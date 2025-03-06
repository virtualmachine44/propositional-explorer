export type Valuation = Record<string, boolean | null>;

export enum SignedType {
    Alpha = "alpha",
    Beta = "beta"
}

interface SignedFormula {
    sign: boolean;
    f: Formula;
}

class Constant {
    constructor(private name: string) {
    }

    toString(): string {
        return this.name;
    }

    toTex(): string {
        return `\\text{\\textsf{${this.name}}}`;
    }
}

abstract class Formula {
    protected constructor(private connective: string, private connectiveTex: string) {};

    abstract subfs(): Formula[];

    public toString(): string {
        return `(${
            this.subfs().map((subf) => subf.toString()).join(` ${this.connective} `)
        })`;
    }

    public toTex(): string {
        return `(${
            this.subfs().map((subf) => subf.toTex()).join(` ${this.connectiveTex} `)
        })`;
    }

    abstract isTrue(v: Valuation): boolean;

    public atoms(): Set<PredicateAtom> {
        return new Set(this.subfs().flatMap(form => Array.from(form.atoms())));
    }

    public constants(): Set<string> {
        return new Set(this.subfs().flatMap(form => Array.from(form.constants())));
    }

    public predicates(): Set<string> {
        return new Set(this.subfs().flatMap(form => Array.from(form.predicates())));
    }

    abstract signedType(sign: boolean): SignedType;
    abstract signedSubfs(sign: boolean): SignedFormula[];
}

class PredicateAtom extends Formula {
    constructor(private predName: string, private args: Constant[]) {
        super('', '');
    }

    name(): string {
        return this.predName;
    }

    arguments(): Constant[] {
        return this.args;
    }

    subfs(): Formula[] {
        return [];
    }

    toString(): string {
        const argsStr = this.args.map(arg => arg.toString()).join(',');
        return `${this.predName}(${argsStr})`;
    }

    toTex(): string {
        const argsStr = this.args.map(arg => arg.toTex()).join(',');
        return `\\text{\\textsf{${this.predName}}}(${argsStr})`;
    }

    isTrue(v: Valuation): boolean {
        const atomString = this.toString();
        if (v.hasOwnProperty(atomString) && v[atomString] !== null) {
            return v[atomString] as boolean;
        }
        throw new Error(`Atom "${atomString}" does not have a valuation.`);
    }

    atoms(): Set<PredicateAtom> {
        return new Set([this]);
    }

    constants(): Set<string> {
        return new Set(this.args.map(arg => arg.toString()));
    }

    predicates(): Set<string> {
        return new Set([this.predName]);
    }

    signedType(sign: boolean): SignedType {
        return SignedType.Alpha;
    }

    signedSubfs(sign: boolean): SignedFormula[] {
        return [];
    }
}


class Negation extends Formula {
    private original: Formula;

    constructor(originalFormula: Formula) {
        super('', '');
        this.original = originalFormula;
    }

    public originalFormula(): Formula {
        return this.original;
    }

    public subfs(): Formula[] {
        return [this.original];
    }
  
    public toString(): string {
        return `¬${this.original.toString()}`;
    }

    public toTex(): string {
        return `\\lnot ${this.original.toTex()}`;
    }

    public isTrue(v: Valuation): boolean {
        return !this.original.isTrue(v);
    }

    signedType(sign: boolean): SignedType {
        return SignedType.Alpha;
    }

    signedSubfs(sign: boolean): SignedFormula[] {
        return [{ sign: !sign,  f: this.original }];
    }
}

class Conjunction extends Formula {
    private conjuncts: Formula[];

    constructor(conjuncts: Formula[]) {
        super('∧', '\\land');
        this.conjuncts = conjuncts;
    }

    public subfs(): Formula[] {
        return this.conjuncts;
    }

    public isTrue(v: Valuation): boolean {
        return this.conjuncts.every(form => form.isTrue(v));
    }

    signedType(sign: boolean): SignedType {
        return sign ? SignedType.Alpha : SignedType.Beta;
    }

    signedSubfs(sign: boolean): SignedFormula[] {
        return this.conjuncts.map(f => ({ sign, f }));
    }
}

class Disjunction extends Formula {
    private disjuncts: Formula[];

    constructor(disjuncts: Formula[]) {
        super('∨', '\\lor');
        this.disjuncts = disjuncts;
    }

    public subfs(): Formula[] {
        return this.disjuncts;
    }

    public isTrue(v: Valuation): boolean {
        return this.disjuncts.some(form => form.isTrue(v));
    }

    signedType(sign: boolean): SignedType {
        return sign ? SignedType.Beta : SignedType.Alpha;
    }

    signedSubfs(sign: boolean): SignedFormula[] {
        return this.disjuncts.map(f => ({ sign, f }));
    }
}

class BinaryFormula extends Formula {
    private left: Formula;
    private right: Formula;
    private operator: string;
    private operatorTex: string;

    constructor(left: Formula, right: Formula, operator: string, operatorTex: string) {
        super(operator, operatorTex);
        this.left = left;
        this.right = right;
        this.operator = operator;
        this.operatorTex = operatorTex;
    }

    public leftSide(): Formula {
        return this.left;
    }

    public rightSide(): Formula {
        return this.right;
    }

    public subfs(): Formula[] {
        return [this.leftSide(), this.rightSide()];
    }
   
    isTrue(v: Valuation): boolean {
        return this.left.isTrue(v) && this.right.isTrue(v);
    }

    signedType(sign: boolean): SignedType {
        return SignedType.Alpha;
    }

    signedSubfs(sign: boolean): SignedFormula[] {
        return [
            { sign, f: this.left },
            { sign, f: this.right }
        ];
    }
}

class Implication extends BinaryFormula {
    constructor(left: Formula, right: Formula) {
        super(left, right, '→', '\\rightarrow');
    }

    isTrue(v: Valuation): boolean {
        return !this.leftSide().isTrue(v) || this.rightSide().isTrue(v);
    }

    signedType(sign: boolean): SignedType {
        return sign ? SignedType.Beta : SignedType.Alpha;
    }

    signedSubfs(sign: boolean): SignedFormula[] {
        return [{ sign: !sign, f: this.leftSide() }, { sign, f: this.rightSide() }];
    }
}

class Equivalence extends BinaryFormula {
    constructor(left: Formula, right: Formula) {
        super(left, right, '↔︎', '\\leftrightarrow');
    }

    isTrue(v: Valuation): boolean {
        return this.leftSide().isTrue(v) === this.rightSide().isTrue(v);
    }

    signedType(sign: boolean): SignedType {
        return sign ? SignedType.Alpha : SignedType.Beta;
    }

    signedSubfs(sign: boolean): SignedFormula[] {
        return [
            { sign, f: new Implication(this.leftSide(), this.rightSide()) },
            { sign, f: new Implication(this.rightSide(), this.leftSide()) }
        ];
    }
}

export { Constant, Formula, PredicateAtom, Negation, Conjunction, Disjunction, BinaryFormula, Implication, Equivalence };