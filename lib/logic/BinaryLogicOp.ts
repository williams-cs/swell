import { AbstractBinaryOp } from "../binops/AbstractBinaryOp";
import { BooleanNode } from "../prims/BooleanNode";
import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';

export abstract class BinaryLogicOp<T> extends AbstractBinaryOp<T, T, BooleanNode> {}
