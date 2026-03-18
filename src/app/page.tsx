import { Client } from "@notionhq/client";
import ClientPage from "./ClientPage";

// Function to fetch blocks from Notion
async function getNotionBlocks() {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const pageId = process.env.NOTION_PAGE_ID;

  if (!process.env.NOTION_API_KEY || !pageId) {
    console.warn("NOTION_API_KEY or NOTION_PAGE_ID is missing. Using fallback data.");
    return getFallbackData();
  }

  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    });
    
    // Fetch children for blocks that have them (e.g. Callouts)
    const blocksWithChildren = await Promise.all(
      response.results.map(async (block: any) => {
        if (block.has_children) {
          const childrenResponse = await notion.blocks.children.list({
            block_id: block.id,
          });
          return { ...block, children: childrenResponse.results };
        }
        return block;
      })
    );
    
    return blocksWithChildren;
  } catch (error) {
    console.error("Error fetching from Notion:", error);
    return getFallbackData();
  }
}

// Fallback data matching the user's requested steps if Notion API fails or has no content
function getFallbackData() {
  return [
    { type: 'heading_1', heading_1: { rich_text: [{ plain_text: 'Web制作の重力から、解き放たれる。' }] } },
    { type: 'paragraph', paragraph: { rich_text: [{ plain_text: 'Next.js × Notionの究極の自由度を提示。' }] } },
    { type: 'heading_1', heading_1: { rich_text: [{ plain_text: 'Step 1: Notionの『鍵』を作る' }] } },
    { type: 'paragraph', paragraph: { rich_text: [{ plain_text: 'Developersポータルでの内部インテグレーション作成と、シークレット取得の手順。' }] } },
    { type: 'heading_1', heading_1: { rich_text: [{ plain_text: 'Step 2: ページに『命』を吹き込む' }] } },
    { type: 'paragraph', paragraph: { rich_text: [{ plain_text: 'Notionページ右上のメニューから、作成したコネクトを追加する許可設定。' }] } },
    { type: 'heading_1', heading_1: { rich_text: [{ plain_text: 'Step 3: 環境の『土台』を整える' }] } },
    { type: 'paragraph', paragraph: { rich_text: [{ plain_text: 'Node.js（npx）のインストールとパスの確認。ここが最大のハマりポイントです。' }] } },
    { type: 'heading_1', heading_1: { rich_text: [{ plain_text: 'Step 4: AntiGravityと『合体』' }] } },
    { type: 'paragraph', paragraph: { rich_text: [{ plain_text: 'MCP Servers設定にAPIキーを入力し、疎通確認するまでの流れ。' }] } },
    { type: 'heading_1', heading_1: { rich_text: [{ plain_text: 'Step 5: AIによる『自動構築』' }] } },
    { type: 'paragraph', paragraph: { rich_text: [{ plain_text: '最初のプロンプトを投げてから、サイトが立ち上がるまでの感動。' }] } },
  ];
}

// Always fetch fresh data from Notion on every request (no cache delay)
export const dynamic = 'force-dynamic';

export default async function Page() {
  const blocks = await getNotionBlocks();

  return <ClientPage blocks={blocks} />;
}
