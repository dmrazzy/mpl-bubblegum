/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Account,
  Context,
  Pda,
  PublicKey,
  RpcAccount,
  RpcGetAccountOptions,
  RpcGetAccountsOptions,
  assertAccountExists,
  deserializeAccount,
  gpaBuilder,
  publicKey as toPublicKey,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  bool,
  mapSerializer,
  publicKey as publicKeySerializer,
  struct,
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  DecompressibleState,
  DecompressibleStateArgs,
  Version,
  VersionArgs,
  getDecompressibleStateSerializer,
  getVersionSerializer,
} from '../types';

export type TreeConfig = Account<TreeConfigAccountData>;

export type TreeConfigAccountData = {
  discriminator: Array<number>;
  treeCreator: PublicKey;
  treeDelegate: PublicKey;
  totalMintCapacity: bigint;
  numMinted: bigint;
  isPublic: boolean;
  isDecompressible: DecompressibleState;
  version: Version;
};

export type TreeConfigAccountDataArgs = {
  treeCreator: PublicKey;
  treeDelegate: PublicKey;
  totalMintCapacity: number | bigint;
  numMinted: number | bigint;
  isPublic: boolean;
  isDecompressible: DecompressibleStateArgs;
  version: VersionArgs;
};

export function getTreeConfigAccountDataSerializer(): Serializer<
  TreeConfigAccountDataArgs,
  TreeConfigAccountData
> {
  return mapSerializer<TreeConfigAccountDataArgs, any, TreeConfigAccountData>(
    struct<TreeConfigAccountData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['treeCreator', publicKeySerializer()],
        ['treeDelegate', publicKeySerializer()],
        ['totalMintCapacity', u64()],
        ['numMinted', u64()],
        ['isPublic', bool()],
        ['isDecompressible', getDecompressibleStateSerializer()],
        ['version', getVersionSerializer()],
      ],
      { description: 'TreeConfigAccountData' }
    ),
    (value) => ({
      ...value,
      discriminator: [122, 245, 175, 248, 171, 34, 0, 207],
    })
  ) as Serializer<TreeConfigAccountDataArgs, TreeConfigAccountData>;
}

export function deserializeTreeConfig(rawAccount: RpcAccount): TreeConfig {
  return deserializeAccount(rawAccount, getTreeConfigAccountDataSerializer());
}

export async function fetchTreeConfig(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<TreeConfig> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  assertAccountExists(maybeAccount, 'TreeConfig');
  return deserializeTreeConfig(maybeAccount);
}

export async function safeFetchTreeConfig(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<TreeConfig | null> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  return maybeAccount.exists ? deserializeTreeConfig(maybeAccount) : null;
}

export async function fetchAllTreeConfig(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<TreeConfig[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'TreeConfig');
    return deserializeTreeConfig(maybeAccount);
  });
}

export async function safeFetchAllTreeConfig(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<TreeConfig[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) => deserializeTreeConfig(maybeAccount as RpcAccount));
}

export function getTreeConfigGpaBuilder(
  context: Pick<Context, 'rpc' | 'programs'>
) {
  const programId = context.programs.getPublicKey(
    'mplBubblegum',
    'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY'
  );
  return gpaBuilder(context, programId)
    .registerFields<{
      discriminator: Array<number>;
      treeCreator: PublicKey;
      treeDelegate: PublicKey;
      totalMintCapacity: number | bigint;
      numMinted: number | bigint;
      isPublic: boolean;
      isDecompressible: DecompressibleStateArgs;
      version: VersionArgs;
    }>({
      discriminator: [0, array(u8(), { size: 8 })],
      treeCreator: [8, publicKeySerializer()],
      treeDelegate: [40, publicKeySerializer()],
      totalMintCapacity: [72, u64()],
      numMinted: [80, u64()],
      isPublic: [88, bool()],
      isDecompressible: [89, getDecompressibleStateSerializer()],
      version: [90, getVersionSerializer()],
    })
    .deserializeUsing<TreeConfig>((account) => deserializeTreeConfig(account))
    .whereField('discriminator', [122, 245, 175, 248, 171, 34, 0, 207]);
}

export function getTreeConfigSize(): number {
  return 96;
}

export function findTreeConfigPda(
  context: Pick<Context, 'eddsa' | 'programs'>,
  seeds: {
    merkleTree: PublicKey;
  }
): Pda {
  const programId = context.programs.getPublicKey(
    'mplBubblegum',
    'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY'
  );
  return context.eddsa.findPda(programId, [
    publicKeySerializer().serialize(seeds.merkleTree),
  ]);
}

export async function fetchTreeConfigFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findTreeConfigPda>[1],
  options?: RpcGetAccountOptions
): Promise<TreeConfig> {
  return fetchTreeConfig(context, findTreeConfigPda(context, seeds), options);
}

export async function safeFetchTreeConfigFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findTreeConfigPda>[1],
  options?: RpcGetAccountOptions
): Promise<TreeConfig | null> {
  return safeFetchTreeConfig(
    context,
    findTreeConfigPda(context, seeds),
    options
  );
}
