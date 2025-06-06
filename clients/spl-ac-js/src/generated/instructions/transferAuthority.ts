/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  mapSerializer,
  publicKey as publicKeySerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type TransferAuthorityInstructionAccounts = {
  merkleTree: PublicKey | Pda;
  /**
   * Authority that controls write-access to the tree
   * Typically a program, e.g., the Bubblegum contract validates that leaves are valid NFTs.
   */

  authority?: Signer;
};

// Data.
export type TransferAuthorityInstructionData = {
  discriminator: Array<number>;
  newAuthority: PublicKey;
};

export type TransferAuthorityInstructionDataArgs = { newAuthority: PublicKey };

export function getTransferAuthorityInstructionDataSerializer(): Serializer<
  TransferAuthorityInstructionDataArgs,
  TransferAuthorityInstructionData
> {
  return mapSerializer<
    TransferAuthorityInstructionDataArgs,
    any,
    TransferAuthorityInstructionData
  >(
    struct<TransferAuthorityInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['newAuthority', publicKeySerializer()],
      ],
      { description: 'TransferAuthorityInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [48, 169, 76, 72, 229, 180, 55, 161],
    })
  ) as Serializer<
    TransferAuthorityInstructionDataArgs,
    TransferAuthorityInstructionData
  >;
}

// Args.
export type TransferAuthorityInstructionArgs =
  TransferAuthorityInstructionDataArgs;

// Instruction.
export function transferAuthority(
  context: Pick<Context, 'identity' | 'programs'>,
  input: TransferAuthorityInstructionAccounts & TransferAuthorityInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'splAccountCompression',
    'cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    merkleTree: { index: 0, isWritable: true, value: input.merkleTree ?? null },
    authority: { index: 1, isWritable: false, value: input.authority ?? null },
  };

  // Arguments.
  const resolvedArgs: TransferAuthorityInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getTransferAuthorityInstructionDataSerializer().serialize(
    resolvedArgs as TransferAuthorityInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
