export interface DisplayData {
    card_display_style: string;
    images: string[];
}

export interface AssetContract {
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
    stats: any[];
    hidden: boolean;
    nft_version: string;
    schema_name: string;
    display_data: DisplayData;
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

export interface User {
    username: string;
}

export interface Owner {
    user: User;
    profile_img_url: string;
    address: string;
    config: string;
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
    stats: any[];
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

export interface Asset {
    id: string;
    address: string;
}

export interface Metadata {
    asset: Asset;
    schema: string;
}

export interface Maker {
    user: number;
    profile_img_url: string;
    address: string;
    config: string;
}

export interface Taker {
    user: number;
    profile_img_url: string;
    address: string;
    config: string;
}

export interface FeeRecipient {
    user: number;
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

export interface SellOrder {
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

export interface Trait {
    trait_type: string;
    value: any;
    display_type?: any;
    max_value?: any;
    trait_count: number;
    order?: any;
}

export interface User2 {
    username: string;
}

export interface WinnerAccount {
    user: User2;
    profile_img_url: string;
    address: string;
    config: string;
}

export interface User3 {
    username: string;
}

export interface Seller {
    user: User3;
    profile_img_url: string;
    address: string;
    config: string;
}

export interface PaymentToken {
    address: string;
    image_url?: any;
    name: string;
    symbol: string;
    decimals: number;
    eth_price: string;
    usd_price: string;
}

export interface LastSale {
    id: number;
    winner_account: WinnerAccount;
    from_account?: any;
    to_account?: any;
    owner_account?: any;
    approved_account?: any;
    seller: Seller;
    payment_token: PaymentToken;
    created_date: Date;
    modified_date: Date;
    contract_address: string;
    log_index: string;
    event_type: string;
    auction_type?: any;
    starting_price?: any;
    ending_price?: any;
    duration?: any;
    min_price?: any;
    offered_to?: any;
    bid_amount?: any;
    total_price: string;
    custom_event_name?: any;
    quantity?: any;
    payout_amount?: any;
    event_timestamp: Date;
    transaction: number;
    asset: number;
    asset_bundle?: any;
    asset_type?: any;
    collection: number;
    payout_account?: any;
    payout_asset_contract?: any;
    buy_order?: any;
    sell_order: number;
    dev_fee_payment_event?: any;
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
    auctions?: any;
    sell_orders: SellOrder[];
    traits: Trait[];
    last_sale: LastSale;
    top_bid?: any;
    current_price: string;
    current_escrow_price?: any;
    listing_date?: any;
    is_presale: boolean;
    transfer_fee_payment_token?: any;
    transfer_fee?: any;
}
