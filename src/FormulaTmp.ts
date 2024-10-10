
class Constant {
    constructor(private name: string) {
    }

    toString(): string {
        return this.name;
    }
}

abstract class Formula {
    protected constructor(private connective: string, private connectiveTex: string) {};

    abstract subfs(): Formula[];

    public toString(): string {
        return `(${
            this.subfs().map((subf) => subf.toString()).join(this.connective)
        })`;
    }

    public toTex(): string {
        return `(\\${
            this.subfs().map((subf) => subf.toTex()).join(this.connectiveTex)
        })`;
    }


    abstract isTrue(v: Map<string, boolean>): boolean;
    abstract atoms(): Set<PredicateAtom>;
    abstract constants(): Set<string>;
    abstract predicates(): Set<string>;
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
        const argsStr = this.args.map(arg => arg.toString()).join(',');
        return `\\${this.predName}(${argsStr})`;
    }

    isTrue(m: Map<string, boolean>): boolean {
        // ...
        return false;
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
        return `-${this.original.toString()}`;
    }

    public toTex(): string {
        return `\\neg (${this.original.toTex()})`;
    }

    public isTrue(m: Map<string, boolean>): boolean {
        return !this.original.isTrue(m);
    }

    public atoms(): Set<PredicateAtom> {
        return this.original.atoms();
    }

    public constants(): Set<string> {
        return this.original.constants();
    }

    public predicates(): Set<string> {
        return this.original.predicates();
    }
}


class Conjunction extends Formula {
    private conjuncts: Formula[];

    constructor(conjuncts: Formula[]) {
        super('&', ' \\land ');
        this.conjuncts = conjuncts;
    }

    public subfs(): Formula[] {
        return this.conjuncts;
    }

    /*
    public toTex(): string {
        let sb = '(';
        let first = true;

        for (const form of this.conjuncts) {
            if (!first) {
                sb += ' \\land ';
            }
            sb += form.toTex();
            first = false;
        }

        sb += ')';
        return sb;
    }*/

    public isTrue(v: Map<string, boolean>): boolean {
        for (const form of this.conjuncts) {
            if (!form.isTrue(v)) {
                return false;
            }
        }
        return true;
    }

    public atoms(): Set<PredicateAtom> {
        const atoms = new Set<PredicateAtom>();

        for (const form of this.conjuncts) {
            form.atoms().forEach(atom => atoms.add(atom));
        }

        return atoms;
    }

    public constants(): Set<string> {
        const consts = new Set<string>();

        for (const form of this.conjuncts) {
            form.constants().forEach(constant => consts.add(constant));
        }

        return consts;
    }

    public predicates(): Set<string> {
        const preds = new Set<string>();

        for (const form of this.conjuncts) {
            form.predicates().forEach(predicate => preds.add(predicate));
        }

        return preds;
    }
}

class Disjunction extends Formula {
    private disjuncts: Formula[];

    constructor(disjuncts: Formula[]) {
        super('|', ' \\lor ');
        this.disjuncts = disjuncts;
    }

    public subfs(): Formula[] {
        return this.disjuncts;
    }

    /*
    public toTex(): string {
        let sb = '(';
        let first = true;

        for (const form of this.disjuncts) {
            if (!first) {
                sb += ' \\lor ';
            }
            sb += form.toTex();
            first = false;
        }

        sb += ')';
        return sb;
    }*/

    public isTrue(v: Map<string, boolean>): boolean {
        for (const form of this.disjuncts) {
            if (form.isTrue(v)) {
                return true;
            }
        }
        return false;
    }


    public atoms(): Set<PredicateAtom> {
        const atoms = new Set<PredicateAtom>();

        for (const form of this.disjuncts) {
            form.atoms().forEach(atom => atoms.add(atom));
        }

        return atoms;
    }

    public constants(): Set<string> {
        const consts = new Set<string>();

        for (const form of this.disjuncts) {
            form.constants().forEach(constant => consts.add(constant));
        }

        return consts;
    }

    public predicates(): Set<string> {
        const preds = new Set<string>();

        for (const form of this.disjuncts) {
            form.predicates().forEach(predicate => preds.add(predicate));
        }

        return preds;
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

    public atoms(): Set<PredicateAtom> {
        const atoms = new Set<PredicateAtom>();
        this.leftSide().atoms().forEach(atom => atoms.add(atom));
        this.rightSide().atoms().forEach(atom => atoms.add(atom));
        return atoms;
    }

    public constants(): Set<string> {
        const constants = new Set<string>();
        this.leftSide().constants().forEach(constant => constants.add(constant));
        this.rightSide().constants().forEach(constant => constants.add(constant));
        return constants;
    }

    public predicates(): Set<string> {
        const predicates = new Set<string>();
        this.leftSide().predicates().forEach(predicate => predicates.add(predicate));
        this.rightSide().predicates().forEach(predicate => predicates.add(predicate));
        return predicates;
    }
    /*
    toTex(): string {
        return `(${this.left.toTex()} ${this.operator} ${this.right.toTex()})`;
    }*/

    isTrue(v: Map<string, boolean>): boolean {
        return this.left.isTrue(v) && this.right.isTrue(v);
    }
}

class Implication extends BinaryFormula {
    constructor(left: Formula, right: Formula) {
        super(left, right, '->', ' \\rightarrow ');
    }
    /*
    toTex(): string {
        return `(${this.leftSide().toTex()} \\rightarrow ${this.rightSide().toTex()})`;
    }*/

    isTrue(v: Map<string, boolean>): boolean {
        return !this.leftSide().isTrue(v) || this.rightSide().isTrue(v);
    }
}

class Equivalence extends BinaryFormula {
    constructor(left: Formula, right: Formula) {
        super(left, right, '<->', ' \\leftrightarrow ');
    }
   /* font ktory vyzera zle nechceme ^^ vo workbooku je zadefinovany \\sym pre predikaty (rozbalime definiciu \\sym)
   \text{\textsf{…}}
    \text{\textsf{triangle}}
    \text{\textsf{A}}
    `\\text{\\textsf{${this.name}}}`

    toTex(): string {
        return `(${this.leftSide().toTex()} \\leftrightarrow ${this.rightSide().toTex()})`; 
    }*/

    isTrue(v: Map<string, boolean>): boolean {
        return this.leftSide().isTrue(v) === this.rightSide().isTrue(v);
    }
}

export { Constant, Formula, PredicateAtom, Negation, Conjunction, Disjunction, BinaryFormula, Implication, Equivalence };