
export interface Stats {
    seven_day_volume: number;
    seven_day_change: number;
    total_volume: number;
    count: number;
    num_owners: number;
    market_cap: number;
    average_price: number;
    items_sold: number;
}

export interface DisplayData {
    card_display_style: string;
    images: string[];
}

export interface AssetContract {
    address: string;
    name: string;
    symbol: string;
    image_url: string;
    large_image_url: string;
    featured_image_url: string;
    featured: boolean;
    description: string;
    external_link: string;
    wiki_link?: any;
    stats: Stats;
    hidden: boolean;
    nft_version: string;
    schema_name: string;
    display_data: DisplayData;
    short_description: string;
    total_supply: number;
    owner: string;
    dev_buyer_fee_basis_points: number;
    dev_seller_fee_basis_points: number;
    opensea_buyer_fee_basis_points: number;
    opensea_seller_fee_basis_points: number;
    buyer_fee_basis_points: number;
    seller_fee_basis_points: number;
    payout_address: string;
    require_email: boolean;
    require_whitelist: boolean;
    only_proxied_transfers: boolean;
    default_to_fiat: boolean;
    created_date: Date;
    opensea_version: string;
    asset_contract_type: string;
}

export interface User {
    username: string;
}

export interface Owner {
    user: User;
    profile_img_url: string;
    address: string;
    config: string;
}

export interface Stats2 {
    seven_day_volume: number;
    seven_day_change: number;
    total_volume: number;
    count: number;
    num_owners: number;
    market_cap: number;
    average_price: number;
    items_sold: number;
}

export interface DisplayData2 {
    card_display_style: string;
    images: string[];
}

export interface PrimaryAssetContract {
    address: string;
    name: string;
    symbol: string;
    image_url: string;
    large_image_url?: any;
    featured_image_url?: any;
    featured: boolean;
    description: string;
    external_link: string;
    wiki_link?: any;
    stats: Stats2;
    hidden: boolean;
    nft_version: string;
    schema_name: string;
    display_data: DisplayData2;
    short_description?: any;
    total_supply?: any;
    owner?: any;
    dev_buyer_fee_basis_points: number;
    dev_seller_fee_basis_points: number;
    opensea_buyer_fee_basis_points: number;
    opensea_seller_fee_basis_points: number;
    buyer_fee_basis_points: number;
    seller_fee_basis_points: number;
    payout_address: string;
    require_email: boolean;
    require_whitelist: boolean;
    only_proxied_transfers: boolean;
    default_to_fiat: boolean;
    created_date: Date;
    opensea_version?: any;
    asset_contract_type: string;
}

export interface Power {
    min: number;
    max: number;
}

export interface Traits {
    power: Power;
}

export interface DisplayData3 {
    card_display_style: string;
}

export interface Collection {
    primary_asset_contracts: PrimaryAssetContract[];
    traits: Traits;
    name: string;
    slug: string;
    image_url: string;
    short_description?: any;
    description: string;
    external_url: string;
    chat_url?: any;
    wiki_url?: any;
    large_image_url?: any;
    featured_image_url?: any;
    featured: boolean;
    banner_image_url?: any;
    display_data: DisplayData3;
    hidden: boolean;
    created_date: Date;
}

export interface Trait {
    trait_type: string;
    value: any;
    display_type?: any;
    max_value?: any;
    trait_count: number;
    order?: any;
}

export interface Asset {
    id: string;
    address: string;
}

export interface Metadata {
    asset: Asset;
    schema: string;
}

export interface User2 {
    username: string;
}

export interface Maker {
    user: User2;
    profile_img_url: string;
    address: string;
    config: string;
}

export interface User3 {
    username: string;
}

export interface Taker {
    user: User3;
    profile_img_url: string;
    address: string;
    config: string;
}

export interface User4 {
    username: string;
}

export interface FeeRecipient {
    user: User4;
    profile_img_url: string;
    address: string;
    config: string;
}

export interface PaymentTokenContract {
    address: string;
    image_url?: any;
    name: string;
    symbol: string;
    decimals: number;
    eth_price: string;
    usd_price: string;
}

export interface Order {
    created_date: Date;
    closing_date?: any;
    closing_extendable: boolean;
    expiration_time: number;
    listing_time: number;
    order_hash: string;
    metadata: Metadata;
    exchange: string;
    maker: Maker;
    taker: Taker;
    current_price: string;
    current_bounty: string;
    bounty_multiple: string;
    maker_relayer_fee: string;
    taker_relayer_fee: string;
    maker_protocol_fee: string;
    taker_protocol_fee: string;
    maker_referrer_fee: string;
    fee_recipient: FeeRecipient;
    fee_method: number;
    side: number;
    sale_kind: number;
    target: string;
    how_to_call: number;
    calldata: string;
    replacement_pattern: string;
    static_target: string;
    static_extradata: string;
    payment_token: string;
    payment_token_contract: PaymentTokenContract;
    base_price: string;
    extra: string;
    salt: string;
    v: number;
    r: string;
    s: string;
    approved_on_chain: boolean;
    cancelled: boolean;
    finalized: boolean;
    marked_invalid: boolean;
    prefixed_hash: string;
}

export interface OpenSeaAsset {
    token_id: string;
    num_sales: number;
    background_color: string;
    image_url: string;
    image_preview_url: string;
    image_thumbnail_url: string;
    image_original_url: string;
    animation_url?: any;
    name?: any;
    description: string;
    external_link: string;
    asset_contract: AssetContract;
    owner: Owner;
    permalink: string;
    collection: Collection;
    auctions: any[];
    sell_orders?: any;
    traits: Trait[];
    last_sale?: any;
    top_bid?: any;
    current_price?: any;
    current_escrow_price?: any;
    listing_date?: any;
    is_presale: boolean;
    transfer_fee_payment_token?: any;
    transfer_fee?: any;
    related_assets: any[];
    orders: Order[];
    supports_wyvern: boolean;
    last_bundle_sell_order?: any;
    top_ownerships: any[];
}
