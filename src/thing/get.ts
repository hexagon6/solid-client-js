import { Quad_Object, Quad, NamedNode, Literal } from "rdf-js";
import { Thing, Iri, IriString } from "../index";
import {
  asNamedNode,
  isNamedNode,
  isLiteral,
  deserializeBoolean,
  deserializeDatetime,
  deserializeDecimal,
  deserializeInteger,
  xmlSchemaTypes,
  XmlSchemaTypeIri,
} from "../datatypes";

/**
 * @param thing The [[Thing]] to read an IRI value from.
 * @param predicate The given Predicate for which you want the IRI value.
 * @returns An IRI value for the given Predicate, if present, or null otherwise.
 */
export function getIriOne(
  thing: Thing,
  predicate: Iri | IriString
): IriString | null {
  const namedNodeMatcher = getNamedNodeMatcher(predicate);

  const matchingQuad = findOne(thing, namedNodeMatcher);

  if (matchingQuad === null) {
    return null;
  }

  return matchingQuad.object.value;
}

/**
 * @param thing The [[Thing]] to read the IRI values from.
 * @param predicate The given Predicate for which you want the IRI values.
 * @returns The IRI values for the given Predicate.
 */
export function getIriAll(
  thing: Thing,
  predicate: Iri | IriString
): IriString[] {
  const iriMatcher = getNamedNodeMatcher(predicate);

  const matchingQuads = findAll(thing, iriMatcher);

  return matchingQuads.map((quad) => quad.object.value);
}

/**
 * @param thing The [[Thing]] to read a boolean value from.
 * @param predicate The given Predicate for which you want the boolean value.
 * @returns A boolean value for the given Predicate, if present, or null otherwise.
 */
export function getBooleanOne(
  thing: Thing,
  predicate: Iri | IriString
): boolean | null {
  const literalString = getLiteralOneOfType(
    thing,
    predicate,
    xmlSchemaTypes.boolean
  );

  if (literalString === null) {
    return null;
  }

  return deserializeBoolean(literalString);
}

/**
 * @param thing The [[Thing]] to read the boolean values from.
 * @param predicate The given Predicate for which you want the boolean values.
 * @returns The boolean values for the given Predicate.
 */
export function getBooleanAll(
  thing: Thing,
  predicate: Iri | IriString
): boolean[] {
  const literalStrings = getLiteralAllOfType(
    thing,
    predicate,
    xmlSchemaTypes.boolean
  );

  return literalStrings
    .map(deserializeBoolean)
    .filter((possibleBoolean) => possibleBoolean !== null) as boolean[];
}

/**
 * @param thing The [[Thing]] to read a datetime value from.
 * @param predicate The given Predicate for which you want the datetime value.
 * @returns A datetime value for the given Predicate, if present, or null otherwise.
 */
export function getDatetimeOne(
  thing: Thing,
  predicate: Iri | IriString
): Date | null {
  const literalString = getLiteralOneOfType(
    thing,
    predicate,
    xmlSchemaTypes.dateTime
  );

  if (literalString === null) {
    return null;
  }

  return deserializeDatetime(literalString);
}

/**
 * @param thing The [[Thing]] to read the datetime values from.
 * @param predicate The given Predicate for which you want the datetime values.
 * @returns The datetime values for the given Predicate.
 */
export function getDatetimeAll(
  thing: Thing,
  predicate: Iri | IriString
): Date[] {
  const literalStrings = getLiteralAllOfType(
    thing,
    predicate,
    xmlSchemaTypes.dateTime
  );

  return literalStrings
    .map(deserializeDatetime)
    .filter((potentialDatetime) => potentialDatetime !== null) as Date[];
}

/**
 * @param thing The [[Thing]] to read a decimal value from.
 * @param predicate The given Predicate for which you want the decimal value.
 * @returns A decimal value for the given Predicate, if present, or null otherwise.
 */
export function getDecimalOne(
  thing: Thing,
  predicate: Iri | IriString
): number | null {
  const literalString = getLiteralOneOfType(
    thing,
    predicate,
    xmlSchemaTypes.decimal
  );

  if (literalString === null) {
    return null;
  }

  return deserializeDecimal(literalString);
}

/**
 * @param thing The [[Thing]] to read the decimal values from.
 * @param predicate The given Predicate for which you want the decimal values.
 * @returns The decimal values for the given Predicate.
 */
export function getDecimalAll(
  thing: Thing,
  predicate: Iri | IriString
): number[] {
  const literalStrings = getLiteralAllOfType(
    thing,
    predicate,
    xmlSchemaTypes.decimal
  );

  return literalStrings
    .map((literalString) => deserializeDecimal(literalString))
    .filter((potentialDecimal) => potentialDecimal !== null) as number[];
}

/**
 * @param thing The [[Thing]] to read an integer value from.
 * @param predicate The given Predicate for which you want the integer value.
 * @returns An integer value for the given Predicate, if present, or null otherwise.
 */
export function getIntegerOne(
  thing: Thing,
  predicate: Iri | IriString
): number | null {
  const literalString = getLiteralOneOfType(
    thing,
    predicate,
    xmlSchemaTypes.integer
  );

  if (literalString === null) {
    return null;
  }

  return deserializeInteger(literalString);
}

/**
 * @param thing The [[Thing]] to read the integer values from.
 * @param predicate The given Predicate for which you want the integer values.
 * @returns The integer values for the given Predicate.
 */
export function getIntegerAll(
  thing: Thing,
  predicate: Iri | IriString
): number[] {
  const literalStrings = getLiteralAllOfType(
    thing,
    predicate,
    xmlSchemaTypes.integer
  );

  return literalStrings
    .map((literalString) => deserializeInteger(literalString))
    .filter((potentialInteger) => potentialInteger !== null) as number[];
}

/**
 * @param thing The [[Thing]] to read a localised string value from.
 * @param predicate The given Predicate for which you want the localised string value.
 * @param locale The desired locale for the string value.
 * @returns A localised string value for the given Predicate, if present in `locale`, or null otherwise.
 */
export function getStringInLocaleOne(
  thing: Thing,
  predicate: Iri | IriString,
  locale: string
): string | null {
  const localeStringMatcher = getLocaleStringMatcher(predicate, locale);

  const matchingQuad = findOne(thing, localeStringMatcher);

  if (matchingQuad === null) {
    return null;
  }

  return matchingQuad.object.value;
}

/**
 * @param thing The [[Thing]] to read the localised string values from.
 * @param predicate The given Predicate for which you want the localised string values.
 * @param locale The desired locale for the string values.
 * @returns The localised string values for the given Predicate.
 */
export function getStringInLocaleAll(
  thing: Thing,
  predicate: Iri | IriString,
  locale: string
): string[] {
  const localeStringMatcher = getLocaleStringMatcher(predicate, locale);

  const matchingQuads = findAll(thing, localeStringMatcher);

  return matchingQuads.map((quad) => quad.object.value);
}

/**
 * @param thing The [[Thing]] to read a string value from.
 * @param predicate The given Predicate for which you want the string value.
 * @returns A string value for the given Predicate, if present, or null otherwise.
 */
export function getStringUnlocalizedOne(
  thing: Thing,
  predicate: Iri | IriString
): string | null {
  const literalString = getLiteralOneOfType(
    thing,
    predicate,
    xmlSchemaTypes.string
  );

  return literalString;
}

/**
 * @param thing The [[Thing]] to read the string values from.
 * @param predicate The given Predicate for which you want the string values.
 * @returns The string values for the given Predicate.
 */
export function getStringUnlocalizedAll(
  thing: Thing,
  predicate: Iri | IriString
): string[] {
  const literalStrings = getLiteralAllOfType(
    thing,
    predicate,
    xmlSchemaTypes.string
  );

  return literalStrings;
}

/**
 * @param thing The [[Thing]] to read a NamedNode value from.
 * @param predicate The given Predicate for which you want the NamedNode value.
 * @returns A NamedNode value for the given Predicate, if present, or null otherwise.
 * @ignore This should not be needed due to the other get*One() functions. If you do find yourself needing it, please file a feature request for your use case.
 */
export function getNamedNodeOne(
  thing: Thing,
  predicate: Iri | IriString
): NamedNode | null {
  const namedNodeMatcher = getNamedNodeMatcher(predicate);

  const matchingQuad = findOne(thing, namedNodeMatcher);

  if (matchingQuad === null) {
    return null;
  }

  return matchingQuad.object;
}

/**
 * @param thing The [[Thing]] to read the NamedNode values from.
 * @param predicate The given Predicate for which you want the NamedNode values.
 * @returns The NamedNode values for the given Predicate.
 * @ignore This should not be needed due to the other get*One() functions. If you do find yourself needing it, please file a feature request for your use case.
 */
export function getNamedNodeAll(
  thing: Thing,
  predicate: Iri | IriString
): NamedNode[] {
  const namedNodeMatcher = getNamedNodeMatcher(predicate);

  const matchingQuads = findAll(thing, namedNodeMatcher);

  return matchingQuads.map((quad) => quad.object);
}

/**
 * @param thing The [[Thing]] to read a Literal value from.
 * @param predicate The given Predicate for which you want the Literal value.
 * @returns A Literal value for the given Predicate, if present, or null otherwise.
 * @ignore This should not be needed due to the other get*One() functions. If you do find yourself needing it, please file a feature request for your use case.
 */
export function getLiteralOne(
  thing: Thing,
  predicate: Iri | IriString
): Literal | null {
  const literalMatcher = getLiteralMatcher(predicate);

  const matchingQuad = findOne(thing, literalMatcher);

  if (matchingQuad === null) {
    return null;
  }

  return matchingQuad.object;
}

/**
 * @param thing The [[Thing]] to read the Literal values from.
 * @param predicate The given Predicate for which you want the Literal values.
 * @returns The Literal values for the given Predicate.
 * @ignore This should not be needed due to the other get*All() functions. If you do find yourself needing it, please file a feature request for your use case.
 */
export function getLiteralAll(
  thing: Thing,
  predicate: Iri | IriString
): Literal[] {
  const literalMatcher = getLiteralMatcher(predicate);

  const matchingQuads = findAll(thing, literalMatcher);

  return matchingQuads.map((quad) => quad.object);
}

type QuadWithObject<Object extends Quad_Object> = Quad & { object: Object };
type Matcher<Object extends Quad_Object> = (
  quad: Quad
) => quad is QuadWithObject<Object>;

/**
 * @param thing The [[Thing]] to extract a Quad from.
 * @param matcher Callback function that returns a boolean indicating whether a given Quad should be included.
 * @returns First Quad in `thing` for which `matcher` returned true.
 */
function findOne<Object extends Quad_Object>(
  thing: Thing,
  matcher: Matcher<Object>
): QuadWithObject<Object> | null {
  for (const quad of thing) {
    if (matcher(quad)) {
      return quad;
    }
  }
  return null;
}

/**
 * @param thing The [[Thing]] to extract Quads from.
 * @param matcher Callback function that returns a boolean indicating whether a given Quad should be included.
 * @returns All Quads in `thing` for which `matcher` returned true.
 */
function findAll<Object extends Quad_Object>(
  thing: Thing,
  matcher: Matcher<Object>
): QuadWithObject<Object>[] {
  const matched: QuadWithObject<Object>[] = [];
  for (const quad of thing) {
    if (matcher(quad)) {
      matched.push(quad);
    }
  }
  return matched;
}

function getNamedNodeMatcher(predicate: Iri | IriString): Matcher<NamedNode> {
  const predicateNode = asNamedNode(predicate);

  const matcher = function matcher(
    quad: Quad
  ): quad is QuadWithObject<NamedNode> {
    return predicateNode.equals(quad.predicate) && isNamedNode(quad.object);
  };
  return matcher;
}

function getLiteralMatcher(predicate: Iri | IriString): Matcher<Literal> {
  const predicateNode = asNamedNode(predicate);

  const matcher = function matcher(
    quad: Quad
  ): quad is QuadWithObject<Literal> {
    return predicateNode.equals(quad.predicate) && isLiteral(quad.object);
  };
  return matcher;
}

type LiteralOfType<Type extends XmlSchemaTypeIri> = Literal & {
  datatype: { value: Type };
};
function getLiteralOfTypeMatcher<Datatype extends XmlSchemaTypeIri>(
  predicate: Iri | IriString,
  datatype: Datatype
): Matcher<LiteralOfType<Datatype>> {
  const predicateNode = asNamedNode(predicate);

  const matcher = function matcher(
    quad: Quad
  ): quad is QuadWithObject<LiteralOfType<Datatype>> {
    return (
      predicateNode.equals(quad.predicate) &&
      isLiteral(quad.object) &&
      quad.object.datatype.value === datatype
    );
  };
  return matcher;
}

type LiteralLocaleString = Literal & {
  datatype: { value: typeof xmlSchemaTypes.langString };
  language: string;
};
function getLocaleStringMatcher(
  predicate: Iri | IriString,
  locale: string
): Matcher<LiteralLocaleString> {
  const predicateNode = asNamedNode(predicate);

  const matcher = function matcher(
    quad: Quad
  ): quad is QuadWithObject<LiteralLocaleString> {
    return (
      predicateNode.equals(quad.predicate) &&
      isLiteral(quad.object) &&
      quad.object.datatype.value === xmlSchemaTypes.langString &&
      quad.object.language.toLowerCase() === locale.toLowerCase()
    );
  };
  return matcher;
}

/**
 * @param thing The [Thing]] to read a Literal of the given type from.
 * @param predicate The given Predicate for which you want the Literal value.
 * @param literalType Set type of the Literal data.
 * @returns The stringified value for the given Predicate and type, if present, or null otherwise.
 */
function getLiteralOneOfType<Datatype extends XmlSchemaTypeIri>(
  thing: Thing,
  predicate: Iri | IriString,
  literalType: Datatype
): string | null {
  const literalOfTypeMatcher = getLiteralOfTypeMatcher(predicate, literalType);

  const matchingQuad = findOne(thing, literalOfTypeMatcher);

  if (matchingQuad === null) {
    return null;
  }

  return matchingQuad.object.value;
}

/**
 * @param thing The [Thing]] to read the Literals of the given type from.
 * @param predicate The given Predicate for which you want the Literal values.
 * @param literalType Set type of the Literal data.
 * @returns The stringified values for the given Predicate and type.
 */
function getLiteralAllOfType<Datatype extends XmlSchemaTypeIri>(
  thing: Thing,
  predicate: Iri | IriString,
  literalType: Datatype
): string[] {
  const literalOfTypeMatcher = getLiteralOfTypeMatcher(predicate, literalType);

  const matchingQuads = findAll(thing, literalOfTypeMatcher);

  return matchingQuads.map((quad) => quad.object.value);
}
