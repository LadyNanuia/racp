import * as zod from "zod";

export const rpcFile = zod.object({
  name: zod.string(),
  data: zod.array(zod.number()), // Uint8Array
});

// A normalized file type since node and browser have different types for files
export type RpcFile = zod.infer<typeof rpcFile>;

export async function fromBrowserFile(file: File): Promise<RpcFile> {
  return {
    name: file.name,
    data: Array.from(new Uint8Array(await file.arrayBuffer())),
  };
}

export function toBrowserFile(file: RpcFile): File {
  return new File([new Uint8Array(file.data).buffer], file.name);
}