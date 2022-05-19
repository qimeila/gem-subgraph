import { BigInt,log ,Address} from "@graphprotocol/graph-ts"
import { BatchBuyWithETHCall,BatchBuyWithERC20sCall,BatchBuyFromOpenSeaCall } from "../generated/gemswapv1/gemswapv1"
import { OrdersMatched } from "../generated/singlecheckoutv1/wyvernv1"

import { BuyEntity} from "../generated/schema"



export function handlebatchBuyWithETH(call: BatchBuyWithETHCall): void {
  log.info(call.transaction.hash.toHexString()+" "+"BatchBuyWithETHCall",[]);
  let buyEntity = BuyEntity.load(call.transaction.hash.toHex())
  if (!buyEntity) {
    buyEntity = new BuyEntity(call.transaction.hash.toHex())
    buyEntity.blockNumber=call.block.number
  }
  buyEntity.blockNumber=call.block.number
  buyEntity.save()
}

export function handlebatchBuyWithERC20s(call: BatchBuyWithERC20sCall): void {
  log.info(call.transaction.hash.toHexString()+" "+"BatchBuyWithERC20sCall",[]);
  let buyEntity = BuyEntity.load(call.transaction.hash.toHex())
  if (!buyEntity) {
    buyEntity = new BuyEntity(call.transaction.hash.toHex())
    buyEntity.blockNumber=call.block.number
  }
  buyEntity.blockNumber=call.block.number
  buyEntity.save()
}


export function handleBatchBuyFromOpenSeaCall(call: BatchBuyFromOpenSeaCall): void {
  log.info(call.transaction.hash.toHexString()+" "+"BatchBuyFromOpenSeaCall",[]);
  let buyEntity = BuyEntity.load(call.transaction.hash.toHex())
  if (!buyEntity) {
    buyEntity = new BuyEntity(call.transaction.hash.toHex())
    buyEntity.blockNumber=call.block.number
  }
  buyEntity.blockNumber=call.block.number
  buyEntity.save()
}

export function handleOrdersMatched(event: OrdersMatched): void {
  log.info('singlecheoutv1---'+event.params.taker.toHexString(),[]);
  if(event.params.taker==Address.fromString("0x0000000031f7382a812c64b604da4fc520afef4b")){
    let buyEntity = BuyEntity.load(event.transaction.hash.toHex())
    if (!buyEntity) {
      buyEntity = new BuyEntity(event.transaction.hash.toHex())
      buyEntity.blockNumber=event.block.number
    }
    buyEntity.blockNumber=event.block.number
    buyEntity.save()
  }
}

export function handleOrdersMatchedwyvernv2(event: OrdersMatched): void {
  log.info('singlecheoutv2---'+event.params.taker.toHexString(),[]);
  if(event.params.taker==Address.fromString("0x0000000035634b55f3d99b071b5a354f48e10bef")){
    let buyEntity = BuyEntity.load(event.transaction.hash.toHex())
    if (!buyEntity) {
      buyEntity = new BuyEntity(event.transaction.hash.toHex())
      buyEntity.blockNumber=event.block.number
    }
    buyEntity.blockNumber=event.block.number
    buyEntity.save()
  }
  if(event.params.taker==Address.fromString("0x00000000a50bb64b4bbeceb18715748dface08af")){
    let buyEntity = BuyEntity.load(event.transaction.hash.toHex())
    if (!buyEntity) {
      buyEntity = new BuyEntity(event.transaction.hash.toHex())
      buyEntity.blockNumber=event.block.number
    }
    buyEntity.blockNumber=event.block.number
    buyEntity.save()
  }
}
