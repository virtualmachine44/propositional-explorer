/*
Library

1. Define functions/classes in a JS file.
2. Export functions/classes using export.
Iba triedy
Typescript


3. Create a package.json file to distribute your library via npm.
4. Should I publish your library to npm? (i guess not needed)
5. Import and use library in other projects.

*/

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

    isTrue(Map<string,boolean> v) { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
        throw new Error("Not implemented");
    }

    // equals(other) {
    //     if (this === other) {
    //         return true;
    //     }
    //     if (other === null || this.constructor !== other.constructor) {
    //         return false;
    //     }
    //     return this.toString() === other.toString();
    // }

    // deg() {
    //     throw new Error("Not implemented");
    // }

    atoms(): Set<string> {
        throw new Error("Not implemented");
    }

    // constants() {
    //     throw new Error("Not implemented");
    // }

    // predicates() {
    //     throw new Error("Not implemented");
    // }

    // hashCode() {
    //     return this.toString().hashCode();
    // }
}

class Negation extends Formula {
    constructor(originalFormula) {
        super();
        this.original = originalFormula;
    }

    originalFormula() {
        return this.original;
    }

    subfs() {
        return [this.original];
    }

    toString() {
        return `-${this.original}`;
    }

    isTrue(m) {
        return !this.original.isTrue(m);
    }

    equals(other) {
        if (this === other) {
            return true;
        }

        if (!(other instanceof Negation) || this.subfs().length !== other.subfs().length) {
            return false;
        }

        const thisSubfs = this.subfs();
        const otherSubfs = other.subfs();

        for (let thisSubf of thisSubfs) {
            let found = false;
            for (let otherSubf of otherSubfs) {
                if (thisSubf.toString() === otherSubf.toString()) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return false;
            }
        }

        return true;
    }

    deg() {
        return this.original.deg() + 1;
    }

    atoms() {
        return this.original.atoms();
    }

    constants() {
        return this.original.constants();
    }

    predicates() {
        return this.original.predicates();
    }
} */