import type { Creator, GenreTag, PledgeMessage, Project, Reward } from "./types";
import { SITES } from "./site-config";

/**
 * 第1段のダミーデータ。Designer モック（配色B）と同じ内容を使う。
 * 個人情報は一切入れない（支援者名はモック同様イニシャル表記のみ）。
 * SQL 実行後はこのファイルの代わりに projects / rewards / pledges を読む。
 */

export const KAMO_SITE_ID = SITES[0].id;

export const TAGS: GenreTag[] = [
  { label: "音楽", slug: "ongaku" },
  { label: "エンタメ", slug: "entame" },
  { label: "プロダクト", slug: "product" },
  { label: "地域・まちづくり", slug: "local" },
  { label: "ビジネスサービスのローンチ", slug: "launch" },
];

export function tagBySlug(slug: string): GenreTag | undefined {
  return TAGS.find((t) => t.slug === slug);
}

export function tagSlug(label: string): string {
  return TAGS.find((t) => t.label === label)?.slug ?? label;
}

const creators: Record<string, Creator> = {
  p1: {
    name: "夜明けのクジラ",
    initials: "YZ",
    tags: ["音楽", "インディーズ"],
    profile:
      "2014年結成の3ピースバンド。全国30か所のライブハウスを回りながら、町に伝わる唄を録音し続けています。",
    reportCount: 12,
    pastProjectCount: 2,
  },
  p2: {
    name: "OSAKA LIVE PROJECT",
    initials: "OL",
    tags: ["エンタメ"],
    profile:
      "大阪を拠点にライブ・イベントを企画するチームです。これまでに50本以上の公演を運営してきました。",
    reportCount: 8,
    pastProjectCount: 1,
  },
  p3: {
    name: "金継ぎ工房 つぎは",
    initials: "TK",
    tags: ["プロダクト", "工芸"],
    profile:
      "割れた器を直して次へつなぐ金継ぎの工房です。道具の製作と後継者の育成に取り組んでいます。",
    reportCount: 6,
    pastProjectCount: 0,
  },
  p4: {
    name: "商店街みんなの会",
    initials: "SM",
    tags: ["地域・まちづくり"],
    profile:
      "地元商店街の店主と住民でつくる任意団体です。空き店舗の活用を10年続けています。",
    reportCount: 15,
    pastProjectCount: 3,
  },
  p5: {
    name: "産直プラットフォーム準備室",
    initials: "SC",
    tags: ["ビジネスサービスのローンチ"],
    profile:
      "地方の作り手と都市の買い手をつなぐ事業を準備しています。農林水産・食品の流通が専門です。",
    reportCount: 4,
    pastProjectCount: 0,
  },
  p6: {
    name: "高校生バンド ソラノート",
    initials: "SN",
    tags: ["音楽"],
    profile: "県立高校の軽音部から生まれた5人組。地域の施設で演奏活動を続けています。",
    reportCount: 3,
    pastProjectCount: 0,
  },
  p7: {
    name: "伝統芸能×デジタルアート企画",
    initials: "TD",
    tags: ["エンタメ", "伝統芸能"],
    profile:
      "伝統芸能の上演とデジタルアートを掛け合わせた公演を制作しています。演出家とエンジニアのチームです。",
    reportCount: 9,
    pastProjectCount: 2,
  },
  p8: {
    name: "文具ブランド しるし",
    initials: "SR",
    tags: ["プロダクト", "福祉"],
    profile:
      "障がいのある方と一緒に文具を企画・製造しています。第1弾は全国200店舗で取り扱われました。",
    reportCount: 11,
    pastProjectCount: 1,
  },
  p9: {
    name: "離島の酒蔵を残す会",
    initials: "RS",
    tags: ["地域・まちづくり", "食"],
    profile:
      "離島に100年つづく酒蔵の再稼働を目指す会です。島の住民と出身者で運営しています。",
    reportCount: 20,
    pastProjectCount: 4,
  },
  p10: {
    name: "福祉×テクノロジー研究会",
    initials: "FT",
    tags: ["ビジネスサービスのローンチ", "福祉"],
    profile:
      "福祉現場の記録業務を軽くするツールを開発しています。現場の職員が企画に参加しています。",
    reportCount: 5,
    pastProjectCount: 0,
  },
  p11: {
    name: "レーベル まちの音",
    initials: "MN",
    tags: ["音楽"],
    profile:
      "地域の音をレコードで残す小さなレーベルです。録音からプレスまでを一貫して手がけます。",
    reportCount: 7,
    pastProjectCount: 2,
  },
  p12: {
    name: "移動演劇場 カーテン",
    initials: "KC",
    tags: ["エンタメ"],
    profile:
      "トラックを改造した移動式の劇場で、全国の町を巡る劇団です。これまでに40町で上演しました。",
    reportCount: 6,
    pastProjectCount: 1,
  },
};

type Seed = {
  slug: string;
  title: string;
  summary: string;
  tag: string;
  goal: number;
  collected: number;
  sup: number;
  foot: string;
  img: string;
  feat?: boolean;
  soon?: boolean;
  new?: boolean;
};

const seeds: Seed[] = [
  {
    slug: "yoake-no-kujira-album",
    title: "8年ぶりのフルアルバム。地元の唄を、もう一度みんなで届けたい。",
    summary:
      "ライブハウスを回りながら集めた町の唄を、8年ぶりのフルアルバムとして残します。",
    tag: "音楽",
    goal: 300000,
    collected: 3540000,
    sup: 268,
    foot: "残り49日",
    img: "/images/p1.png",
    feat: true,
    new: true,
  },
  {
    slug: "osaka-one-man-live",
    title: "大阪ワンマンライブを成功させたい。エンタメ大集結の一夜。",
    summary:
      "大阪のホールを借り切って、関西のアーティストが集まる一夜限りのワンマンライブを開催します。",
    tag: "エンタメ",
    goal: 1500000,
    collected: 1605000,
    sup: 132,
    foot: "終了",
    img: "/images/p2.png",
    feat: true,
    new: true,
  },
  {
    slug: "kintsugi-koubou",
    title: "金継ぎの技法を次世代へ。道具をつくる小さな工房をひらく。",
    summary:
      "金継ぎに必要な道具を自分たちでつくる工房を開き、技法を次の世代に手渡します。",
    tag: "プロダクト",
    goal: 800000,
    collected: 1448000,
    sup: 96,
    foot: "残り26日",
    img: "/images/p3.png",
    feat: true,
    new: true,
  },
  {
    slug: "shotengai-no-cafe",
    title: "商店街の空き店舗を、みんなのカフェに。",
    summary:
      "10年空いていた角の店舗を改装し、誰でも立ち寄れる小さなカフェを開きます。",
    tag: "地域・まちづくり",
    goal: 2000000,
    collected: 1840000,
    sup: 210,
    foot: "残り12日",
    img: "/images/p4.png",
    soon: true,
    new: true,
  },
  {
    slug: "sanchoku-platform",
    title: "地方の作り手と都市をつなぐ、産直プラットフォームをローンチ。",
    summary:
      "地方の小さな作り手の商品を、都市の生活者へ直接届ける仕組みをつくります。",
    tag: "ビジネスサービスのローンチ",
    goal: 5000000,
    collected: 17000000,
    sup: 88,
    foot: "残り31日",
    img: "/images/p5.png",
    feat: true,
    new: true,
  },
  {
    slug: "koukousei-band-one-man",
    title: "高校生バンドの初ワンマン。900人の前で鳴らしたい。",
    summary:
      "地域のホールで、高校生バンドが初めてのワンマンライブに挑戦します。",
    tag: "音楽",
    goal: 600000,
    collected: 384000,
    sup: 45,
    foot: "残り20日",
    img: "/images/p6.png",
    new: true,
  },
  {
    slug: "dentou-geinou-digital-art",
    title: "伝統芸能とデジタルアートが交わる、新しい公演のかたち。",
    summary:
      "伝統芸能の舞台にデジタルアートの映像を重ね、新しい公演をつくります。",
    tag: "エンタメ",
    goal: 3000000,
    collected: 6300000,
    sup: 301,
    foot: "残り18日",
    img: "/images/p7.png",
    soon: true,
    new: true,
  },
  {
    slug: "bunbougu-shirushi-2",
    title: "障がいのある人のための文具シリーズ、第2弾をつくる。",
    summary:
      "使いやすさを追求した文具シリーズの第2弾を、福祉施設のみなさんと一緒につくります。",
    tag: "プロダクト",
    goal: 1200000,
    collected: 1872000,
    sup: 174,
    foot: "残り33日",
    img: "/images/p8.png",
    new: true,
  },
  {
    slug: "ritou-no-sakagura",
    title: "離島の酒蔵を再稼働させたい。100年つづく味を絶やさない。",
    summary:
      "島の酒蔵の設備を整え、100年つづく味をもう一度つくれる状態に戻します。",
    tag: "地域・まちづくり",
    goal: 4000000,
    collected: 31200000,
    sup: 342,
    foot: "残り8日",
    img: "/images/p9.png",
    feat: true,
    soon: true,
  },
  {
    slug: "fukushi-tech-record",
    title: "福祉×テクノロジー。現場から生まれた記録ツールを広げたい。",
    summary:
      "福祉現場の記録業務を軽くするツールを、全国の事業所に届けます。",
    tag: "ビジネスサービスのローンチ",
    goal: 2500000,
    collected: 3200000,
    sup: 66,
    foot: "残り25日",
    img: "/images/p10.png",
  },
  {
    slug: "record-machino-oto",
    title: "レコードで残す、地元の唄。録音からプレスまで一貫で。",
    summary:
      "地元に伝わる唄を、アナログレコードとして残します。録音からプレスまで一貫して行います。",
    tag: "音楽",
    goal: 900000,
    collected: 945000,
    sup: 51,
    foot: "残り15日",
    img: "/images/p11.png",
  },
  {
    slug: "idoushiki-engekijou",
    title: "移動式の小さな演劇場をつくる。どの町にも、幕が上がる場所を。",
    summary:
      "トラックを改造した移動式の劇場をつくり、演劇に縁のない町へ巡ります。",
    tag: "エンタメ",
    goal: 1800000,
    collected: 846000,
    sup: 39,
    foot: "残り37日",
    img: "/images/p12.png",
  },
];

const BANSO_STEPS_HEADING = "企画から終了後まで、一緒に走ります";

function genericStory(seed: Seed): string[] {
  return [
    `${seed.summary}このプロジェクトは、地域で活動してきたメンバーが、これまで続けてきた取り組みを次の形に進めるものです。`,
    `集まった資金は、制作費・設備費・広報費として、必要なものを必要なだけ使わせていただきます。使いみちは活動報告で都度ご報告します。`,
    `${BANSO_STEPS_HEADING}というのは、このサイトの考え方です。支援を集めて終わりにせず、企画の方針・拡散・リアルなつながり・終了後のマネタイズまで、運営が伴走します。`,
    `ご支援いただいたみなさまには、リターンと活動報告で必ず結果をお返しします。まずはページを最後まで読んでいただけると嬉しいです。`,
  ];
}

function storyFor(seed: Seed): string[] {
  if (seed.slug !== "yoake-no-kujira-album") return genericStory(seed);
  return [
    "1枚目のアルバムを出してから8年。ライブハウスを回り、町の小さな唄を集めながら、ずっと「もう一度ちゃんと形にしたい」と思ってきました。今回、ようやくその時が来ました。",
    "集まった資金は、レコーディング・ミックス・マスタリング費用、プレスとジャケット制作、そしてリリース後のプロモーションに使わせていただきます。",
    BANSO_STEPS_HEADING,
    "このサイトは「支援を集めて終わり」ではありません。企画の組み立てから、拡散、リアルなつながり、そして終了後のマネタイズまで、運営が並走します。",
    "資金の使いみち",
    "レコーディング 45%／プレス・ジャケット 25%／プロモーション 20%／手数料 10%",
    "起案者プロフィール",
    "夜明けのクジラ。2014年結成、3ピースバンド。町の唄を集めて演奏する活動を続けています。",
  ];
}

export const PROJECTS: Project[] = seeds.map((seed, i) => {
  const creator = creators[`p${i + 1}`];
  return {
    id: `10000000-0000-0000-0000-0000000000${String(i + 1).padStart(2, "0")}`,
    siteId: KAMO_SITE_ID,
    slug: seed.slug,
    title: seed.title,
    summary: seed.summary,
    mainImageUrl: seed.img,
    genreTags: [seed.tag],
    goalAmount: seed.goal,
    collectedAmount: seed.collected,
    supporterCount: seed.sup,
    endAt: "",
    remainingLabel: seed.foot,
    isFeatured: Boolean(seed.feat),
    endingSoon: Boolean(seed.soon),
    isNew: Boolean(seed.new),
    creator,
    story: storyFor(seed),
    storyImages:
      seed.slug === "yoake-no-kujira-album"
        ? ["/images/story1.png", "/images/story2.png"]
        : ["/images/story1.png"],
    galleryImages: [
      "/images/hero.png",
      "/images/story1.png",
      "/images/story2.png",
      seed.img,
    ],
    fundingBreakdown:
      seed.slug === "yoake-no-kujira-album"
        ? "レコーディング 45%／プレス・ジャケット 25%／プロモーション 20%／手数料 10%"
        : "制作費 45%／設備・資材 30%／広報 15%／手数料 10%",
    projectType: seed.slug === "yoake-no-kujira-album" ? "commit" : "goal",
    periodLabel: "2026年10月1日 〜 2026年12月6日",
  };
});

export function projectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function projectsByTag(label: string): Project[] {
  return PROJECTS.filter((p) => p.genreTags.includes(label));
}

const REWARDS_KUJIRA: Reward[] = [
  {
    id: "r1",
    projectId: PROJECTS[0].id,
    title: "お礼のメッセージとデジタル音源",
    description:
      "心をこめたお礼メッセージと、完成したアルバムのデジタル音源（MP3／FLAC）をお届けします。",
    price: 5000,
    quantityLimit: null,
    claimedCount: 128,
    deliveryEstimate: "2027年1月 お届け",
    isActive: true,
  },
  {
    id: "r2",
    projectId: PROJECTS[0].id,
    title: "サイン入りCD＋デジタル音源",
    description:
      "メンバー全員のサイン入りCDに加え、デジタル音源とライナーノーツPDFをお届けします。",
    price: 10000,
    quantityLimit: 200,
    claimedCount: 188,
    deliveryEstimate: "2027年1月 お届け",
    isActive: true,
  },
  {
    id: "r3",
    projectId: PROJECTS[0].id,
    title: "リリース記念ライブご招待＋CD",
    description:
      "完成を祝うリリース記念ライブ（東京・2027年2月予定）にご招待。CDとサインもお付けします。",
    price: 30000,
    quantityLimit: 60,
    claimedCount: 57,
    deliveryEstimate: "2027年2月 お届け",
    isActive: true,
  },
  {
    id: "r4",
    projectId: PROJECTS[0].id,
    title: "スポンサークレジット掲載＋全リターン",
    description:
      "CDブックレットと特設サイトにスポンサーとしてお名前を掲載します（任意）。",
    price: 100000,
    quantityLimit: 20,
    claimedCount: 20,
    deliveryEstimate: "2027年3月 お届け",
    isActive: true,
  },
  {
    id: "r5",
    projectId: PROJECTS[0].id,
    title: "応援のみ（リターンなし）",
    description:
      "見返りを求めず、ただ応援したい方のためのコースです。お礼のお手紙をお送りします。",
    price: 3000,
    quantityLimit: null,
    claimedCount: 240,
    deliveryEstimate: "お礼状のみ",
    isActive: true,
  },
];

/** リターンが用意されていない案件（ダミー）向けの標準コース */
function genericRewards(project: Project): Reward[] {
  const base = Math.max(3000, Math.round(project.goalAmount / 100));
  const tiers: Array<[number, string, string]> = [
    [base, "応援コース", "お礼のメッセージと活動報告をお送りします。"],
    [base * 2, "体験コース", "活動報告に加え、完成品または体験にご参加いただけます。"],
    [base * 5, "特別コース", "お名前の掲載と、起案者との交流の機会をご用意します。"],
  ];
  return tiers.map(([price, title, description], i) => ({
    id: `${project.id}-r${i + 1}`,
    projectId: project.id,
    title,
    description,
    price,
    quantityLimit: i === 2 ? 30 : null,
    claimedCount: 10 * (i + 1),
    deliveryEstimate: "2027年3月 お届け",
    isActive: true,
  }));
}

export function rewardsForProject(project: Project): Reward[] {
  if (project.slug === "yoake-no-kujira-album") return REWARDS_KUJIRA;
  return genericRewards(project);
}

export const PLEDGE_MESSAGES: PledgeMessage[] = [
  {
    initials: "KM",
    name: "K.M",
    date: "2026/10/12",
    body: "8年前のライブで泣きました。完成を楽しみにしています。少しですが応援しています！",
  },
  {
    initials: "ST",
    name: "S.T",
    date: "2026/10/10",
    body: "地元の唄を残す活動、ずっと応援しています。ライブでお会いできるのを楽しみに。",
  },
  {
    initials: "AO",
    name: "A.O",
    date: "2026/10/08",
    body: "説明会でお話を聞いて支援しました。伴走してくれる運営さんがいるのが心強いです。",
  },
];
