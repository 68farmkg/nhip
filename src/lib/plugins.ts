import type { BlockDef } from './blocks';

// Một plugin = một thư mục src/plugins/<tên>/index.ts có "export default { ... }".
// Hệ thống tự nhận: khối kéo thả của plugin xuất hiện trong trình dựng trang,
// và nếu có admin() thì tự thêm mục vào menu quản trị (đường dẫn /admin/p/<id>).
export type Plugin = {
  id: string; name: string; desc?: string; version?: string; icon?: string;
  blocks?: BlockDef[];
  admin?: (ctx: { db: any; env: any; url: URL; request: Request }) => string | Promise<string>;
};

const mods = import.meta.glob('../plugins/*/index.ts', { eager: true }) as Record<string, { default: Plugin }>;
export const PLUGINS: Plugin[] = Object.values(mods).map((m) => m.default).filter(Boolean);
