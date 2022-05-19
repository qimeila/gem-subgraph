// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class OrdersMatched extends ethereum.Event {
  get params(): OrdersMatched__Params {
    return new OrdersMatched__Params(this);
  }
}

export class OrdersMatched__Params {
  _event: OrdersMatched;

  constructor(event: OrdersMatched) {
    this._event = event;
  }

  get buyHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get sellHash(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get maker(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get taker(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get price(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get metadata(): Bytes {
    return this._event.parameters[5].value.toBytes();
  }
}

export class wyvernv1 extends ethereum.SmartContract {
  static bind(address: Address): wyvernv1 {
    return new wyvernv1("wyvernv1", address);
  }
}
