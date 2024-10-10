class BaseFormula {
    subfs(): void {
        throw new Error("Not implemented");
    }

    toString(): string {
        throw new Error("Not implemented");
    }

    toTeX(): void {
        throw new Error("Not implemented");
    }

    isTrue(v: Map<string, boolean>): boolean {
        throw new Error("Not implemented");
    }

    atoms(): Set<string> {
        throw new Error("Not implemented");
    }
}

export class Formula extends BaseFormula {
    private formula: string;
    private truthValue: boolean | null;

    constructor(formula: string) {
        super();
        this.formula = formula;
        this.truthValue = null;
    }

    override subfs(): void {
        // Implement the method if needed
    }

    override toString(): string {
        return this.formula;
    }

    override toTeX(): void {
        // Implement the method if needed
    }

    override isTrue(v: Map<string, boolean>): boolean {
        // Implement the method if needed
        throw new Error("Not implemented");
    }

    override atoms(): Set<string> {
        const atomPattern = /¬?[A-Z]\([A-Z]\)/g;
        const matches = this.formula.match(atomPattern) || [];
        return new Set(matches);
    }

    setTruthValue(value: string): void {
        if (value === "0/1") {
            this.truthValue = null;
        } else if (value === "0") {
            this.truthValue = false;
        } else if (value === "1") {
            this.truthValue = true;
        } else {
            throw new Error("Invalid truth value");
        }
    }

    isTrueValue(): boolean | null {
        return this.truthValue;
    }
}