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
  struct,
  u32,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type PrepareBatchMerkleTreeInstructionAccounts = {
  merkleTree: PublicKey | Pda;
  /**
   * Authority that controls write-access to the tree
   * Typically a program, e.g., the Bubblegum contract validates that leaves are valid NFTs.
   */

  authority?: Signer;
  /** Program used to emit changelogs as cpi instruction data. */
  noop: PublicKey | Pda;
};

// Data.
export type PrepareBatchMerkleTreeInstructionData = {
  discriminator: Array<number>;
  maxDepth: number;
  maxBufferSize: number;
};

export type PrepareBatchMerkleTreeInstructionDataArgs = {
  maxDepth: number;
  maxBufferSize: number;
};

export function getPrepareBatchMerkleTreeInstructionDataSerializer(): Serializer<
  PrepareBatchMerkleTreeInstructionDataArgs,
  PrepareBatchMerkleTreeInstructionData
> {
  return mapSerializer<
    PrepareBatchMerkleTreeInstructionDataArgs,
    any,
    PrepareBatchMerkleTreeInstructionData
  >(
    struct<PrepareBatchMerkleTreeInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['maxDepth', u32()],
        ['maxBufferSize', u32()],
      ],
      { description: 'PrepareBatchMerkleTreeInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [230, 124, 120, 196, 249, 134, 199, 128],
    })
  ) as Serializer<
    PrepareBatchMerkleTreeInstructionDataArgs,
    PrepareBatchMerkleTreeInstructionData
  >;
}

// Args.
export type PrepareBatchMerkleTreeInstructionArgs =
  PrepareBatchMerkleTreeInstructionDataArgs;

// Instruction.
export function prepareBatchMerkleTree(
  context: Pick<Context, 'identity' | 'programs'>,
  input: PrepareBatchMerkleTreeInstructionAccounts &
    PrepareBatchMerkleTreeInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplAccountCompression',
    'mcmt6YrQEMKw8Mw43FmpRLmf7BqRnFMKmAcbxE3xkAW'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    merkleTree: { index: 0, isWritable: true, value: input.merkleTree ?? null },
    authority: { index: 1, isWritable: false, value: input.authority ?? null },
    noop: { index: 2, isWritable: false, value: input.noop ?? null },
  };

  // Arguments.
  const resolvedArgs: PrepareBatchMerkleTreeInstructionArgs = { ...input };

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
  const data = getPrepareBatchMerkleTreeInstructionDataSerializer().serialize(
    resolvedArgs as PrepareBatchMerkleTreeInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
