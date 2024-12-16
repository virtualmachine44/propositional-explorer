import { Constant, Formula, PredicateAtom, Negation, Conjunction, Disjunction, Implication, Equivalence } from './Formula';
import { SymbolWithArity, Language, FormulaFactories, SyntaxError } from '@fmfi-uk-1-ain-412/js-fol-parser';

export interface LanguageAndFactories {
  language: Language,
  factories: FormulaFactories<Constant, Formula>
}

const arityMap = (predicateSymbols: SymbolWithArity[]): Map<string, number> =>
  new Map(predicateSymbols.map((p) => [p.name, p.arity]));

export function makeLanguageAndFactories(parsedConstants: string[], parsedPredicates: SymbolWithArity[]): LanguageAndFactories {
  const constants = new Set(parsedConstants);
  const predicates = arityMap(parsedPredicates);

  const language: Language = {
    isConstant: (symbol: string) => constants.has(symbol),
    isPredicate: (symbol: string) => predicates.has(symbol),
    isFunction: (_symbol: string) => false,
    isVariable: (_symbol: string) => false,
  };

  function checkArity(symbol: string, args: string[], arityMap: Map<string, number>, expected: (message: string) => void) {
    const a = arityMap.get(symbol);
    if (args.length !== a) {
      expected(`${a} argument${a === 1 ? '' : 's'} to ${symbol}`);
    }
  }

  const factories: FormulaFactories<Constant, Formula> = {
    variable: (_symbol: string, {error}) => {
      error("Variables are not supported.");
      return new Constant("#variable-error"); 
    },
    constant: (symbol: string, _) => new Constant(symbol),
    functionApplication: (_funSymbol: string, _args: Array<Constant>, { error }) => {
      error("Function applications are not supported.");
      return new Constant("#function-application-error"); 
    },
    predicateAtom: (symbol: string, args: Array<Constant>, { error }) => {
      checkArity(symbol, args.map(arg => arg.toString()), predicates, error);
      return new PredicateAtom(symbol, args);
    },
    equalityAtom: (lhs: Constant, rhs: Constant, { error }) => {
      error("Equality is not supported.");
      return new PredicateAtom("#equalityAtom-error", [lhs, rhs]);
    },
    negation: (subf: Formula, _) => new Negation(subf),
    conjunction: (lhs: Formula, rhs: Formula, _) => new Conjunction([lhs, rhs]),
    disjunction: (lhs: Formula, rhs: Formula, _) => new Disjunction([lhs, rhs]),
    implication: (lhs: Formula, rhs: Formula, _) => new Implication(lhs, rhs),
    equivalence: (lhs: Formula, rhs: Formula, _) => new Equivalence(lhs, rhs),
    existentialQuant: (variable: string, subf: Formula, { error }) => {
      error("Quantifiers are not supported.");
      return new PredicateAtom("#quantifier-error", []);
    },
    universalQuant: (variable: string, subf: Formula, { error }) => {
      error("Quantifiers are not supported.");
      return new PredicateAtom("#quantifier-error", []);
    }
  };

  return { language, factories };
}