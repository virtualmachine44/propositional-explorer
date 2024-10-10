/*
class Formula {
    subfs() {
        throw new Error("Not implemented");
    }

    toString() {
        throw new Error("Not implemented");
    }

    toTeX() {
        throw new Error("Not implemented");
    }

    isTrue(v: Map<string, boolean>): any { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
        throw new Error("Not implemented");
    }
}


class AtomicFormula extends Formula {
    constructor() {
        super();
        // throw new Error("Not implemented");
    }

    subfs(): Formula[] {
        return [];
    }

    deg(): number {
        return 0;
    }
}

class Constant {
    name(): string {
        // Implementation of name method
        return "";
    }

    eval(m: Structure): string {
        // Implementation of eval method
        return "";
    }
}

class Structure {
    iP(name: string): Set<string[]> {
        // Implementation of iP method
        return new Set<string[]>();
    }
}

class PredicateAtom extends AtomicFormula {
    name: string;
    args: Constant[];

    constructor(name: string, args: Constant[]) {
        super();
        this.name = name;
        this.args = [...args];
    }

    getName(): string {
        return this.name;
    }

    getArguments(): Constant[] {
        return this.args;
    }

    toString(): string {
        let sb = `${this.name}(`;
        sb += this.args.map(arg => arg.name()).join(',');
        sb += ')';
        return sb;
    }

    constants(): Set<string> {
        const set = new Set<string>();
        for (const arg of this.args) {
            set.add(arg.name());
        }
        return set;
    }

    predicates(): Set<string> {
        const set = new Set<string>();
        set.add(this.name);
        return set;
    }

    atoms(): Set<AtomicFormula> {
        const atomicFormulas = new Set<AtomicFormula>();
        atomicFormulas.add(this);
        return atomicFormulas;
    }

    isTrue(v: Map<string, boolean>): any {
        const m = v as Structure; // Cast the Map to Structure type
        const argValues = this.args.map(arg => arg.eval(m));
        return m.iP(this.name).has(argValues);
    }
}

class Disjunction extends Formula {
    disjuncts: Formula[];

    constructor(disjuncts: Formula[]) {
        super();
        this.disjuncts = disjuncts;
    }

    subfs(): Formula[] {
        return this.disjuncts;
    }

    toString(): string {
        let sb = '(';
        let first = true;

        for (const form of this.disjuncts) {
            sb += form.toString();
            if (first && this.disjuncts.length > 1) {
                sb += '|';
                first = false;
            }
        }

        sb += ')';
        return sb;
    }

    isTrue(v: Map<string, boolean>): boolean {
        for (const form of this.disjuncts) {
            if (form.isTrue(v)) {
                return true;
            }
        }
        return false;
    }


    deg(): number {
        let max = 1;

        for (const disjunct of this.disjuncts) {
            max += disjunct.deg();
        }

        if (this.disjuncts.length > 1) {
            max += this.disjuncts.length - 2;
        }

        return max;
    }

    atoms(): Set<AtomicFormula> {
        const atoms = new Set<AtomicFormula>();

        for (const form of this.disjuncts) {
            for (const atom of form.atoms()) {
                atoms.add(atom);
            }
        }

        return atoms;
    }

    constants(): Set<string> {
        const consts = new Set<string>();

        for (const form of this.disjuncts) {
            for (const constant of form.constants()) {
                consts.add(constant);
            }
        }

        return consts;
    }

    predicates(): Set<string> {
        const preds = new Set<string>();

        for (const form of this.disjuncts) {
            for (const predicate of form.predicates()) {
                preds.add(predicate);
            }
        }

        return preds;
    }

    export {};
} */

    export {};