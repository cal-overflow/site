---
id: 5
title: The Basics of Bitcoins and Blockchains
slug: the-basics-of-bitcoins-and-blockchains
date: April 2023
img: 'feature-images/IMG_0153.png'
tags:
  - Economics
  - Finance
  - Technology
---


I just wanted to learn about Bitcoin and Blockchain. Instead, I got an entire econ lecture. I can't complain, though.

<!--more-->

Here are my notes. I only wrote down the big-picture stuff.

## Notes

### Basics
#### Blockchains
Replicated databases that act as the ultimate books and records--the 'golden source' that represents the universal understanding of the current status of all units of the digital asset.

#### Currencies
- Barter (basic trading of items)
- Commodity money (money is a valuable thing, such as grain)
- Representative money (money is a claim on the valuable thing)
- Fiat currency (money is completely separate from any valuable thing) (what we use currently)

#### The three functions of money
1. **Medium of exchange** means it is a payment mechanism. Must be widely accepted.
1. **Store of value** means that money will (in the near term) be worth relatively the same quantitative value.
1. **Unit of account** means it can be used as a quantitative value assessment (scale) for services/goods.


### Value
Value is incredibly difficult to define. However, it can be separated into two categories.

#### Intrinsic Value
Something is intrinsically valuable if it provides a sense of immediate utility (value). A simple example is a loaf of bread. A loaf of bread can be consumed and therefore has utility.

#### Extrinsic Value
Something is extrinsically valuable if its value is not Intrinsic. For example, a US Dollar does not inherent immediate utility. Instead, it is extrinsically valuable because it can be traded for something of (intrinsic) value.

#### Cryptocurrency & Value
A common argument against Cryptocurrency is that it cannot be "intrinsically" valuable. However, the USD, or even the gold "Standard" is not intrinsically valuable, either.

### Money
#### Legal Tender
The state of a currency when it is legally accepted as a means of payment for merchants and can be used to pay taxes.

#### Quantitative Easing (QE)
Pertaining to fiat currencies. Often referred to as "Printing money." \
A central bank authority buys assets, usually bonds, from commercial banks in a secondary market.

Central banks increase the amount of money by buying assets, and they do have the ability to remove money by selling assets (although, this rarely happens far less).

### Cryptography
#### Plaintext
Human messages (i.e., an English sentence). *Plaintext* is Easily interpretable.

#### Cyphertext
Text that cannot be read until it has been converted into *plaintext*.

#### Encryption
The process of converting *plaintext* into *cyphertext*.

#### Decryption
The process of turning *cyphertext* into *plaintext*.

#### Symmetric Cryptography
Cryptography that leverages a single, shared "secret" key for both encrypting and decrypting messages.

<small>

Uses the same key for both encrypting and decrypting. \
This is not secure because it will require the same "secret" key to be shared between sender & receiver.
</small>

#### Asymmetric Cryptography
Also known as **Public Key Cryptography**. \
Cryptography that leverages two keys, a *public* and a *private* key.

The *public* key that is used to encrypt messages is not the same as the *private* key used to decrypt messages.

#### Key Pair
A key pair is a *public* and a *private* key that are mathematically linked. \
The *public* key can be shared with the world, as it is used for encrypting messages. The *private* key should be kept secret, as it is used for decrypting messages.

#### Hash
Hashing is used to generate a digital "fingerprint" for a set of data. \
The data can be anything from a single file to an entire hard drive.

A hash function is sufficient if it achieves the following:
1. Deterministic (same input always results in same output)
1. Quick to compute hash for any message
1. Impossible to find message by reversing hash (without entering original input and finding a match)
1. A small change to the input will result in drastically different hash (similar inputs result completely different output)
1. Each input has a unique output (no "hash clash")

<small>

Industry standard hash functions: **MD5**, **SHA-256**
</small>

#### Digital Signatures
A signature that is mathematically linked to the content signed and a *private* key. \
Digital signatures are far more secure than a traditional signature because the signature must be linked to the content being signed.

Essentially:
```text
Message + Private Key -> Digital signature

Message + Digital signature + Public Key -> Valid/Invalid
```

### Cryptocurrencies
#### addresses
Instead of having a username, many cryptocurrency systems use *addresses*. An *address* is simply a value mathematically derived from a public key.

### Mining
#### ASIC
Application Specific Integrated Chips \
Chips built purely for specific application use. ASICs cannot operate as general-purpose computers.

---

## Quotes
#### Bitcoin
> Bitcoin *protocols* are written out as Bitcoin *code* which is run as Bitcoin *software* which creates Bitcoin *transactions* containing data about Bitcoin *coins* recorded on Bitcoin's *blockchain*. Got it? Good.

> Bitcoin is the very first digital asset of value that can be transferred over the internet without any specific third party having to approve the transaction or be able to deny it.

### Money
#### Is Today's Money Good Money?
> According to the St Louis Fed, the purchasing power of the USD from a consumer's perspective has fallen by over 96% since the Federal Reserve System was created in 1913.

> The debasement of all forms of money that is not commodity money seems to be a common theme in the history of money.

> In terms of the 'store of value' function of money, it is more the short-term predictability of value, or spending power, that is relevant: I need to know that a dollar tomorrow or next month can buy me more or less the same thing as a dollar today and will settle immediate debts. But for long term preservation of value, perhaps housing or land or other assets may be more reliable.

> Stability is determined more by the *liquidity* of a market (how many people are willing to buy and sell at any price point), than the *price* of an asset.

> Pegs always eventually break.

#### QE
> There are two worries with QE:
> 1. With excessive QE, the value of money will go down as there is more of it sloshing around in the private sector, which is not great for savers, and could also cause price inflation (though we haven't seen this yet).
> 2. A central bank owns risky financial assets that could go down in value, damaging the central bank's balance sheet when the value of the assets it owns fails.

#### Moving markets
> All it takes to move markets is for people to believe stories.

### Cryptography
#### Regarding real and digital signatures
> Your wet-ink-on-paper signature is your signature and doesn't change based on the item being signed: when you sign a cheque, a letter, or a document, *the whole point* is that your signature looks the same. This is easy for other people to copy! This is really terrible security! \
> In contrast, a digital signature is only valid for that *exact* piece of data, and so it cannot be copied and pasted underneath another piece of data, not can someone else re-use it for their own purposes. Any tampering with the message will result in the signature being invalidated. The digital signature is a one-time 'proof' that the person with the private key really did approve that exact message. No one else in the world can create that digital signature except you, unless they have your private key.

> In a blockchain system, where there is deliberately no organisation to provide or maintain accounts for you, your digital signatures are the critical piece of evidence that entitle you to make transactions.


### Cryptocurrency

> Because there is no central server that can be controlled, peer-to-peer networks are more robust and resistant to shutdown, whether accidental or deliberate.

#### Bitcoin
> You can't make a bitcoin transaction *off* the chain, because the very definition of a Bitcoin transaction is that it is recorded *on* the chain.

#### Bitcoin mining
Bitcoin miners cannot create bitcoins out of thin air,
> because no other miners or bookkeepers would accept this transaction.

> Honest miners might agree not to build on blocks generated by a malicious miner.

> In theory, transaction fees collected per block is meant to compensate for the decrease in block reward as the network gets more popular over time. The reality is that this doesn't seem to be working out.

> Without significant increase in transaction fees to compensate, clearly the economics of Bitcoin mining will change.

> Bitcoin mining uses this concept of forcing someone to do some work, and proving they have done it, before allowing them access to a resource.

#### Decentralization
> The evident shows that decentralised protocols are more resilient to being shut down than services with a central point of control or failure. I expect the trend of decentralisation to continue in the future, driven in part by concerns that authorities are overextending their reach into private social matters.

#### Blockchain
> Blockchains are not themselves a new invention, but instead, they put together existing technologies to create new capabilities.

> With distributed ledgers or blockchains [...] participants do not need to trust each other. They do not work on the assumption that the other participants are behaving honestly, so each participant individually checks everything.

> After all, a blockchain is a database with some additional features.

