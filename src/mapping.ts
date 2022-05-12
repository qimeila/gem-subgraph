import { BigInt,log } from "@graphprotocol/graph-ts"
import { Contract, BatchBuyWithETHCall,BatchBuyWithERC20sCall,BatchBuyFromOpenSeaCall } from "../generated/Contract/Contract"
import { BuyEntity} from "../generated/schema"



export function handlebatchBuyWithETH(call: BatchBuyWithETHCall): void {
  log.info(call.transaction.hash.toHexString()+" "+"BatchBuyWithETHCall",[]);
  let buyEntity = BuyEntity.load(call.transaction.from.toHex())
  if (!buyEntity) {
    buyEntity = new BuyEntity(call.transaction.from.toHex())
    buyEntity.ethAmount=new BigInt(0)
    buyEntity.token=["0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"]
    buyEntity.tokenAmount=[new BigInt(0)]
  }
  buyEntity.ethAmount = call.transaction.value.plus(buyEntity.ethAmount)
  log.info(call.transaction.from.toHex()+" "+"ethAmount"+" "+buyEntity.ethAmount.toString(),[]);
  buyEntity.save()
}

export function handlebatchBuyWithERC20s(call: BatchBuyWithERC20sCall): void {
  log.info(call.transaction.hash.toHexString()+" "+"handlebatchBuyWithERC20s",[]);
  
  let buyEntity = BuyEntity.load(call.transaction.from.toHex())

  if (!buyEntity) {
    buyEntity = new BuyEntity(call.transaction.from.toHex())
    buyEntity.ethAmount=new BigInt(0)
    buyEntity.token=["0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"]
    buyEntity.tokenAmount=[new BigInt(0)]
  }
  buyEntity.ethAmount = call.transaction.value.plus(buyEntity.ethAmount)
  log.info(call.transaction.from.toHex()+" "+"ethAmount"+" "+buyEntity.ethAmount.toString(),[]);
  let getToken=false

  for(let i=0;i<call.inputs.erc20Details.tokenAddrs.length;i++){
    for(let j=0;j<buyEntity.token.length;j++){
      if(call.inputs.erc20Details.tokenAddrs[i].toHexString()==buyEntity.token[j]){
        let tokenAmout=buyEntity.tokenAmount
        tokenAmout[j]=tokenAmout[j].plus(call.inputs.erc20Details.amounts[i])
        buyEntity.tokenAmount=tokenAmout
        log.info(call.transaction.from.toHex()+" "+buyEntity.token[j]+" "+buyEntity.tokenAmount[j].toString(),[]);
        getToken=true
      }
    }
    if(getToken==false){
      let tokens=buyEntity.token
      let tokenAmouts=buyEntity.tokenAmount
      tokens.push(call.inputs.erc20Details.tokenAddrs[i].toHexString())
      tokenAmouts.push(call.inputs.erc20Details.amounts[i])
      buyEntity.token=tokens
      buyEntity.tokenAmount=tokenAmouts
      log.info(call.transaction.from.toHex()+" "+call.inputs.erc20Details.tokenAddrs[i].toHexString()+" "+call.inputs.erc20Details.amounts[i].toString(),[]);
    }
  }
  buyEntity.save()
}


export function handleBatchBuyFromOpenSeaCall(call: BatchBuyFromOpenSeaCall): void {
  log.info(call.transaction.hash.toHexString()+" "+"BatchBuyFromOpenSeaCall",[]);
  let buyEntity = BuyEntity.load(call.transaction.from.toHex())

  if (!buyEntity) {
    buyEntity = new BuyEntity(call.transaction.from.toHex())
    buyEntity.ethAmount=new BigInt(0)
    buyEntity.token=["0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"]
    buyEntity.tokenAmount=[new BigInt(0)]
  }
  buyEntity.ethAmount = call.transaction.value.plus(buyEntity.ethAmount)
  log.info(call.transaction.from.toHex()+" "+"ethAmount"+" "+buyEntity.ethAmount.toString(),[]);
  buyEntity.save()
}
